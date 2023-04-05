import { getTotalGasUsed, SUI_TYPE_ARG } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';

import type {
    RawSigner,
    SuiAddress,
    SuiObjectChange,
    TransactionBlock,
    DryRunTransactionBlockResponse,
} from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

export type AnalyzeChangesArgs = {
    signer: RawSigner | EthosSigner;
    transactionBlock: string | TransactionBlock | Uint8Array;
};

export type GasCostSummary = {
    computationCost: string;
    storageCost: string;
    storageRebate: string;
    nonRefundableStorageFee: string;
    total: string;
};

export type BalanceReduction = {
    type: string;
    amount: string;
    recipient?: string;
};

export type BalanceAddition = {
    type: string;
    amount: string;
};

export type AnalyzeChangesResult = {
    blockData?: TransactionBlock['blockData'];
    moveCalls: TransactionBlock['blockData']['transactions'];
    dryRunResponse: DryRunTransactionBlockResponse;
    gas: GasCostSummary;
    balanceReductions: BalanceReduction[];
    balanceAdditions: BalanceAddition[];
    assetTransfers: SuiObjectChange[];
    assetMints: SuiObjectChange[];
    rawAmount: string;
    totalFee: string;
};

const assetChanges = (
    address: SuiAddress,
    objectChanges: SuiObjectChange[]
) => {
    const transfers = objectChanges.filter(
        (objectChange) =>
            objectChange.type === 'mutated' &&
            objectChange.sender === address &&
            typeof objectChange.owner !== 'string' &&
            'AddressOwner' in objectChange.owner &&
            objectChange.sender !== objectChange.owner.AddressOwner
    );

    const mints = objectChanges.filter(
        (objectChange) =>
            objectChange.type === 'created' &&
            objectChange.sender === address &&
            typeof objectChange.owner !== 'string' &&
            'AddressOwner' in objectChange.owner &&
            objectChange.sender === objectChange.owner.AddressOwner
    );

    return {
        transfers,
        mints,
    };
};

const coinChanges = (
    address: SuiAddress,
    { balanceChanges, effects }: DryRunTransactionBlockResponse
) => {
    const gasUsed = getTotalGasUsed(effects);
    const reductionChanges = balanceChanges.filter(
        (balanceChange) =>
            typeof balanceChange.owner === 'object' &&
            'AddressOwner' in balanceChange.owner &&
            balanceChange.owner.AddressOwner === address &&
            new BigNumber(balanceChange.amount).isNegative()
    );

    const additionChanges = balanceChanges.filter(
        (balanceChange) =>
            typeof balanceChange.owner === 'object' &&
            'AddressOwner' in balanceChange.owner &&
            balanceChange.owner.AddressOwner === address &&
            new BigNumber(balanceChange.amount).isPositive()
    );

    const reductions: BalanceReduction[] = reductionChanges
        .map((reduction) => {
            let amount = reduction.amount;
            if (gasUsed && reduction.coinType === SUI_TYPE_ARG) {
                amount = new BigNumber(reduction.amount)
                    .plus(new BigNumber(gasUsed.toString()))
                    .toString();
            }

            const recipientChange = balanceChanges.find(
                (addition) =>
                    addition.coinType === reduction.coinType &&
                    new BigNumber(addition.amount).eq(
                        new BigNumber(amount).multipliedBy(-1)
                    )
            );

            const recipient =
                (recipientChange &&
                    typeof recipientChange.owner === 'object' &&
                    'AddressOwner' in recipientChange.owner &&
                    recipientChange.owner.AddressOwner) ||
                undefined;

            return {
                type: reduction.coinType,
                amount,
                recipient,
            };
        })
        .filter((reduction) => new BigNumber(reduction.amount).abs().gt(5));

    const additions: BalanceReduction[] = additionChanges.map((addition) => ({
        type: addition.coinType,
        amount: addition.amount,
    }));

    return {
        reductions,
        additions,
    };
};

const analyzeChanges = async ({
    signer,
    transactionBlock,
}: AnalyzeChangesArgs): Promise<AnalyzeChangesResult> => {
    const address = await signer.getAddress();
    const dryRunResponse = await signer.dryRunTransactionBlock({
        transactionBlock,
    });

    const { effects, balanceChanges, objectChanges } = dryRunResponse;

    const gas = {
        ...effects.gasUsed,
        total: (getTotalGasUsed(effects) ?? 0).toString(),
    };

    const { mints: assetMints, transfers: assetTransfers } = assetChanges(
        address,
        objectChanges
    );
    const { reductions: balanceReductions, additions: balanceAdditions } =
        coinChanges(address, dryRunResponse);

    const totalReductions = balanceChanges
        .filter(
            (balanceChange) =>
                typeof balanceChange.owner === 'object' &&
                'AddressOwner' in balanceChange.owner &&
                balanceChange.owner.AddressOwner === address
        )
        .reduce(
            (total, reduction) =>
                new BigNumber(total).plus(new BigNumber(reduction.amount)),
            new BigNumber(0)
        )
        .multipliedBy(-1);

    const rawAmount = totalReductions.minus(gas.total).toString();
    const totalFee = totalReductions.toString();

    let blockData;
    let moveCalls: TransactionBlock['blockData']['transactions'] = [];
    if (
        typeof transactionBlock === 'object' &&
        'blockData' in transactionBlock
    ) {
        blockData = transactionBlock.blockData;
        if (blockData) {
            moveCalls = blockData.transactions.filter(
                (transaction) => transaction.kind === 'MoveCall'
            );
        }
    }

    return {
        blockData,
        moveCalls,
        dryRunResponse,
        gas,
        balanceReductions,
        balanceAdditions,
        assetMints,
        assetTransfers,
        rawAmount,
        totalFee,
    };
};

export default analyzeChanges;

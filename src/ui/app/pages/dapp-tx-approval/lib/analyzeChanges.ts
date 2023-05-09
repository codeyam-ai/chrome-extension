import { getTotalGasUsed, SUI_TYPE_ARG } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';

import addressOwner from '_src/ui/app/helpers/transactions/addressOwner';

import type {
    RawSigner,
    SuiAddress,
    SuiObjectChange,
    TransactionBlock,
    DryRunTransactionBlockResponse,
} from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';

export type AnalyzeChangesArgs = {
    signer: RawSigner | EthosSigner | LedgerSigner;
    transactionBlock: string | TransactionBlock | Uint8Array;
};

export type AnalyzeError = {
    type: string;
    message: string;
    errorInfo?: Record<string, string>;
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
    owner: SuiAddress;
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
            addressOwner(objectChange.owner) &&
            objectChange.sender !== addressOwner(objectChange.owner)
    );

    const mints = objectChanges.filter(
        (objectChange) =>
            objectChange.type === 'created' &&
            objectChange.sender === address &&
            objectChange.sender === addressOwner(objectChange.owner)
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
            addressOwner(balanceChange.owner) === address &&
            new BigNumber(balanceChange.amount).isNegative()
    );

    const additionChanges = balanceChanges.filter(
        (balanceChange) =>
            addressOwner(balanceChange.owner) === address &&
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
                (recipientChange && addressOwner(recipientChange.owner)) ||
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
}: AnalyzeChangesArgs): Promise<AnalyzeChangesResult | AnalyzeError> => {
    try {
        const address = await signer.getAddress();
        const dryRunResponse = await signer.dryRunTransactionBlock({
            transactionBlock,
        });

        const { effects, balanceChanges, objectChanges } = dryRunResponse;

        if (effects.status.status === 'failure') {
            return {
                type: 'Contract Error',
                message: `${effects.status.error}`,
            };
        }

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
                    addressOwner(balanceChange.owner) === address &&
                    balanceChange.coinType === SUI_TYPE_ARG
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
            owner: address,
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
    } catch (error: unknown) {
        if (`${error}`.includes('not_exclusively_listed')) {
            return {
                type: 'NFT is locked',
                message:
                    'This NFT has been listed in a marketplace and therefore can not be transferred. Please unlist the NFT from the marketplace and try again.',
            };
        }

        const address = await signer.getAddress();
        const {
            totalBalance,
            lockedBalance: { number },
        } = await signer.provider.getBalance({
            owner: address,
            coinType: SUI_TYPE_ARG,
        });

        // const gasPrice = await signer.provider.getReferenceGasPrice();
        const gasAvailable = new BigNumber(totalBalance)
            .minus(number || 0)
            .dividedBy(Math.pow(10, 9));

        const results = await signer.devInspectTransactionBlock({
            transactionBlock,
        });

        const totalGas = new BigNumber(
            getTotalGasUsed(results.effects)?.toString() || 0
        ).dividedBy(Math.pow(10, 9));

        if (totalGas.gte(gasAvailable)) {
            return {
                type: 'Insufficient Gas',
                message: `You have ${gasAvailable} gas available, but this transaction requires ${totalGas} gas.`,
                errorInfo: {
                    gasAvailable: gasAvailable.toString(),
                    gasRequired: totalGas.toString(),
                },
            };
        }

        return {
            type: 'Unknown Error',
            message: `${error}`,
        };
    }
};

export default analyzeChanges;

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
    transactionBlock: TransactionBlock;
};

export type GasCostSummary = {
    computationCost: string;
    storageCost: string;
    storageRebate: string;
    nonRefundableStorageFee: string;
};

export type BalanceReduction = {
    type: string;
    amount: string;
    recipient?: string;
};

export type AnalyzeChangesResult = {
    dryRunResponse: DryRunTransactionBlockResponse;
    gas: GasCostSummary;
    balanceReductions: BalanceReduction[];
    assetTransfers: SuiObjectChange[];
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

    return {
        transfers,
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
            new BigNumber(balanceChange.amount).isPositive()
    );

    if (gasUsed) {
        for (const reduction of reductionChanges) {
            if (reduction.coinType !== SUI_TYPE_ARG) continue;
            reduction.amount = new BigNumber(reduction.amount)
                .plus(new BigNumber(gasUsed.toString()))
                .toString();
        }
    }
    const reductions: BalanceReduction[] = reductionChanges.map((reduction) => {
        const recipientChange = additionChanges.find(
            (addition) =>
                addition.coinType === reduction.coinType &&
                new BigNumber(addition.amount).eq(
                    new BigNumber(reduction.amount).abs()
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
            amount: reduction.amount,
            recipient,
        };
    });

    return {
        reductions,
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

    console.log('effects', effects);
    console.log('balanceChanges', balanceChanges);
    console.log('objectChanges', objectChanges);

    const gas = effects.gasUsed;

    const { transfers: assetTransfers } = assetChanges(address, objectChanges);
    const { reductions: balanceReductions } = coinChanges(
        address,
        dryRunResponse
    );

    return {
        dryRunResponse,
        gas,
        balanceReductions,
        assetTransfers,
    };
};

export default analyzeChanges;

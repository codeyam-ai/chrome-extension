import type { RawSigner, TransactionBlock } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

export type AnalyzeChangesArgs = {
    signer: RawSigner | EthosSigner;
    transactionBlock: TransactionBlock;
};

const analyzeChanges = async ({
    signer,
    transactionBlock,
}: AnalyzeChangesArgs) => {
    const result = await signer.dryRunTransactionBlock({
        transactionBlock,
    });

    const { effects, balanceChanges, objectChanges } = result;

    if (
        objectChanges.find(
            (objectChange) =>
                objectChange.type === 'mutated' &&
                typeof objectChange.owner === 'object' &&
                'AdressOwner' in objectChange.owner &&
                objectChange.sender !== objectChange.owner.AdressOwner
        )
    )
        console.log('objectChanges', objectChanges);
    console.log('balanceChanges', balanceChanges);
    console.log('effects', effects);

    return result;
};

export default analyzeChanges;

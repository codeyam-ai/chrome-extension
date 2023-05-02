import type {
    JsonRpcProvider,
    SuiAddress,
    TransactionBlock,
} from '@mysten/sui.js';
import type { ExtendedSuiObjectData } from '_redux/slices/sui-objects';

const transferObjectTransactionBlock = async (
    transactionBlock: TransactionBlock,
    object: ExtendedSuiObjectData,
    recipient: SuiAddress,
    provider: JsonRpcProvider
) => {
    if (!object.kiosk?.type) {
        transactionBlock.transferObjects(
            [transactionBlock.object(object.objectId)],
            transactionBlock.pure(recipient)
        );
    } else {
        const recipientKiosk = await provider.getOwnedObjects({
            owner: recipient,
            filter: {
                StructType: object.kiosk.type,
            },
        });
        if (object.kiosk.type.indexOf('ob_kiosk') > -1) {
            const packageId = object.kiosk.type.split('::')[0] ?? '0x2';
            if (recipientKiosk.data.length === 0) {
                transactionBlock.moveCall({
                    target: `${packageId}::ob_kiosk::p2p_transfer`,
                    arguments: [],
                });
            } else {
                transactionBlock.moveCall({
                    target: `${packageId}::ob_kiosk::p2p_transfer_and_create_target_kiosk`,
                    arguments: [],
                });
            }
        }
    }

    return transactionBlock;
    // if ()
};

export default transferObjectTransactionBlock;

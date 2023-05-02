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
        let kioskId: string | undefined;
        if (object.kiosk.content?.dataType === 'moveObject') {
            kioskId = object.kiosk.content.fields.kiosk;
        }

        if (!kioskId) return transactionBlock;

        const recipientKiosks = await provider.getOwnedObjects({
            owner: recipient,
            filter: {
                StructType: object.kiosk.type,
            },
        });
        if (object.kiosk.type.indexOf('ob_kiosk') > -1) {
            const packageId = object.kiosk.type.split('::')[0] ?? '0x2';
            const recipientKiosk = recipientKiosks.data[0]?.data;

            if (recipientKiosk) {
                transactionBlock.moveCall({
                    target: `${packageId}::ob_kiosk::p2p_transfer`,
                    arguments: [
                        transactionBlock.object(kioskId),
                        transactionBlock.object(recipientKiosk.objectId),
                        transactionBlock.pure(object.objectId),
                    ],
                });
            } else {
                console.log('kioskId', kioskId);
                console.log('recipient', recipient);
                console.log('object.objectId', object.objectId);
                transactionBlock.moveCall({
                    target: `${packageId}::ob_kiosk::p2p_transfer_and_create_target_kiosk`,
                    arguments: [
                        transactionBlock.object(kioskId),
                        transactionBlock.pure(recipient),
                        transactionBlock.pure(object.objectId),
                    ],
                });
            }
        }
    }

    return transactionBlock;
    // if ()
};

export default transferObjectTransactionBlock;

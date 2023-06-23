import type {
    JsonRpcProvider,
    SuiAddress,
    TransactionBlock,
} from '@mysten/sui.js';
import type { ExtendedSuiObjectData } from '_redux/slices/sui-objects';

const obKioskPackageId =
    '0x1dddbcce1491a365d931a0dc6a64db596dad9c9915c6d0efb13e5c2efd5e95ce';

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

        if (!kioskId) return null;

        const recipientKiosks = await provider.getOwnedObjects({
            owner: recipient,
            options: {
                showContent: true,
            },
            filter: {
                StructType: object.kiosk.type,
            },
        });

        if (object.kiosk.type.indexOf('ob_kiosk') > -1) {
            // const packageId = object.kiosk.type.split('::')[0] ?? '0x2';
            const packageId = obKioskPackageId;
            const recipientKiosk = recipientKiosks.data[0]?.data;

            if (recipientKiosk) {
                let recipientKioskId: string | undefined;
                if (recipientKiosk?.content?.dataType === 'moveObject') {
                    recipientKioskId = recipientKiosk.content.fields.kiosk;
                }

                if (!recipientKioskId) return null;

                transactionBlock.moveCall({
                    target: `${packageId}::ob_kiosk::p2p_transfer`,
                    typeArguments: [object.type ?? ''],
                    arguments: [
                        transactionBlock.object(kioskId),
                        transactionBlock.object(recipientKioskId),
                        transactionBlock.pure(object.objectId),
                    ],
                });
            } else {
                transactionBlock.moveCall({
                    target: `${packageId}::ob_kiosk::p2p_transfer_and_create_target_kiosk`,
                    typeArguments: [object.type ?? ''],
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
};

export default transferObjectTransactionBlock;

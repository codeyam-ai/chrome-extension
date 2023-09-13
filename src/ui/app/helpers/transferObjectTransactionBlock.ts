import type { SuiClient } from '@mysten/sui.js/client';
import type { TransactionBlock } from '@mysten/sui.js/transactions';
import type { ExtendedSuiObjectData } from '_redux/slices/sui-objects';

const obKioskPackageId =
    '0x88eccc40067c9b73b92ebde24759aa4287c5274cfed35f7e67dcea4352ef6594';
const kioskModule = '0x2::kiosk';

const transferObjectTransactionBlock = async (
    transactionBlock: TransactionBlock,
    object: ExtendedSuiObjectData,
    recipient: string,
    client: SuiClient
) => {
    if (!object.kiosk?.type) {
        transactionBlock.transferObjects(
            [transactionBlock.object(object.objectId)],
            transactionBlock.pure(recipient)
        );
    } else {
        let kioskId: string | undefined;
        if (object.kiosk.content?.dataType === 'moveObject') {
            const fields = object.kiosk.content.fields;
            // kioskId = object.kiosk.content.fields.kiosk;
            kioskId =
                'kiosk' in fields && typeof fields.kiosk === 'string'
                    ? fields.kiosk
                    : undefined;
            if (!kioskId) {
                // kioskId = object.kiosk.content.fields.for;
                kioskId =
                    'for' in fields && typeof fields.for === 'string'
                        ? fields.for
                        : undefined;
            }
        }

        if (!kioskId) return null;

        const recipientKiosks = await client.getOwnedObjects({
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
                    const fields = recipientKiosk.content.fields;
                    if (
                        'kiosk' in fields &&
                        (typeof fields.kiosk === 'string' ||
                            typeof fields.kiosk === 'undefined')
                    ) {
                        recipientKioskId = fields.kiosk;
                    }
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
        } else if (
            object.kiosk.type.indexOf('0x2::kiosk::KioskOwnerCap') > -1
        ) {
            const [item] = transactionBlock.moveCall({
                target: `${kioskModule}::take`,
                typeArguments: [object.type ?? ''],
                arguments: [
                    transactionBlock.object(kioskId),
                    transactionBlock.object(object.kiosk.objectId),
                    transactionBlock.pure(object.objectId, 'address'),
                ],
            });

            let recipientKioskId: string | undefined;

            const recipientKiosk = recipientKiosks.data[0]?.data;
            if (recipientKiosk) {
                if (recipientKiosk?.content?.dataType === 'moveObject') {
                    const fields = recipientKiosk.content.fields;
                    if (
                        'for' in fields &&
                        (typeof fields.for === 'string' ||
                            typeof fields.for === 'undefined')
                    ) {
                        recipientKioskId = fields.for;
                    }
                }

                if (!recipientKioskId) return null;

                transactionBlock.moveCall({
                    target: `${kioskModule}::place`,
                    typeArguments: [object.type ?? ''],
                    arguments: [
                        transactionBlock.object(recipientKioskId),
                        transactionBlock.object(recipientKiosk.objectId),
                        item,
                    ],
                });
            } else {
                const [kiosk, kioskOwnerCap] = transactionBlock.moveCall({
                    target: `${kioskModule}::new`,
                });

                transactionBlock.moveCall({
                    target: `${kioskModule}::place`,
                    typeArguments: [object.type ?? ''],
                    arguments: [kiosk, kioskOwnerCap, item],
                });

                transactionBlock.moveCall({
                    target: `0x2::transfer::public_share_object`,
                    typeArguments: [`${kioskModule}::Kiosk`],
                    arguments: [kiosk],
                });

                transactionBlock.transferObjects(
                    [kioskOwnerCap],
                    transactionBlock.pure(recipient)
                );
            }
        }
    }

    return transactionBlock;
};

export default transferObjectTransactionBlock;

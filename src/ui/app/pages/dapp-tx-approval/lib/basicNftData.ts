import getDisplay from '_src/ui/app/helpers/getDisplay';

import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';

export type BasicNFtData = {
    name?: string;
    imageUrl?: string;
};

const basicNftData = async ({
    signer,
    objectId,
}: {
    signer: RawSigner | EthosSigner | LedgerSigner;
    objectId: string;
}): Promise<BasicNFtData> => {
    const objectData = await signer.client.getObject({
        id: objectId,
        options: {
            showContent: true,
            showDisplay: true,
        },
    });

    if (!objectData) throw new Error(`Object ${objectId} not found`);

    const { data: object } = objectData;

    let fields;
    if (!!object?.content && 'fields' in object.content) {
        fields = object.content.fields;
    }

    const nftDisplay = getDisplay(object?.display);
    return {
        name: nftDisplay?.name ?? fields?.name,
        imageUrl: nftDisplay?.image_url ?? fields?.url,
    };
};

export default basicNftData;

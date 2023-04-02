import type { RawSigner } from '@mysten/sui.js';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

export type BasicNFtData = {
    name?: string;
    imageUrl?: string;
};

const basicNftData = async ({
    signer,
    objectId,
}: {
    signer: RawSigner | EthosSigner;
    objectId: string;
}): Promise<BasicNFtData> => {
    const objectData = await signer.provider.getObject({
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

    return {
        name: object?.display?.name ?? fields?.name,
        imageUrl: object?.display?.image_url ?? fields?.url,
    };
};

export default basicNftData;

import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

const getObjData = async (id: string) => {
    const client = new SuiClient({ url: getFullnodeUrl('mainnet') });
    const res = await client.getObject({
        id: id,
        options: {
            showContent: true,
            showDisplay: true,
            showType: true,
        },
    });
    return res;
};

export default getObjData;

import { JsonRpcProvider } from '@mysten/sui.js';

const getObjData = async (id: string) => {
    const provider = new JsonRpcProvider();
    const res = await provider.getObject({
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

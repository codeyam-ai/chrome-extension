import { JsonRpcProvider } from '@mysten/sui.js';

const cleanRawObjType = (rawCoinType: string): string => {
    return rawCoinType.replace(/^[^<]*<|>$/g, '');
};

const getObjTypeFromObjId = async (
    objId: string,
    network: string
): Promise<string | undefined> => {
    const provider = new JsonRpcProvider(network);
    const obj = await provider.getObject(objId);

    if (
        obj.status === 'Exists' &&
        obj.details &&
        typeof obj.details === 'object' &&
        'data' in obj.details &&
        'type' in obj.details.data
    ) {
        // Returns something like this: 0x2::coin::Coin<0xe881966c6a8b405485d014087a32d712c499d81b::af::AF>
        // But all we need is 0xe881966c6a8b405485d014087a32d712c499d81b::af::AF
        const rawObjType = obj.details.data.type;
        return cleanRawObjType(rawObjType);
    }
    return;
};

export default getObjTypeFromObjId;

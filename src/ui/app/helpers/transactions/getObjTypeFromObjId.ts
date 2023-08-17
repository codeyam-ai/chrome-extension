import { SuiClient } from '@mysten/sui.js/client';

const cleanRawObjType = (rawCoinType: string): string => {
    return rawCoinType.replace(/^[^<]*<|>$/g, '');
};

const getObjTypeFromObjId = async (
    objId: string,
    network: string
): Promise<string | undefined> => {
    const client = new SuiClient({ url: network });
    const obj = await client.getObject({
        id: objId,
        options: { showType: true },
    });

    if (
        obj.data &&
        typeof obj.data === 'object' &&
        'data' in obj.data &&
        'type' in obj.data
    ) {
        // Returns something like this: 0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<0xe881966c6a8b405485d014087a32d712c499d81b::af::AF>
        // But all we need is 0xe881966c6a8b405485d014087a32d712c499d81b::af::AF
        const rawObjType = obj.data.type as string;
        return cleanRawObjType(rawObjType);
    }
    return;
};

export default getObjTypeFromObjId;

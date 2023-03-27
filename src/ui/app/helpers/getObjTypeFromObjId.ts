import { api } from '../redux/store/thunk-extras';

const cleanRawObjType = (rawCoinType: string): string => {
    return rawCoinType.replace(/^[^<]*<|>$/g, '');
};

const getObjTypeFromObjId = async (
    objId: string
): Promise<string | undefined> => {
    const obj = await api.instance.fullNode.getObject({
        id: objId,
        options: { showType: true },
    });

    if (
        obj.data &&
        typeof obj.data === 'object' &&
        'data' in obj.data &&
        'type' in obj.data
    ) {
        // Returns something like this: 0x2::coin::Coin<0xe881966c6a8b405485d014087a32d712c499d81b::af::AF>
        // But all we need is 0xe881966c6a8b405485d014087a32d712c499d81b::af::AF
        const rawObjType = obj.data.type as string;
        return cleanRawObjType(rawObjType);
    }
    return;
};

export default getObjTypeFromObjId;

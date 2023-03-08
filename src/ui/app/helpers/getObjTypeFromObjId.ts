import { api } from '../redux/store/thunk-extras';

const cleanRawObjType = (rawCoinType: string): string => {
    return rawCoinType.replace(/^[^<]*<|>$/g, '');
};

const getObjTypeFromObjId = async (
    objId: string
): Promise<string | undefined> => {
    const obj = await api.instance.fullNode.getObject(objId);

    if (
        obj.status === 'Exists' &&
        obj.details &&
        typeof obj.details === 'object' &&
        'data' in obj.details &&
        'type' in obj.details
    ) {
        // Returns something like this: 0x2::coin::Coin<0xe881966c6a8b405485d014087a32d712c499d81b::af::AF>
        // But all we need is 0xe881966c6a8b405485d014087a32d712c499d81b::af::AF
        const rawObjType = obj.details.type as string;
        return cleanRawObjType(rawObjType);
    }
    return;
};

export default getObjTypeFromObjId;

import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

export const getSuiAddress = async (domain: string) => {
    try {
        const client = new SuiClient({ url: getFullnodeUrl('mainnet') });
        const address = await client.resolveNameServiceAddress({
            name: domain,
        });
        return address;
    } catch (e) {
        return null;
    }
};

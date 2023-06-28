import { JsonRpcProvider, mainnetConnection } from '@mysten/sui.js';

export const getSuiAddress = async (domain: string) => {
    const provider = new JsonRpcProvider(mainnetConnection);
    const address = await provider.resolveNameServiceAddress({
        name: domain,
    });

    return address;
};

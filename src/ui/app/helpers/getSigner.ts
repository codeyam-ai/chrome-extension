import { api, thunkExtras } from '../redux/store/thunk-extras';

import type { SuiAddress } from '@mysten/sui.js';

export const getSigner = async (
    address: SuiAddress | null,
    authentication: string | null,
    activeAccountIndex: number
) => {
    const keypairVault = thunkExtras.keypairVault;
    let signer;
    if (authentication) {
        signer = await api.getEthosSignerInstance(
            address || '',
            authentication
        );
    } else {
        signer = await api.getSignerInstance(
            keypairVault.getKeyPair(activeAccountIndex)
        );
    }
    return signer;
};

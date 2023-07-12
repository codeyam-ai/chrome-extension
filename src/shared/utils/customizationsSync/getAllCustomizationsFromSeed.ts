import { RawSigner } from '@mysten/sui.js';

import getCustomizations from './getCustomizations';
import getJwtWithSigner from './getJwtWithSigner';
import KeypairVault from '_src/ui/app/KeypairVault';

import type { JsonRpcProvider, SuiAddress } from '@mysten/sui.js';
import type { AccountCustomization } from '_src/types/AccountCustomization';
import account from '_src/ui/app/redux/slices/account';

export const getAllCustomizationsFromSeed = async (
    mnemonic: string,
    provider: JsonRpcProvider
): Promise<Record<SuiAddress, AccountCustomization>> => {
    const keypairVault = new KeypairVault();
    keypairVault.mnemonic = mnemonic;

    const accountCustomizations: Record<SuiAddress, AccountCustomization> = {};

    let walletIndex = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        const signer = new RawSigner(
            keypairVault.getKeyPair(walletIndex),
            provider
        );

        const jwt = await getJwtWithSigner(signer);

        const accountCustomization = await getCustomizations(jwt);
        console.log('accountCustomization :>> ', accountCustomization);

        if (!accountCustomization) {
            break;
        }

        const address = await signer.getAddress();
        accountCustomizations[address] = accountCustomization;
        walletIndex++;
    }

    return accountCustomizations;
};

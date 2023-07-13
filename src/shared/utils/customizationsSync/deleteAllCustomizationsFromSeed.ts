import { RawSigner } from '@mysten/sui.js';

import KeypairVault, { type AccountInfo } from '_src/ui/app/KeypairVault';
import getJwtWithSigner from './getJwtWithSigner';
import saveCustomization from './saveCustomization';

import type { JsonRpcProvider } from '@mysten/sui.js';

export const deleteAllCustomizationsFromSeed = async (
    mnemonic: string,
    accountInfos: AccountInfo[],
    provider: JsonRpcProvider
): Promise<void> => {
    const keypairVault = new KeypairVault();
    keypairVault.mnemonic = mnemonic;

    const jobs = accountInfos.map(async (accountInfo) => {
        const signer = new RawSigner(
            keypairVault.getKeyPair(accountInfo.index),
            provider
        );

        const jwt = await getJwtWithSigner(signer);

        await saveCustomization(jwt, 'deleted');
    });

    await Promise.all(jobs);

    return;
};

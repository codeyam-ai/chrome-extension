import { RawSigner } from '@mysten/sui.js';

import getJwtWithSigner from './getJwtWithSigner';
import saveCustomization from './saveCustomization';
import KeypairVault, { type AccountInfo } from '_src/ui/app/KeypairVault';

import type { SuiClient } from '@mysten/sui.js/client';

export const deleteAllCustomizationsFromSeed = async (
    mnemonic: string,
    accountInfos: AccountInfo[],
    client: SuiClient
): Promise<void> => {
    const keypairVault = new KeypairVault();
    keypairVault.mnemonic = mnemonic;

    const jobs = accountInfos.map(async (accountInfo) => {
        const signer = new RawSigner(
            keypairVault.getKeyPair(accountInfo.index),
            client
        );

        const jwt = await getJwtWithSigner(signer);

        await saveCustomization(jwt, 'deleted');
    });

    await Promise.all(jobs);

    return;
};

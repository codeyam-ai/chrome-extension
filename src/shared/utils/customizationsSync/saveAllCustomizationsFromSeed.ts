import { encryptAccountCustomization } from './accountCustomizationEncryption';
import getJwtWithSigner from './getJwtWithSigner';
import saveCustomization from './saveCustomization';
import { BaseSigner } from '_src/shared/cryptography/BaseSigner';
import KeypairVault, { type AccountInfo } from '_src/ui/app/KeypairVault';

import type { SuiClient } from '@mysten/sui.js/client';

export const saveAllCustomizationsFromSeed = async (
    mnemonic: string,
    accountInfos: AccountInfo[],
    client: SuiClient
): Promise<void> => {
    const keypairVault = new KeypairVault();
    keypairVault.mnemonic = mnemonic;

    const jobs = accountInfos.map(async (accountInfo) => {
        const signer = new BaseSigner(
            keypairVault.getKeyPair(accountInfo.index),
            client
        );

        try {
            const jwt = await getJwtWithSigner(signer);

            const privateKey = keypairVault
                .getKeyPair(accountInfo.index)
                .export().privateKey;

            const encryptedAccountCustomization =
                await encryptAccountCustomization(accountInfo, privateKey);

            await saveCustomization(jwt, encryptedAccountCustomization);
        } catch (e: unknown) {
            // eslint-disable-next-line no-console
            console.error('saveAllCustomizationsFromSeed error :>> ', e);
        }
    });

    await Promise.all(jobs);

    return;
};

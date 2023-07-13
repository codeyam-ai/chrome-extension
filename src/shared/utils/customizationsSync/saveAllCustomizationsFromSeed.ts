import { RawSigner } from '@mysten/sui.js';

import { encryptAccountCustomization } from './accountCustomizationEncryption';
import getJwtWithSigner from './getJwtWithSigner';
import saveCustomizations from './saveCustomizations';
import KeypairVault, { type AccountInfo } from '_src/ui/app/KeypairVault';

import type { JsonRpcProvider, SuiAddress } from '@mysten/sui.js';
import type { AccountCustomization } from '_src/types/AccountCustomization';

export const saveAllCustomizationsFromSeed = async (
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

        const privateKey = keypairVault
            .getKeyPair(accountInfo.index)
            .export().privateKey;

        const encryptedAccountCustomization = await encryptAccountCustomization(
            accountInfo,
            privateKey
        );

        await saveCustomizations(jwt, encryptedAccountCustomization);
    });

    await Promise.all(jobs);

    return;
};

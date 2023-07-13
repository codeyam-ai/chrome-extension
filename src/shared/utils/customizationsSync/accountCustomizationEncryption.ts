import { simpleDecryptMessage, simpleEncryptMessage } from './simpleEncryption';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

export const encryptAccountCustomization = async (
    accountCustomization: AccountInfo,
    privateKey: string
) => {
    return simpleEncryptMessage(
        JSON.stringify(accountCustomization),
        privateKey
    );
};

export const decryptAccountCustomization = (
    encryptedData: string,
    privateKey: string
): AccountInfo => {
    const decryptedText = simpleDecryptMessage(encryptedData, privateKey);
    return JSON.parse(decryptedText) as AccountInfo;
};

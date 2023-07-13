import { decrypt, encrypt } from '_src/shared/encryption/password';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

export const encryptAccountCustomization = async (
    accountCustomization: AccountInfo,
    privateKey: string
) => {
    const text = JSON.stringify(accountCustomization);
    return encrypt({
        text,
        passphrase: privateKey,
        strong: true,
    });
};

export const decryptAccountCustomization = (
    encryptedData: string,
    privateKey: string
): AccountInfo => {
    const decryptedText = decrypt({
        encryptedData,
        passphrase: privateKey,
        strong: true,
    });

    return JSON.parse(decryptedText) as AccountInfo;
};

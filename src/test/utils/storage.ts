import { setLocked, setUnlocked } from '_app/helpers/lock-wallet';
import { setEncrypted } from '_shared/storagex/store';
import { PERMISSIONS_STORAGE_KEY } from '_src/background/Permissions';
import {
    AccountType,
    MNEMONIC_TEST,
    PASSPHRASE_TEST,
    PREAPPROVAL_KEY,
} from '_src/shared/constants';
import { type Permission } from '_src/shared/messaging/messages/payloads/permissions';

export const password = 'Password';
export const recoveryPhrase =
    'girl empower human spring circle ceiling wild pact stumble model wheel chuckle';

export const accountInfos = [
    {
        index: 0,
        name: 'Wallet 1',
        color: '#7E23CA',
        address:
            '0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de',
        privateKey:
            '138,218,84,37,236,236,197,76,166,86,150,23,223,51,107,198,3,149,112,132,37,250,167,223,74,224,28,199,243,20,181,211',
    },
    {
        index: 1,
        name: 'Wallet 2',
        color: '#2eca23',
        address:
            '0x4a3086b9f28f10a6e82b152581db1c792a4183723766b2b291fa49a13a9de3f7',
        privateKey:
            '39,152,242,153,62,243,130,133,194,63,255,73,56,234,127,189,45,66,228,56,187,248,98,49,146,17,246,230,110,0,222,26',
    },
];

export const privateKeys = [
    {
        address:
            '0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de',
        privateKey:
            '138,218,84,37,236,236,197,76,166,86,150,23,223,51,107,198,3,149,112,132,37,250,167,223,74,224,28,199,243,20,181,211',
    },
    {
        address:
            '0x4a3086b9f28f10a6e82b152581db1c792a4183723766b2b291fa49a13a9de3f7',
        privateKey:
            '39,152,242,153,62,243,130,133,194,63,255,73,56,234,127,189,45,66,228,56,187,248,98,49,146,17,246,230,110,0,222,26',
    },
];

export const fakeAccessToken = 'ewhfbiuh3rh23d';

export const simulateMnemonicUser = async function (unlocked = true) {
    // TODO: DRY up. There's actual app code (in the redux account slice) that sets this state up. we should find a way
    //  to invoke that code.
    const accountInfosJson = JSON.stringify(accountInfos);
    await setEncrypted({
        key: 'passphrase-test',
        value: PASSPHRASE_TEST,
        session: false,
        strong: false,
        passphrase: password,
    });
    await setEncrypted({
        key: 'accountInfos',
        value: accountInfosJson,
        session: false,
        strong: false,
    });
    await setEncrypted({
        key: 'address',
        value: accountInfos[0].address,
        session: false,
        strong: false,
    });
    await setEncrypted({
        key: 'activeAccountIndex',
        value: '0',
        session: false,
        strong: false,
    });
    await setEncrypted({
        key: 'mnemonic',
        value: recoveryPhrase,
        session: false,
        strong: true,
        passphrase: password,
    });
    await setEncrypted({
        key: 'mnemonic-test',
        value: MNEMONIC_TEST,
        session: false,
        strong: false,
        passphrase: recoveryPhrase,
    });
    await setEncrypted({
        key: 'passphraseEncryptedWithMnemonic',
        value: password,
        strong: false,
        session: false,
        passphrase: recoveryPhrase,
    });
    await setEncrypted({
        key: 'account-type',
        value: AccountType.PASSWORD,
        strong: false,
        session: false,
    });
    await setEncrypted({
        key: 'passphrase',
        value: password,
        strong: false,
        session: true,
    });
    await setUnlocked(password);
    if (!unlocked) {
        await setLocked(password);
    }
};

export const simulateEmailUser = async function () {
    const accountInfosJson = JSON.stringify(accountInfos);
    await setEncrypted({
        key: 'authentication',
        value: fakeAccessToken,
        strong: false,
        session: true,
    });
    await setEncrypted({
        key: 'accountInfos',
        value: accountInfosJson,
        session: false,
        strong: false,
    });
};

export const simulateConnectedApps = async function () {
    const permissionsToEncrypt: Record<string, Permission> = {
        'https://ethoswallet.xyz': {
            id: 'ddca6998-d673-4bce-be3a-a1872293b847',
            title: 'Ethos Wallet Explorer',
            accounts: [
                '0x189dca9b509b37fa2b0e53a4ef0dae164d465d6d8853eb6bc2da4e3d9d0c4814',
            ],
            allowed: true,
            createdDate: '2023-03-21T23:20:16.540Z',
            favIcon: 'https://ethoswallet.xyz/favicon.ico',
            origin: 'https://ethoswallet.xyz',
            permissions: [
                'viewAccount',
                'suggestTransactions',
                'suggestSignMessages',
            ],
            responseDate: '2023-03-21T23:20:16.541Z',
        },
    };
    await setEncrypted({
        key: PERMISSIONS_STORAGE_KEY,
        value: JSON.stringify(permissionsToEncrypt),
        strong: false,
        session: false,
    });

    await setEncrypted({
        key: PREAPPROVAL_KEY,
        value: JSON.stringify({}),
        strong: false,
        session: false,
    });
};

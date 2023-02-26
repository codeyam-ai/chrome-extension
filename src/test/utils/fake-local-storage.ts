import { deleteEncrypted, setEncrypted } from '_shared/storagex/store';

export const password = 'Password';
export const recoveryPhrase =
    'girl empower human spring circle ceiling wild pact stumble model wheel chuckle';

export const accountInfos = [
    {
        index: 0,
        name: 'Wallet 1',
        color: '#7E23CA',
        address: '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
        privateKey:
            '138,218,84,37,236,236,197,76,166,86,150,23,223,51,107,198,3,149,112,132,37,250,167,223,74,224,28,199,243,20,181,211,135,170,13,19,28,223,41,159,80,186,157,41,13,130,124,5,115,186,57,237,77,49,254,181,222,218,164,120,64,220,52,9',
    },
    {
        index: 1,
        name: 'Wallet 2',
        color: '#2eca23',
        address: '0x434ffd2c55c39aa97f465eb4402ca949a263b868',
        privateKey:
            '39,152,242,153,62,243,130,133,194,63,255,73,56,234,127,189,45,66,228,56,187,248,98,49,146,17,246,230,110,0,222,26,1,170,131,10,43,122,176,213,151,245,197,20,168,47,157,116,19,227,119,55,194,208,62,125,2,26,82,67,131,3,204,183',
    },
];

export const fakeAccessToken = 'ewhfbiuh3rh23d';

export const simulateMnemonicUser = async function () {
    const accountInfosJson = JSON.stringify(accountInfos);
    await setEncrypted('passphrase', password);
    await setEncrypted('accountInfos', accountInfosJson, password);
    await setEncrypted('mnemonic', recoveryPhrase, password);
    await setEncrypted('locked', `locked${password}`, password);
};

export const simulateEmailUser = async function () {
    const accountInfosJson = JSON.stringify(accountInfos);
    await setEncrypted('authentication', fakeAccessToken);
    await setEncrypted('accountInfos', accountInfosJson, fakeAccessToken);
};

export const simulateLogout = async function () {
    await deleteEncrypted('locked', password);
};

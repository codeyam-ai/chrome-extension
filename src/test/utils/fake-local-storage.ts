import { deleteEncrypted, setEncrypted } from '_shared/storagex/store';

export const password = 'A Bad Password';

export const simulateAuthenticatedUser = async function () {
    const recoveryPhrase =
        'girl empower human spring circle ceiling wild pact stumble model wheel chuckle';
    const accountInfosJson =
        '[{"index":0,"name":"Wallet","color":"#7E23CA","address":"0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b","seed":"138,218,84,37,236,236,197,76,166,86,150,23,223,51,107,198,3,149,112,132,37,250,167,223,74,224,28,199,243,20,181,211"}]';
    await setEncrypted('passphrase', password);
    await setEncrypted('acountInfos', accountInfosJson, password);
    await setEncrypted('mnemonic', recoveryPhrase, password);
    await setEncrypted('locked', `locked${password}`, password);
};

export const simulateLogout = async function () {
    await deleteEncrypted('locked', password);
};

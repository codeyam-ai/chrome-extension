import {
    deleteEncrypted,
    getEncrypted,
    setEncrypted,
} from '_shared/storagex/store';

const UNLOCKED = 'unlocked';

export const setUnlocked = async (passphrase: string) => {
    await setEncrypted({
        key: UNLOCKED,
        value: `${UNLOCKED}${passphrase}`,
        session: true,
        strong: false,
        passphrase,
    });
};

export const setLocked = async (passphrase: string) => {
    await deleteEncrypted({ key: UNLOCKED, session: true, passphrase });
};

export const isLocked = async (passphrase: string) => {
    const unlocked = await getEncrypted({
        key: UNLOCKED,
        session: true,
        strong: false,
        passphrase,
    });

    return !unlocked || unlocked !== `${UNLOCKED}${passphrase}`;
};

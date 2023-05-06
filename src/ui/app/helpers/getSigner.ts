import { fromHEX } from '@mysten/bcs';
import { Ed25519Keypair, type SuiAddress, type Keypair } from '@mysten/sui.js';

import { api, thunkExtras } from '../redux/store/thunk-extras';
import { getEncrypted } from '_src/shared/storagex/store';
import KeypairVault, { type AccountInfo } from '_src/ui/app/KeypairVault';

export const getSigner = async (
    passphrase: string | null,
    accountInfos: AccountInfo[],
    address: SuiAddress | null,
    authentication: string | null,
    activeAccountIndex: number
) => {
    let keypair: Keypair;
    let signer;

    const activeAccount = accountInfos.find(
        (accountInfo) => accountInfo.index === activeAccountIndex
    );

    if (!activeAccount) return null;

    if (authentication) {
        signer = api.getEthosSignerInstance(address || '', authentication);
    } else {
        if (!passphrase) return null;

        if (activeAccount.importedMnemonicName) {
            if (activeAccount.importedMnemonicIndex === undefined) return null;

            const importedKeyPairVault = new KeypairVault();

            const importedMnemonic = await getEncrypted({
                key: `importedMnemonic${activeAccount.importedMnemonicName}`,
                session: false,
                strong: true,
                passphrase,
            });

            if (!importedMnemonic) return null;

            importedKeyPairVault.mnemonic = importedMnemonic;
            keypair = importedKeyPairVault.getKeyPair(
                activeAccount.importedMnemonicIndex
            );
        } else if (activeAccount.importedPrivateKeyName) {
            const importedPrivateKey = await getEncrypted({
                key: `importedPrivateKey${activeAccount.importedPrivateKeyName}`,
                session: false,
                strong: true,
                passphrase,
            });

            if (!importedPrivateKey) return null;

            keypair = Ed25519Keypair.fromSecretKey(fromHEX(importedPrivateKey));
        } else if (activeAccount.importedLedgerIndex) {
            console.log('LEDGER');
            const keypairVault = thunkExtras.keypairVault;
            keypair = keypairVault.getKeyPair(activeAccountIndex);
        } else {
            const keypairVault = thunkExtras.keypairVault;

            keypair = keypairVault.getKeyPair(activeAccountIndex);
        }

        signer = api.getSignerInstance(keypair);
    }

    return signer;
};

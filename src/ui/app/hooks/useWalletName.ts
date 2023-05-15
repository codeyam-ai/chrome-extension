import { useMemo } from 'react';

import type { AccountInfo } from '../KeypairVault';

const useWalletName = (wallet?: AccountInfo) => {
    const name = useMemo(() => {
        if (!wallet) return 'Wallet';

        if (wallet.name) return wallet.name;

        if (
            wallet.importedMnemonicName !== undefined &&
            wallet.importedMnemonicIndex !== undefined &&
            wallet.importedLedgerIndex !== undefined
        ) {
            return `${wallet.importedMnemonicName} ${
                wallet.importedMnemonicIndex + 1
            }`;
        }

        if (wallet.importedPrivateKeyName) return wallet.importedPrivateKeyName;

        return '';
    }, [wallet]);

    return name;
};

export default useWalletName;

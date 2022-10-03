import { useCallback } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { useAppSelector } from '../hooks';
import { activeAccountSelector } from '../redux/slices/account';
import { PERMISSIONS_STORAGE_KEY } from '_src/background/Permissions';
import { BASE_URL } from '_src/shared/constants';
import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';

const useExplorerPermission = () => {
    const activeAddress = useAppSelector(activeAccountSelector);

    const setExplorerPermission = useCallback(async () => {
        if (!activeAddress) return;

        const permissionsString = await getEncrypted(PERMISSIONS_STORAGE_KEY);
        const permissions = JSON.parse(permissionsString || '{}');

        if (
            !permissions[BASE_URL] ||
            permissions[BASE_URL].accounts.indexOf(activeAddress) === -1 ||
            permissions[BASE_URL].permissions.length === 0
        ) {
            const walletExplorerPermission = {
                id: uuidV4(),
                title: 'Ethos Wallet Explorer',
                accounts: [activeAddress],
                allowed: true,
                createdDate: new Date().toISOString(),
                favIcon: `${BASE_URL}/favicon.ico`,
                origin: BASE_URL,
                permissions: [
                    'viewAccount',
                    'suggestTransactions',
                    'suggestSignMessages',
                ],
                responseDate: new Date().toISOString(),
            };

            permissions[BASE_URL] = walletExplorerPermission;
            await setEncrypted(
                PERMISSIONS_STORAGE_KEY,
                JSON.stringify(permissions)
            );
        }
    }, [activeAddress]);

    return setExplorerPermission;
};

export default useExplorerPermission;

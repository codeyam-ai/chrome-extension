import { useCallback } from 'react';
import { v4 as uuidV4 } from 'uuid';

import { useAppSelector } from '../hooks';
import { activeAccountSelector } from '../redux/slices/account';
import { PERMISSIONS_STORAGE_KEY } from '_src/background/Permissions';
import { LINK_URL } from '_src/shared/constants';
import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';

const useExplorerPermission = () => {
    const activeAddress = useAppSelector(activeAccountSelector);

    const setExplorerPermission = useCallback(async () => {
        if (!activeAddress) return;

        const permissionsString = await getEncrypted({
            key: PERMISSIONS_STORAGE_KEY,
            session: false,
            strong: false,
        });
        const permissions = JSON.parse(permissionsString || '{}');

        if (
            !permissions[LINK_URL] ||
            permissions[LINK_URL].accounts.indexOf(activeAddress) === -1 ||
            permissions[LINK_URL].permissions.length === 0
        ) {
            const walletExplorerPermission = {
                id: uuidV4(),
                title: 'Ethos Wallet Explorer',
                accounts: [activeAddress],
                allowed: true,
                createdDate: new Date().toISOString(),
                favIcon: `${LINK_URL}/favicon.ico`,
                origin: LINK_URL,
                permissions: [
                    'viewAccount',
                    'suggestTransactions',
                    'suggestSignMessages',
                    'setAccountCustomizations',
                ],
                responseDate: new Date().toISOString(),
            };

            permissions[LINK_URL] = walletExplorerPermission;
            await setEncrypted({
                key: PERMISSIONS_STORAGE_KEY,
                session: false,
                strong: false,
                value: JSON.stringify(permissions),
            });
        }
    }, [activeAddress]);

    return setExplorerPermission;
};

export default useExplorerPermission;

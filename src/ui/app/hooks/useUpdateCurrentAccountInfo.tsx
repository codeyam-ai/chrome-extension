import { useCallback, useEffect, useState } from 'react';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { type AccountInfo } from '../KeypairVault';
import Authentication from '_src/background/Authentication';
import { getEncrypted } from '_src/shared/storagex/store';
import saveCustomizations from '_src/shared/utils/customizationsSync/saveCustomizations';
import useJwt from '_src/shared/utils/customizationsSync/useJwt';
import {
    saveAccountInfos,
    setAccountInfos,
} from '_src/ui/app/redux/slices/account';

export const useUpdateCurrentAccountInfo = () => {
    const [isHostedWallet, setIsHostedWallet] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { getCachedJwt } = useJwt();
    const { accountInfos, activeAccountIndex } = useAppSelector(
        ({ account }) => account
    );

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted({
                key: 'authentication',
                session: true,
                strong: false,
            });
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

    const handleSaveCustomization = useCallback(
        async (_accountInfos: AccountInfo[], accountIndex: number) => {
            const jwt = await getCachedJwt();
            try {
                await saveCustomizations(jwt, _accountInfos[accountIndex]);
            } catch (error) {
                console.error('Failed saving customizations to server:', error);
            }
        },
        [getCachedJwt]
    );

    const updateCurrentAccountInfo = async (
        updatedInfo: Partial<AccountInfo>
    ) => {
        const newAccountInfos = [...accountInfos];
        const currentAccountInfoIndex = newAccountInfos.findIndex(
            (accountInfo) => accountInfo.index === activeAccountIndex
        );
        newAccountInfos[currentAccountInfoIndex] = {
            ...newAccountInfos[currentAccountInfoIndex],
            ...updatedInfo,
        };

        await _saveAccountInfos(newAccountInfos);

        await handleSaveCustomization(newAccountInfos, currentAccountInfoIndex);
    };

    const _saveAccountInfos = async (newAccountInfos: AccountInfo[]) => {
        if (isHostedWallet) {
            await Authentication.updateAccountInfos(newAccountInfos);
            await dispatch(setAccountInfos(newAccountInfos));
            await Authentication.getAccountInfos(true);
        } else {
            await dispatch(saveAccountInfos(newAccountInfos));
        }
    };

    return { updateCurrentAccountInfo };
};

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
import { useDependencies } from '_src/shared/utils/dependenciesContext';
import { encrypt } from '_src/shared/encryption/password';
import { thunkExtras } from '../redux/store/thunk-extras';
import { encryptAccountCustomization } from '_src/shared/utils/customizationsSync/accountCustomizationEncryption';

export const useUpdateCurrentAccountInfo = () => {
    const [isHostedWallet, setIsHostedWallet] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { featureFlags } = useDependencies();
    const { getCachedJwt } = useJwt();
    const { accountInfos, activeAccountIndex } = useAppSelector(
        ({ account }) => account
    );
    const keypairVault = thunkExtras.keypairVault;

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

            const privateKey = keypairVault
                .getKeyPair(accountIndex)
                .export().privateKey;

            const encryptedAccountCustomization =
                await encryptAccountCustomization(
                    _accountInfos[accountIndex],
                    privateKey
                );

            try {
                await saveCustomizations(jwt, encryptedAccountCustomization);
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

        if (featureFlags.showWipFeatures) {
            await handleSaveCustomization(
                newAccountInfos,
                currentAccountInfoIndex
            );
        }
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

import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import useAppDispatch from './useAppDispatch';
import { type AccountInfo } from '../KeypairVault';
import { type RootState } from '_redux/RootReducer';
import Authentication from '_src/background/Authentication';
import { getEncrypted } from '_src/shared/storagex/store';
import {
    saveAccountInfos,
    setAccountInfos,
} from '_src/ui/app/redux/slices/account';
import useAppSelector from './useAppSelector';
import { useSuiLedgerClient } from '../components/ledger/SuiLedgerClientProvider';
import getJwt from '_src/shared/utils/customizationsSync/getJwt';
import saveCustomizations from '_src/shared/utils/customizationsSync/saveCustomizations';

export const useUpdateCurrentAccountInfo = () => {
    const [isHostedWallet, setIsHostedWallet] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { connectToLedger } = useSuiLedgerClient();
    const {
        accountInfos,
        authentication,
        passphrase,
        activeAccountIndex,
        address,
    } = useAppSelector(({ account }) => account);

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
            const jwt = await getJwt(
                connectToLedger,
                passphrase || '',
                authentication,
                address || '',
                _accountInfos,
                accountIndex
            );
            try {
                await saveCustomizations(jwt, _accountInfos[accountIndex]);
            } catch (error) {
                console.error('Failed saving customizations to server:', error);
            }
        },
        [connectToLedger, passphrase, authentication, address]
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

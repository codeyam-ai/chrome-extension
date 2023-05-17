// src/ui/app/hooks/useUpdateCurrentAccountInfo.ts
import { useState, useEffect } from 'react';
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

export const useUpdateCurrentAccountInfo = () => {
    const [isHostedWallet, setIsHostedWallet] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const accountInfos = useSelector(
        (state: RootState) => state.account.accountInfos
    );
    const activeAccountIndex = useSelector(
        (state: RootState) => state.account.activeAccountIndex
    );
    console.log('accountInfos :>> ', accountInfos);

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

    const updateCurrentAccountInfo = async (
        updatedInfo: Partial<AccountInfo>
    ) => {
        const newAccountInfos = [...accountInfos];
        const currentAccountInfo = newAccountInfos[activeAccountIndex];
        newAccountInfos[activeAccountIndex] = {
            ...currentAccountInfo,
            ...updatedInfo,
        };

        await _saveAccountInfos(newAccountInfos);
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

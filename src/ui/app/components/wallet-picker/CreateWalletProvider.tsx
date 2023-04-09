import { useCallback, useEffect, useRef } from 'react';

import { type AccountInfo } from '../../KeypairVault';
import getNextEmoji from '../../helpers/getNextEmoji';
import getNextWalletColor from '../../helpers/getNextWalletColor';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
    saveAccountInfos,
    saveActiveAccountIndex,
    setAccountInfos,
} from '../../redux/slices/account';
import { clearForNetworkOrWalletSwitch } from '../../redux/slices/sui-objects';
import { thunkExtras } from '../../redux/store/thunk-extras';
import Authentication from '_src/background/Authentication';
import Permissions from '_src/background/Permissions';

import type { Dispatch, SetStateAction } from 'react';

/*
    Because creating a wallet extensively uses hooks (and hooks can't be used outside
    react components), this component wraps a given component and provides a function
    to be called that creates a new wallet and navigates to the home page.
*/

interface CreateWalletProviderProps {
    setCreateWallet: Dispatch<SetStateAction<() => void>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    children: JSX.Element;
}

const CreateWalletProvider = ({
    setCreateWallet,
    setLoading,
    children,
}: CreateWalletProviderProps) => {
    const dispatch = useAppDispatch();
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const authentication = useAppSelector(
        ({ account }) => account.authentication
    );
    const keypairVault = thunkExtras.keypairVault;
    const draftAccountInfos = useRef<AccountInfo[]>(accountInfos);

    const getAccountInfos = useCallback(async () => {
        if (authentication) return;

        if (draftAccountInfos.current.length === 0) {
            draftAccountInfos.current = [
                {
                    index: 0,
                    address: keypairVault.getAddress(0) || '',
                },
            ];
        }

        const accountInfosWithAddresses = draftAccountInfos.current.map(
            (accountInfo: AccountInfo) => {
                const address =
                    accountInfo.address ||
                    keypairVault.getAddress(accountInfo.index) ||
                    '';
                return {
                    ...accountInfo,
                    address,
                };
            }
        );
        setAccountInfos(accountInfosWithAddresses);
    }, [authentication, keypairVault]);

    const _saveAccountInfos = useCallback(async () => {
        if (authentication) {
            Authentication.updateAccountInfos(draftAccountInfos.current);
            await dispatch(setAccountInfos(draftAccountInfos.current));
            await Authentication.getAccountInfos(true);
        } else {
            await dispatch(clearForNetworkOrWalletSwitch());
            await dispatch(saveAccountInfos(draftAccountInfos.current));
            await dispatch(
                saveActiveAccountIndex(draftAccountInfos.current.length - 1)
            );
            getAccountInfos();
        }
    }, [authentication, dispatch, getAccountInfos]);

    const createWallet = useCallback(() => {
        const loadAccFromStorage = async () => {
            const sortedAccountIndices = accountInfos
                .map((a) => a.index || 0)
                .sort(function (a, b) {
                    return a - b;
                });
            const nextAccountIndex =
                +sortedAccountIndices[sortedAccountIndices.length - 1] + 1;

            let newAccountInfos: AccountInfo[];
            if (authentication) {
                const newAccount = await Authentication.createAccount(
                    nextAccountIndex
                );
                if (newAccount) {
                    newAccount.name = `Wallet ${accountInfos.length + 1}`;
                    newAccount.color = getNextWalletColor(nextAccountIndex);
                    newAccount.emoji = getNextEmoji(nextAccountIndex);
                }
                newAccountInfos = newAccount
                    ? [...accountInfos, newAccount]
                    : accountInfos;

                draftAccountInfos.current = newAccountInfos;
                _saveAccountInfos();
            } else {
                newAccountInfos = [
                    ...accountInfos,
                    {
                        index: nextAccountIndex,
                        name: `Wallet ${accountInfos.length + 1}`,
                        color: getNextWalletColor(nextAccountIndex),
                        emoji: getNextEmoji(nextAccountIndex),
                        address:
                            keypairVault.getAddress(nextAccountIndex) || '',
                    },
                ];

                draftAccountInfos.current = newAccountInfos;
            }

            await Permissions.grantEthosDashboardBasicPermissionsForAccount(
                newAccountInfos[nextAccountIndex].address
            );

            setAccountInfos(newAccountInfos);
        };

        const executeWithLoading = async () => {
            setLoading(true);
            await loadAccFromStorage();
            await _saveAccountInfos();
            setLoading(false);
        };
        executeWithLoading();
    }, [
        keypairVault,
        authentication,
        accountInfos,
        _saveAccountInfos,
        setLoading,
    ]);

    useEffect(() => {
        setCreateWallet(() => createWallet);
    }, [createWallet, setCreateWallet, accountInfos]);

    return children;
};

export default CreateWalletProvider;

import jwt_decode from 'jwt-decode';
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
import { thunkExtras } from '../../redux/store/thunk-extras';
import { clearForNetworkOrWalletSwitch as clearBalancesForNetworkOrWalletSwitch } from '_redux/slices/balances';
import { clearForNetworkOrWalletSwitch as clearTokensForNetworkOrWalletSwitch } from '_redux/slices/sui-objects';
import Authentication from '_src/background/Authentication';
import Permissions from '_src/background/Permissions';
import saveCustomizations from '_src/shared/utils/customizationsSync/saveCustomizations';

import type { Dispatch, SetStateAction } from 'react';
import { useDependencies } from '_src/shared/utils/dependenciesContext';
import useJwt from '_src/shared/utils/customizationsSync/useJwt';
import { encrypt } from '_src/shared/encryption/password';
import { encryptAccountCustomization } from '_src/shared/utils/customizationsSync/encryption';

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
    const { accountInfos, authentication } = useAppSelector(
        ({ account }) => account
    );
    const { getCachedJwt } = useJwt();
    const { featureFlags } = useDependencies();

    const keypairVault = thunkExtras.keypairVault;
    const draftAccountInfos = useRef<AccountInfo[]>(accountInfos);

    const handleSaveCustomization = useCallback(
        async (
            _address: string,
            _accountInfos: AccountInfo[],
            accountIndex: number
        ) => {
            const jwt = await getCachedJwt(
                _address,
                accountIndex,
                _accountInfos
            );

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
            await dispatch(clearTokensForNetworkOrWalletSwitch());
            await dispatch(clearBalancesForNetworkOrWalletSwitch());
            await dispatch(saveAccountInfos(draftAccountInfos.current));
            await dispatch(
                saveActiveAccountIndex(draftAccountInfos.current.length - 1)
            );
            getAccountInfos();
        }
    }, [authentication, dispatch, getAccountInfos]);

    const createWallet = useCallback(() => {
        const loadAccFromStorage = async () => {
            const relevantAccountInfos = accountInfos.filter(
                (a) =>
                    a.importedMnemonicIndex === undefined &&
                    a.importedPrivateKeyName === undefined &&
                    a.ledgerAccountIndex === undefined
            );
            const sortedAccountIndices = relevantAccountInfos
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
                    newAccount.nickname = `Wallet ${
                        relevantAccountInfos.length + 1
                    }`;
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
                        nickname: `Wallet ${relevantAccountInfos.length + 1}`,
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

            if (featureFlags.showWipFeatures) {
                await handleSaveCustomization(
                    keypairVault.getAddress(nextAccountIndex) || '',
                    newAccountInfos,
                    nextAccountIndex
                );
            }
        };

        const executeWithLoading = async () => {
            setLoading(true);
            await loadAccFromStorage();
            await _saveAccountInfos();
            setLoading(false);
        };
        executeWithLoading();
    }, [
        accountInfos,
        authentication,
        featureFlags.showWipFeatures,
        _saveAccountInfos,
        keypairVault,
        handleSaveCustomization,
        setLoading,
    ]);

    useEffect(() => {
        setCreateWallet(() => createWallet);
    }, [createWallet, setCreateWallet, accountInfos]);

    return children;
};

export default CreateWalletProvider;

import { useRef, useCallback } from 'react';
import Authentication from '_src/background/Authentication';
import getNextWalletColor from '../../helpers/getNextWalletColor';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { type AccountInfo } from '../../KeypairVault';
import {
    setAccountInfos,
    saveAccountInfos,
    saveActiveAccountIndex,
} from '../../redux/slices/account';
import { thunkExtras } from '../../redux/store/thunk-extras';
import Button from '../../shared/buttons/Button';

const CreateWalletButton = () => {
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
                    seed: (keypairVault.getSeed(0) || '').toString(),
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
            setAccountInfos(draftAccountInfos.current);
        } else {
            await dispatch(saveAccountInfos(draftAccountInfos.current));
            await dispatch(
                saveActiveAccountIndex(draftAccountInfos.current.length - 1)
            );
            getAccountInfos();
        }

        // setEdit(false);
    }, [authentication, dispatch, getAccountInfos]);

    const createWallet = useCallback(() => {
        // setLoading(true);
        const loadAccFromStorage = async () => {
            const sortedAccountIndices = accountInfos
                .map((a) => a.index || 0)
                .sort();
            const nextAccountIndex =
                +sortedAccountIndices[sortedAccountIndices.length - 1] + 1;

            console.log('nextAccountIndex :>> ', nextAccountIndex);
            let newAccountInfos: AccountInfo[];
            console.log('authentication :>> ', authentication);
            if (authentication) {
                const newAccount = await Authentication.createAccount(
                    nextAccountIndex
                );
                newAccountInfos = newAccount
                    ? [...accountInfos, newAccount]
                    : accountInfos;

                draftAccountInfos.current = newAccountInfos;
            } else {
                newAccountInfos = [
                    ...accountInfos,
                    {
                        index: nextAccountIndex,
                        name: `Wallet ${accountInfos.length + 1}`,
                        color: getNextWalletColor(nextAccountIndex),
                        address:
                            keypairVault.getAddress(nextAccountIndex) || '',
                        seed: (
                            keypairVault.getSeed(nextAccountIndex) || ''
                        ).toString(),
                    },
                ];

                draftAccountInfos.current = newAccountInfos;
            }

            console.log('newAccountInfos :>> ', newAccountInfos);

            setAccountInfos(newAccountInfos);

            // setLoading(false);
            // setEdit(true);
        };
        loadAccFromStorage();
        _saveAccountInfos();
    }, [keypairVault, authentication, accountInfos]);

    return (
        <Button buttonStyle="primary" onClick={createWallet}>
            Create Wallet
        </Button>
    );
};

export default CreateWalletButton;

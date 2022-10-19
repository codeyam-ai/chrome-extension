import { useCallback, useEffect, useRef, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';

import {
    useAppDispatch,
    useAppSelector,
    useMiddleEllipsis,
} from '../../../hooks';
import {
    setAccountInfos as setStateAccountInfos,
    saveAccountInfos,
    saveActiveAccountIndex,
} from '../../../redux/slices/account';
import { thunkExtras } from '../../../redux/store/thunk-extras';
import Button, { ButtonStyle } from '../../../shared/buttons/Button';
import Icon, { SuiIcons } from '../../icon';
import LoadingIndicator from '../../loading/LoadingIndicator';
import { useNextMenuUrl } from '../hooks';
import Layout from './layout';
import Authentication from '_src/background/Authentication';

import type { AccountInfo } from '../../../KeypairVault';
import type { ColorResult } from 'react-color';

const plusIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
);

const pencilIcon = (
    <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-1"
    >
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);

export default function SwitchWallet() {
    const mainMenuUrl = useNextMenuUrl(true, '/');
    const authentication = useAppSelector(
        ({ account }) => account.authentication
    );

    const _accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const draftAccountInfos = useRef<AccountInfo[]>(_accountInfos);
    const [accountInfos, setAccountInfos] = useState<AccountInfo[]>(
        draftAccountInfos.current
    );

    const [edit, setEdit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const keypairVault = thunkExtras.keypairVault;
    const dispatch = useAppDispatch();
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );
    const navigate = useNavigate();

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
            await dispatch(setStateAccountInfos(draftAccountInfos.current));
            setAccountInfos(draftAccountInfos.current);
        } else {
            await dispatch(saveAccountInfos(draftAccountInfos.current));
            getAccountInfos();
        }

        setEdit(false);
    }, [authentication, dispatch, getAccountInfos]);

    const _createWallet = useCallback(() => {
        setLoading(true);
        const loadAccFromStorage = async () => {
            const sortedAccountIndices = accountInfos
                .map((a) => a.index || 0)
                .sort();
            const nextAccountIndex =
                +sortedAccountIndices[sortedAccountIndices.length - 1] + 1;

            let newAccountInfos: AccountInfo[];
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
                        address:
                            keypairVault.getAddress(nextAccountIndex) || '',
                        seed: (
                            keypairVault.getSeed(nextAccountIndex) || ''
                        ).toString(),
                    },
                ];

                draftAccountInfos.current = newAccountInfos;
            }

            setAccountInfos(draftAccountInfos.current);
            await dispatch(saveAccountInfos(newAccountInfos));
            await dispatch(saveActiveAccountIndex(newAccountInfos.length - 1));

            setLoading(false);
            setEdit(true);
        };
        loadAccFromStorage();
    }, [keypairVault, dispatch, authentication, accountInfos]);

    const _toggleEdit = useCallback(() => {
        setEdit((prev) => !prev);
    }, []);

    const _cancelEdit = useCallback(() => {
        setEdit(false);
    }, []);

    const _handleChange = useCallback(
        ({
            index,
            name,
            color,
        }: {
            index: number;
            name?: string;
            color?: string;
        }) => {
            draftAccountInfos.current = draftAccountInfos.current.map(
                (accountInfo: AccountInfo) => {
                    return (accountInfo.index || 0) === index
                        ? {
                              ...accountInfo,
                              name: name || accountInfo.name,
                              color: color || accountInfo.color,
                          }
                        : accountInfo;
                }
            );
        },
        []
    );

    useEffect(() => {
        getAccountInfos();
    }, [getAccountInfos]);

    const AddressButton = ({
        info,
        isActive,
        onChange,
    }: {
        info: AccountInfo;
        isActive: boolean;
        onChange: ({
            index,
            name,
            color,
        }: {
            index: number;
            name?: string;
            color?: string;
        }) => void;
    }) => {
        const { address, index, name: currentName, color: currentColor } = info;
        const shortenedAddress = useMiddleEllipsis(address, 10, 6);
        const [name, setName] = useState<string>(
            currentName || `Wallet ${index + 1}`
        );
        const [color, setColor] = useState<string>(currentColor || '#7E23CA');
        const [colors, setColors] = useState<boolean>(false);

        const switchToThisWallet = useCallback(async () => {
            if (edit) return;
            if (isActive) return;
            await dispatch(saveActiveAccountIndex(index));
            navigate('/');
        }, [index, isActive]);

        const _toggleColors = useCallback(() => {
            setColors((prev) => !prev);
        }, []);

        const _handleNameChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const newName = e.target.value;
                setName(newName);
                onChange({ index, name: newName });
            },
            [onChange, index]
        );

        const _handleColorChange = useCallback(
            (colorResult: ColorResult) => {
                const color = colorResult.hex;
                setColor(color);
                onChange({ index, color });
                _toggleColors();
            },
            [_toggleColors, index, onChange]
        );

        return (
            <button
                onClick={switchToThisWallet}
                className={
                    (isActive
                        ? 'cursor-default'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-600') +
                    ' ' +
                    'flex flex-col flex-1 relative truncate items-center text-sm font-medium rounded-md border border-gray-300 bg-white dark:border-gray-500 dark:bg-gray-700 px-4 py-2 shadow-sm'
                }
            >
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-6 h-6 rounded-full flex justify-center items-center"
                            style={{ backgroundColor: color }}
                        >
                            {edit && (
                                <svg
                                    viewBox="0 0 24 24"
                                    width="12"
                                    height="12"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="black"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    onClick={_toggleColors}
                                    className="cursor-pointer"
                                >
                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                </svg>
                            )}
                        </div>
                        <div className="flex-1 truncate text-sm">
                            {edit ? (
                                <input
                                    type="text"
                                    onChange={_handleNameChange}
                                    value={name}
                                    className="w-full py-1 px-2 mb-1 text-sm rounded-md focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                                />
                            ) : (
                                <span className="float-left ">{name}</span>
                            )}
                            <br />
                            <span className="float-left text-sm text-gray-500 dark:text-gray-400">
                                {shortenedAddress}
                            </span>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        {isActive && (
                            <Icon
                                className="mr-2 text-xs text-black dark:text-white"
                                icon={SuiIcons.Checkmark}
                            />
                        )}
                    </div>
                </div>

                {colors && (
                    <div style={{ marginLeft: '-18px' }}>
                        <TwitterPicker
                            color={color}
                            onChangeComplete={_handleColorChange}
                        />
                    </div>
                )}
            </button>
        );
    };

    return (
        <Layout backUrl={mainMenuUrl} title="Your Wallets">
            <div>
                <div>
                    <ul className="grid grid-cols-1 gap-2">
                        {accountInfos.map((accountInfo, key) => {
                            return (
                                <li
                                    key={key}
                                    className="col-span-1 flex rounded-md shadow-sm"
                                >
                                    <AddressButton
                                        info={accountInfo}
                                        isActive={
                                            (accountInfo.index || 0) ===
                                            activeAccountIndex
                                        }
                                        onChange={_handleChange}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {loading && (
                    <div className="flex justify-center items-center p-6 text-xl">
                        <LoadingIndicator />
                    </div>
                )}
                {!loading && edit && (
                    <div className="mt-2">
                        <Button
                            buttonStyle={ButtonStyle.PRIMARY}
                            onClick={_saveAccountInfos}
                        >
                            Save
                        </Button>
                        <Button
                            buttonStyle={ButtonStyle.SECONDARY}
                            onClick={_cancelEdit}
                            className="mt-2"
                        >
                            Cancel
                        </Button>
                    </div>
                )}
                {!loading && !edit && (
                    <div>
                        <Button
                            buttonStyle={ButtonStyle.SECONDARY}
                            onClick={_toggleEdit}
                            className="mt-2"
                        >
                            {pencilIcon} Edit Wallet Names &amp; Colors
                        </Button>
                        <Button
                            buttonStyle={ButtonStyle.PRIMARY}
                            onClick={_createWallet}
                            className="mt-2"
                        >
                            {plusIcon} Create New Wallet
                        </Button>
                    </div>
                )}
            </div>
        </Layout>
    );
}

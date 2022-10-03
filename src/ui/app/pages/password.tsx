// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DarkModeToggle from '../components/darkModeToggle';
import logo from '../components/logo/ethos-logo.png';
import { AppState } from '../hooks/useInitializedGuard';
import { savePassphrase } from '../redux/slices/account';
import Button, { ButtonStyle } from '../shared/Button';
import Loading from '_components/loading';
import { useAppDispatch, useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';

const PasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const checkingInitialized = useInitializedGuard(AppState.PASSWORD);
    const [passphrase, setPassphrase] = useState<string>('');
    const [passphraseConfirm, setPassphraseConfirm] = useState<string>('');
    const [dontMatch, setDontMatch] = useState<boolean>(false);

    const _onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassphrase(e.target.value);
        setDontMatch(false);
    }, []);

    const _onChangeConfirm = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassphraseConfirm(e.target.value);
            setDontMatch(false);
        },
        []
    );

    const _save = useCallback(async () => {
        if (passphrase.length === 0 || passphraseConfirm.length === 0) return;
        if (passphrase !== passphraseConfirm) {
            setDontMatch(true);
        } else {
            await dispatch(savePassphrase(passphrase));
            navigate('/');
        }
    }, [passphrase, passphraseConfirm, dispatch, navigate]);

    return (
        <PageLayout forceFullscreen={true}>
            <Loading loading={checkingInitialized}>
                <div className="w-full mb-2">
                    <span className="float-right">
                        <DarkModeToggle />
                    </span>
                </div>
                <div className="mx-auto max-w-sm pt-6 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-lg px-10 bg-white dark:text-white dark:bg-gray-800 dark:sm:border-gray-700 dark:sm:border-[1px]">
                    <div className="divide-y divide-gray-300/50">
                        <div className="text-center py-4 text-base">
                            <h1 className="mb-4 font-semibold tracking-tight">
                                <img
                                    src={logo}
                                    className="h-36 mx-auto pb-3"
                                    alt=""
                                />
                                {/* <EthosLogo width={50} /> */}
                                <span className="block text-5xl">Ethos</span>
                                <span className="block text-ethos-primary dark:text-violet-400 font-thin text-lg">
                                    The new web awaits
                                </span>
                            </h1>
                            <p className="text-lg mb-4">
                                Please provide a passphrase to ensure your
                                wallet is secure.
                            </p>
                            {dontMatch && (
                                <div className="mb-3 text-sm text-red-600">
                                    The passphrases must match.
                                </div>
                            )}
                            <div className="mb-3">
                                <input
                                    type="password"
                                    autoFocus={true}
                                    placeholder="Password"
                                    value={passphrase}
                                    onChange={_onChange}
                                    className="w-full py-1 px-2 mb-1 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={passphraseConfirm}
                                    onChange={_onChangeConfirm}
                                    className="w-full py-1 px-2 mb-1 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                                />
                            </div>
                            <Button
                                buttonStyle={
                                    passphrase.length > 0 &&
                                    passphraseConfirm.length > 0
                                        ? ButtonStyle.PRIMARY
                                        : ButtonStyle.SECONDARY
                                }
                                onClick={_save}
                            >
                                Save
                            </Button>
                        </div>
                        <div className="pt-3 text-base font-semibold">
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                Are you a developer? Add Ethos sign-in to your
                                dApp.{' '}
                                <a
                                    href="https://ethoswallet.xyz/dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-purple-700 hover:text-purple-800 dark:text-violet-400 dark:hover:text-violet-300"
                                >
                                    Learn how →
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </Loading>
        </PageLayout>
    );
};

export default PasswordPage;

// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Link } from 'react-router-dom';

import DarkModeToggle from '../components/darkModeToggle';
import logo from '../components/logo/ethos-logo.png';
import { AppState } from '../hooks/useInitializedGuard';
import Button, { ButtonStyle } from '../shared/Button';
import Loading from '_components/loading';
import { useInitializedGuard } from '_hooks';
import PageLayout from '_pages/layout';

const WelcomePage = () => {
    const checkingInitialized = useInitializedGuard(AppState.UNINITIALIZED);
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
                                Welcome, let&apos;s get started!
                            </p>
                            <Button
                                buttonStyle={ButtonStyle.PRIMARY}
                                to="/initialize/create"
                            >
                                Create A New Wallet
                            </Button>
                            <Button
                                buttonStyle={ButtonStyle.SECONDARY}
                                to="/initialize/hosted"
                                className="mt-3"
                            >
                                Sign In With Email
                            </Button>
                        </div>
                        <div className="pt-3 text-base font-semibold">
                            <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                                Have a recovery phrase?{' '}
                                <Link
                                    to="/initialize/import"
                                    className="text-sm text-purple-700 hover:text-purple-800 dark:text-violet-400 dark:hover:text-violet-300"
                                >
                                    Import →
                                </Link>
                            </p>

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

export default WelcomePage;

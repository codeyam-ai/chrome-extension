// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../components/logo/ethos-logo.png';
import Button, { ButtonStyle } from '../../shared/buttons/Button';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { setMnemonic } from '_src/ui/app/redux/slices/account';

import type { ChangeEventHandler } from 'react';

const BackupPage = () => {
    const [hasSavedPhrase, setHasSavedPhrase] = useState(false);
    const onHandleSavedPhrase = useCallback<
        ChangeEventHandler<HTMLInputElement>
    >((event) => {
        const checked = event.target.checked;
        setHasSavedPhrase(checked);
    }, []);
    const mnemonic = useAppSelector(
        ({ account }) => account.createdMnemonic || account.mnemonic
    );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleOnClick = useCallback(() => {
        if (mnemonic) {
            navigate('/');
            dispatch(setMnemonic(mnemonic));
        }
    }, [navigate, dispatch, mnemonic]);
    return (
        <>
            <img src={logo} className="h-36 mx-auto pb-3" alt="" />
            <h1 className="text-xl font-semibold tracking-tight sm:text-4xl pb-3">
                Your Recovery Phrase
            </h1>
            <p className="text-base max-w-md mx-auto text-gray-700 dark:text-gray-400">
                This phrase is the <strong>only</strong> way to recover your
                wallet. Do not share it with anyone!
            </p>
            <textarea
                rows={3}
                value={mnemonic || ''}
                id="mnemonic"
                className="mt-4 max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                name="mnemonic"
                disabled={true}
            />

            <div className="my-4 w-full relative flex items-start text-left">
                <div className="flex">
                    <div className="flex items-center h-5">
                        <input
                            id="save-phrase-check"
                            aria-describedby="save-phrase-check-description"
                            name="save-phrase-check"
                            type="checkbox"
                            onChange={onHandleSavedPhrase}
                            checked={hasSavedPhrase}
                            className="h-4 w-4 rounded text-purple-600 border-gray-300 focus:ring-purple-500 dark:text-violet-700 dark:focus:ring-violet-700 dark:border-gray-400 dark:bg-gray-700"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label
                            htmlFor="save-phrase-check"
                            className="font-medium text-gray-700 dark:text-gray-400"
                            id="save-phrase-check-description"
                        >
                            I saved my recovery phrase
                        </label>
                    </div>
                </div>
            </div>
            <Button
                buttonStyle={ButtonStyle.PRIMARY}
                type="button"
                onClick={handleOnClick}
                disabled={!hasSavedPhrase}
            >
                Continue
            </Button>
        </>
    );
};

export default BackupPage;

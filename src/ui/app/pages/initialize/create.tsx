// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../components/logo/ethos-logo.png';
import Button, { ButtonStyle } from '../../shared/buttons/Button';
import BackButton from './BackButton';
import ExternalLink from '_components/external-link';
import { ToS_LINK } from '_shared/constants';
import Loading from '_src/ui/app/components/loading';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { createMnemonic } from '_src/ui/app/redux/slices/account';

const CreatePage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onHandleCreate = useCallback(async () => {
        await dispatch(createMnemonic());
        navigate('../backup');
    }, [dispatch, navigate]);
    const creatingMnemonic = useAppSelector(({ account }) => account.creating);
    return (
        <>
            <BackButton to="/" />
            <img src={logo} className="h-36 mx-auto pb-3" alt="" />
            <h1 className="text-xl font-semibold tracking-tight sm:text-4xl">
                Create a Wallet
            </h1>
            <div className="text-center space-y-6 py-3">
                <p className="text-lg max-w-md mx-auto text-gray-700 dark:text-gray-400">
                    Creating a wallet generates a recovery phrase. Using it you
                    can restore the wallet.
                </p>
                <Loading loading={creatingMnemonic}>
                    <Button
                        buttonStyle={ButtonStyle.PRIMARY}
                        className="my-4"
                        type="button"
                        onClick={onHandleCreate}
                        disabled={creatingMnemonic}
                    >
                        Create
                    </Button>
                </Loading>
                <p className="mt-4 text-center text-base text-gray-700 dark:text-gray-400">
                    By creating a wallet, you have read and agreed to the{' '}
                    <ExternalLink className="underline" href={ToS_LINK}>
                        Terms of Service
                    </ExternalLink>
                </p>
            </div>
        </>
    );
};

export default CreatePage;

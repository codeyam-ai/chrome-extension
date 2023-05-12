// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import useAppSelector from './useAppSelector';
import { AUTHENTICATION_REQUESTED } from '_pages/initialize/hosted';
import { AccountType } from '_shared/constants';
import { openInNewTab } from '_src/shared/utils';

export enum AppState {
    UNINITIALIZED = 'uninitialized',
    LOADING = 'loading',
    MNEMONIC = 'mnemonic',
    PASSWORD = 'password',
    HOSTED = 'hosted',
    LOCKED = 'locked',
}

export default function useInitializedGuard(
    state: AppState | AppState[],
    shouldOpenNewTabIfUninitialized?: boolean
) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const params = useParams();

    let currentState = AppState.UNINITIALIZED;

    const accountType = useAppSelector((state) => state.account.accountType);
    const loading = useAppSelector((state) => state.account.loading);
    if (loading) currentState = AppState.LOADING;

    const passwordReady = useAppSelector((state) => !!state.account.passphrase);
    const mnemonicReady = useAppSelector((state) => !!state.account.mnemonic);
    const accountState = useAppSelector((state) => state.account);
    console.log('accountState :>> ', accountState);
    console.log('passwordReady :>> ', passwordReady);
    console.log('mnemonicReady :>> ', mnemonicReady);
    if (passwordReady && mnemonicReady) {
        currentState = AppState.MNEMONIC;
    }

    const { authentication, accountInfos } = useAppSelector(
        ({ account }) => account
    );

    if (authentication && (accountInfos?.length || 0) > 0) {
        currentState = AppState.HOSTED;
    }

    const locked = useAppSelector(({ account: { locked } }) => locked);
    if (locked || (!passwordReady && accountType === AccountType.PASSWORD)) {
        currentState = AppState.LOCKED;
    }

    const guardAct = useMemo(() => {
        if (
            authentication === AUTHENTICATION_REQUESTED &&
            pathname === '/initialize/hosted'
        ) {
            return false;
        }

        const allStates = Array.isArray(state) ? state : [state];
        return !allStates.includes(currentState);
    }, [authentication, pathname, state, currentState]);

    useEffect(() => {
        if (authentication === AUTHENTICATION_REQUESTED) {
            if (
                pathname !== '/initialize/hosted' &&
                pathname !== '/initialize/hosted/logging-in'
            ) {
                navigate('/initialize/hosted/logging-in', { replace: true });
            }
            return;
        }

        if (guardAct) {
            console.log('currentState :>> ', currentState);
            if (currentState === AppState.LOADING) return;
            if (
                currentState === AppState.UNINITIALIZED &&
                shouldOpenNewTabIfUninitialized
            ) {
                openInNewTab().finally(() => window.close());
            }

            let destination;
            switch (currentState) {
                case AppState.MNEMONIC:
                    destination = '/';
                    break;
                case AppState.HOSTED:
                    destination = '/';
                    break;
                case AppState.PASSWORD:
                    destination = '/password';
                    break;
                case AppState.LOCKED:
                    destination = '/locked';
                    break;
                default:
                    destination = '/welcome';
            }

            if (
                params?.requestID ||
                params?.txID ||
                params?.signMessageRequestID ||
                params?.preapprovalRequestID
            ) {
                destination = destination + pathname;
            }

            navigate(destination, { replace: true });
        }
    }, [
        authentication,
        shouldOpenNewTabIfUninitialized,
        guardAct,
        currentState,
        mnemonicReady,
        params,
        pathname,
        navigate,
    ]);
    return loading || guardAct;
}

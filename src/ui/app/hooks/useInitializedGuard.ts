// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { AUTHENTICATION_REQUESTED } from '../pages/initialize/hosted';
import useAppSelector from './useAppSelector';

export enum AppState {
    UNINITIALIZED = 'uninitialized',
    LOADING = 'loading',
    MNEMONIC = 'mnemonic',
    PASSWORD = 'password',
    HOSTED = 'hosted',
    LOCKED = 'locked',
}

export default function useInitializedGuard(state: AppState | AppState[]) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const params = useParams();

    let currentState = AppState.UNINITIALIZED;
    const loading = useAppSelector((state) => state.account.loading);
    if (loading) currentState = AppState.LOADING;

    const mnemonicReady = useAppSelector((state) => !!state.account.mnemonic);
    const passwordReady = useAppSelector((state) => !!state.account.passphrase);
    if (mnemonicReady) {
        currentState = AppState.PASSWORD;

        if (passwordReady) currentState = AppState.MNEMONIC;
    }

    const { authentication, accountInfos } = useAppSelector(
        ({ account }) => account
    );
    console.log('AUTHENTICATIO', authentication);

    if (authentication && (accountInfos?.length || 0) > 0) {
        currentState = AppState.HOSTED;
    }

    const locked = useAppSelector(({ account: { locked } }) => locked);
    console.log('LOCKED', locked);
    if (locked) {
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
            if (pathname !== '/initialize/hosted') {
                navigate('/initialize/hosted', { replace: true });
            }
            return;
        }

        if (guardAct) {
            if (currentState === AppState.LOADING) return;

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

            if (params?.requestID || params?.txID) {
                destination += pathname;
            }

            // console.log('NAVIGATE', destination, currentState, state, pathname);
            navigate(destination, { replace: true });
        }
    }, [
        authentication,
        guardAct,
        currentState,
        mnemonicReady,
        params,
        pathname,
        navigate,
    ]);
    return loading || guardAct;
}

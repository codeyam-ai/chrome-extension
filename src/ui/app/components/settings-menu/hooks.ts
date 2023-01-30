// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export const WALLET_PICKER_PARAM = 'wallet-picker';
const WALLET_EDITOR_PARAM = 'edit';

export function useWalletPickerUrl() {
    const [searchParams] = useSearchParams();
    if (searchParams.has(WALLET_PICKER_PARAM)) {
        return searchParams.get(WALLET_PICKER_PARAM) || 'open';
    }
    return false;
}

export function useWalletPickerIsOpen() {
    const [searchParams] = useSearchParams();
    return searchParams.has(WALLET_PICKER_PARAM);
}

export function useWalletEditorIsOpen() {
    const [searchParams] = useSearchParams();
    return searchParams.get(WALLET_PICKER_PARAM) === WALLET_EDITOR_PARAM;
}

/**
 * Get the URL that contains the background page and the menu location
 *
 * @param isOpen Indicates if the menu will be open
 * @param nextMenuLocation The location within the menu
 */
export function useNextWalletPickerUrl(
    isOpen: boolean,
    nextMenuLocation = '/'
) {
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();
    return useMemo(() => {
        if (isOpen) {
            searchParams.set(WALLET_PICKER_PARAM, nextMenuLocation);
        } else {
            searchParams.delete(WALLET_PICKER_PARAM);
            searchParams.delete('index');
        }
        const search = searchParams.toString();
        return `${pathname}${search ? '?' : ''}${search}`;
    }, [isOpen, nextMenuLocation, searchParams, pathname]);
}

/**
 * Get the URL that contains the background page and the edit menu location
 *
 * @param walletIndex The wallet index to edit
 */
export function useEditWalletUrl(walletIndex: number) {
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    return useMemo(() => {
        searchParams.set(WALLET_PICKER_PARAM, WALLET_EDITOR_PARAM);
        searchParams.set('index', walletIndex.toString());
        const search = searchParams.toString();
        return `${pathname}${search ? '?' : ''}${search}`;
    }, [searchParams, pathname, walletIndex]);
}

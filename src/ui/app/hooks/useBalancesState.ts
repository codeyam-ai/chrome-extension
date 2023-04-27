// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import useAppSelector from './useAppSelector';

export function useBalancesState() {
    const objectsLoading = useAppSelector(({ balances }) => balances.loading);
    const lastSync = useAppSelector(({ balances }) => balances.lastSync);
    const error = useAppSelector(({ balances }) => balances.error);
    const showError =
        !!error && (!lastSync || Date.now() - lastSync > 30 * 1000);
    const syncedOnce = !!lastSync;
    const loading = objectsLoading && !syncedOnce && !error;
    return useMemo(
        () => ({
            loading,
            syncedOnce,
            error,
            showError,
        }),
        [loading, syncedOnce, error, showError]
    );
}

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
// import { useIntl } from 'react-intl';

import { Coin } from '../redux/slices/sui-objects/Coin';
import { api } from '../redux/store/thunk-extras';
import ns from '_shared/namespace';

type FormattedCoin = [
    formattedBalance: string,
    coinSymbol: string,
    dollars: string,
    coinName: string,
    coinIcon: string | null,
    queryResult: UseQueryResult
];

export function useCoinDecimals(coinType?: string | null) {
    const queryResult = useQuery(
        ['denomination', coinType],
        async () => {
            if (!coinType) {
                throw new Error(
                    'Fetching coin denomination should be disabled when coin type is disabled.'
                );
            }

            return api.instance.fullNode.getCoinMetadata({ coinType });
        },
        {
            // This is currently expected to fail for non-SUI tokens, so disable retries:
            retry: false,
            enabled: !!coinType,
            // Never consider this data to be stale:
            staleTime: Infinity,
            // Keep this data in the cache for 24 hours.
            // We allow this to be GC'd after a very long time to avoid unbounded cache growth.
            cacheTime: 24 * 60 * 60 * 1000,
        }
    );

    return [queryResult.data?.decimals, queryResult.data, queryResult] as const;
}

// TODO: This handles undefined values to make it easier to integrate with the reset of the app as it is
// today, but it really shouldn't in a perfect world.
export function useFormatCoin(
    balance?: bigint | number | string | null,
    coinType?: string | null,
    formattedLength?: number
): FormattedCoin {
    // const intl = useIntl();
    const symbol = useMemo(
        () => (coinType ? Coin.getCoinSymbol(coinType) : ''),
        [coinType]
    );

    const [decimals, coinMetadata, queryResult] = useCoinDecimals(coinType);
    // const { isFetched, isError } = queryResult;

    const formatted = useMemo(() => {
        if (typeof balance === 'undefined' || balance === null) return '0';

        // if (isError) {
        //     return intl.formatNumber(BigInt(balance), {
        //         maximumFractionDigits: 0,
        //     });
        // }

        // if (!isFetched) return '...';

        // if (typeof decimals === 'undefined') {
        //     return '...';
        // }

        const safeDecimals = decimals ?? 9;

        const decimalsBalance = new BigNumber(balance.toString()).shiftedBy(
            -1 * safeDecimals
        );

        if (
            formattedLength &&
            decimalsBalance.lt(1) &&
            decimalsBalance.toString().split('.')[1].length > formattedLength
        ) {
            return ns.format.coinBalance(
                balance,
                safeDecimals,
                formattedLength
            );
        }

        return ns.format.coinBalance(balance, safeDecimals);
    }, [balance, decimals, formattedLength]);

    const dollars = useMemo(() => {
        if (
            typeof balance === 'undefined' ||
            balance === null ||
            typeof decimals === 'undefined'
        ) {
            return '...';
        }
        return ns.format.dollars(balance, decimals);
    }, [balance, decimals]);

    return [
        formatted,
        coinMetadata?.symbol || symbol,
        dollars,
        coinMetadata?.name || symbol,
        coinMetadata?.iconUrl || null,
        queryResult,
    ];
}

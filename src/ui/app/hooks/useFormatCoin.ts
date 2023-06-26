// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { queryCryptoToFiat } from './useCryptoToFiatConversion';
import { Coin } from '../redux/slices/sui-objects/Coin';
import { api } from '../redux/store/thunk-extras';
import ns from '_shared/namespace';

type FormattedCoin = [
    formattedBalance: string,
    coinSymbol: string,
    dollars: string,
    coinName: string,
    coinIcon: string | null,
    verifiedBridgeToken: string | undefined,
    queryResult: UseQueryResult,
    hasConversion: boolean
];

const VERIFIED_TOKENS: Record<string, string> = {
    '0xa198f3be41cda8c07b3bf3fee02263526e535d682499806979a111e88a5a8d0f':
        'CELO',
    '0xdbe380b13a6d0f5cdedd58de8f04625263f113b3f9db32b3e1983f49e2841676':
        'WMATIC',
    '0xb848cce11ef3a8f62eccea6eb5b35a12c4c2b1ee1af7755d02d7bd6218e8226f':
        'WBNB',
    '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5':
        'WETH',
    '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf':
        'USDC',
    '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c':
        'USDT',
    '0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881':
        'WBTC',
    '0x1e8b532cca6569cab9f9b9ebc73f8c13885012ade714729aa3b450e0339ac766':
        'WAVAX',
    '0x6081300950a4f1e2081580e919c210436a1bed49080502834950d31ee55a2396':
        'WFTM',
    '0x66f87084e49c38f76502d17f87d17f943f183bb94117561eb573e075fdc5ff75':
        'WGLMR',
    '0xb7844e289a8410e50fb3ca48d69eb9cf29e27d223ef90353fe1bd8e27ff8f3f8':
        'WSOL',
    '0xb231fcda8bbddb31f2ef02e6161444aec64a514e2c89279584ac9806ce9cf037':
        'USDCsol',
};

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

    let safeQueryResult = queryResult;
    if (!queryResult.data && coinType === SUI_TYPE_ARG) {
        safeQueryResult = {
            ...queryResult,
            isLoading: false,
            isLoadingError: false,
            isRefetchError: false,
            isError: false,
            isSuccess: true,
            status: 'success',
            error: null,
            data: {
                decimals: 9,
                name: 'Sui',
                symbol: 'SUI',
                description: '',
                iconUrl: null,
                id: null,
            },
        };
    }

    return [
        safeQueryResult.data?.decimals,
        safeQueryResult.data,
        safeQueryResult,
    ] as const;
}

export function useCoinConversion() {
    const amount = useQuery(
        ['conversion'],
        async () => {
            return queryCryptoToFiat();
        },
        {
            retry: false,
            enabled: true,
            staleTime: Infinity,
            cacheTime: 4000,
        }
    );

    return amount.data;
}

// TODO: This handles undefined values to make it easier to integrate with the reset of the app as it is
// today, but it really shouldn't in a perfect world.
export function useFormatCoin(
    balance?: bigint | number | string | null,
    coinType?: string | null,
    formattedLength?: number
): FormattedCoin {
    const verifiedBridgeToken = useMemo<string | undefined>(() => {
        if (!coinType) return;
        const packageObjectId = coinType.split('::')[0];
        if (!packageObjectId) return;

        return VERIFIED_TOKENS[packageObjectId];
    }, [coinType]);

    const symbol = useMemo(
        () => (coinType ? Coin.getCoinSymbol(coinType) : ''),
        [coinType]
    );

    const [decimals, coinMetadata, queryResult] = useCoinDecimals(coinType);
    const conversion = useCoinConversion();

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

        const safeDecimals = decimals ?? (verifiedBridgeToken ? 6 : 9);

        const decimalsBalance = new BigNumber(balance.toString()).shiftedBy(
            -1 * safeDecimals
        );

        if (
            formattedLength &&
            decimalsBalance.lt(1) &&
            (decimalsBalance.toString().split('.')[1]?.length ?? 0) >
                formattedLength
        ) {
            return ns.format.coinBalance(
                balance,
                safeDecimals,
                formattedLength
            );
        }

        return ns.format.coinBalance(balance, safeDecimals);
    }, [balance, decimals, formattedLength, verifiedBridgeToken]);

    const dollars = useMemo(() => {
        if (
            typeof balance === 'undefined' ||
            balance === null ||
            typeof decimals === 'undefined'
        ) {
            return '$0.00';
        }
        return ns.format.dollars(balance, decimals, conversion);
    }, [balance, decimals, conversion]);

    return [
        formatted,
        verifiedBridgeToken ?? coinMetadata?.symbol ?? symbol,
        dollars,
        verifiedBridgeToken ?? coinMetadata?.name ?? symbol,
        coinMetadata?.iconUrl || null,
        verifiedBridgeToken,
        queryResult,
        !!conversion,
    ];
}

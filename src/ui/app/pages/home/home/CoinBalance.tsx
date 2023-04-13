// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sui from './Sui';
import UnknownToken from './UnknownToken';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { useFormatCoin } from '_src/ui/app/hooks/useFormatCoin';
import { useDependencies } from '_shared/utils/dependenciesContext';

export type CoinProps = {
    type: string;
    balance: bigint;
    replaceUrl?: boolean;
};

function CoinBalance({ type, balance, replaceUrl }: CoinProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [balanceFormatted, symbol, usdAmount, name, icon] = useFormatCoin(
        balance,
        type
    );

    const isSendAmountPage = useMemo(
        () => location.pathname === '/send/amount',
        [location]
    );

    const sendUrl = useMemo(
        () =>
            `/send/${
                isSendAmountPage ? 'amount' : 'recipient'
            }?${new URLSearchParams({ type }).toString()}`,
        [isSendAmountPage, type]
    );

    const updateUrl = useCallback(() => {
        navigate(sendUrl, { replace: replaceUrl });
    }, [navigate, sendUrl, replaceUrl]);

    const { featureFlags } = useDependencies();

    return (
        <button
            onClick={updateUrl}
            className="flex w-full items-align justify-between"
        >
            <div className="flex gap-4 items-align">
                <div className="flex items-center">
                    {icon ? (
                        <img
                            src={icon}
                            alt={`coin-${symbol}`}
                            height={39}
                            width={39}
                        />
                    ) : symbol === 'SUI' ? (
                        <Sui />
                    ) : (
                        <UnknownToken />
                    )}
                </div>
                <div className="flex flex-col items-start">
                    <div className="font-light text-base">
                        {truncateString(name, 12)} ({symbol})
                    </div>
                    <div className="font-light text-sm text-slate-500 dark:text-slate-400">
                        {balanceFormatted}
                    </div>
                </div>
            </div>

            {featureFlags.showUsd && (
                <div className="flex items-center text-base text-slate-800 dark:text-slate-300">
                    <div>{usdAmount}</div>
                </div>
            )}
        </button>
    );
}

export default memo(CoinBalance);

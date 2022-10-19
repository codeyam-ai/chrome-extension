// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    ArrowDownTrayIcon,
    CreditCardIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { Coin } from '_redux/slices/sui-objects/Coin';
import { balanceFormatOptions } from '_shared/formatting';
import InlineButtonGroup from '_src/ui/app/shared/buttons/InlineButtonGroup';

export type CoinProps = {
    type: string;
    balance: bigint;
    hideStake?: boolean;
    mode?: 'row-item' | 'standalone';
};

function CoinBalance({
    type,
    balance,
    hideStake = false,
    mode = 'row-item',
}: CoinProps) {
    const symbol = useMemo(() => Coin.getCoinSymbol(type), [type]);
    const intl = useIntl();
    const isBalanceZero = useMemo(() => balance.toString() === '0', [balance]);
    const balanceFormatted = useMemo(
        () => intl.formatNumber(balance, balanceFormatOptions),
        [intl, balance]
    );
    // TODO: make this an actual calculation
    const usdAmount = useMemo(
        () => (isBalanceZero ? '$0.00' : '$54.32'),
        [isBalanceZero]
    );
    const sendUrl = useMemo(
        () => `/send?${new URLSearchParams({ type }).toString()}`,
        [type]
    );
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-baseline gap-1 mb-2">
                <span className="font-semibold text-2xl">
                    {balanceFormatted}
                </span>
                <span className="font-semibold text-xl">{symbol}</span>
                <span className="text-base text-gray-500 dark:text-gray-400 ml-2">
                    {usdAmount}
                </span>
            </div>
            <InlineButtonGroup
                buttonPrimaryTo={isBalanceZero ? '/buy' : sendUrl}
                buttonPrimaryChildren={
                    <>
                        {isBalanceZero ? (
                            <CreditCardIcon className="h-4 w-4" />
                        ) : (
                            <PaperAirplaneIcon className="h-4 w-4" />
                        )}

                        {isBalanceZero ? 'Buy' : 'Send'}
                    </>
                }
                buttonSecondaryTo="/receive"
                buttonSecondaryChildren={
                    <>
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        Receive
                    </>
                }
            />
        </div>
    );
}

export default memo(CoinBalance);

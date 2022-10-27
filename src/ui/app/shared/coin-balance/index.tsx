// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from 'classnames';
import { memo } from 'react';

import st from './CoinBalance.module.scss';

export type CoinBalanceProps = {
    className?: string;
    balance: string;
    symbol: string;
    mode?: 'neutral' | 'positive' | 'negative';
    diffSymbol?: boolean;
};

function CoinBalance({
    balance,
    symbol,
    className,
    mode = 'neutral',
    diffSymbol = false,
}: CoinBalanceProps) {
    return (
        <div className={cl(className, st.container, st[mode])}>
            <span>{balance}</span>
            <span className={cl(st.symbol, { [st.diffSymbol]: diffSymbol })}>
                {symbol}
            </span>
        </div>
    );
}

export default memo(CoinBalance);

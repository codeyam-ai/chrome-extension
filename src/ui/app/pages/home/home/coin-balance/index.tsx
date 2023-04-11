// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useMemo, useState } from 'react';

import { SuiIcons } from '_font-icons/output/sui-icons';
// import { useMiddleEllipsis } from '_hooks';
import Icon from '_src/ui/app/components/icon';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { useAppSelector } from '_src/ui/app/hooks';
import { useFormatCoin } from '_src/ui/app/hooks/useFormatCoin';
import Button from '_src/ui/app/shared/buttons/Button';

export type CoinProps = {
    type: string;
    balance: bigint;
    hideStake?: boolean;
    mode?: 'row-item' | 'standalone';
};

function CoinBalance({ type, balance }: CoinProps) {
    const faucetAvailable = useMemo(() => balance < 10000000, [balance]);
    const isBalanceZero = useMemo(() => balance.toString() === '0', [balance]);
    const [balanceFormatted, symbol, usdAmount] = useFormatCoin(balance, type);
    const sendUrl = useMemo(
        () => `/send?${new URLSearchParams({ type }).toString()}`,
        [type]
    );

    const [usingFaucet, setUsingFaucet] = useState(false);
    const address = useAppSelector(({ account }) => account.address);
    const _faucet = useCallback(() => {
        if (!faucetAvailable) return;
        setUsingFaucet(true);
        const faucet = async () => {
            await fetch('https://faucet.devnet.sui.io/gas', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FixedAmountRequest: {
                        recipient: address,
                    },
                }),
            });

            setTimeout(() => {
                setUsingFaucet(false);
            }, 2500);
        };

        faucet();
    }, [faucetAvailable, address]);
    // const stakeUrl = useMemo(
    //     () => `/stake?${new URLSearchParams({ type }).toString()}`,
    //     [type]
    // );
    // // TODO from Sui team: turn stake feature back on when fix is ready on next release.
    // // const showStake = !hideStake && SUI_TYPE_ARG === type;
    // const showStake = false;
    // const shortenType = useMiddleEllipsis(type, 30);
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-baseline gap-1">
                <span className="font-semibold text-2xl">
                    {balanceFormatted}
                </span>
                <span className="font-semibold text-xl">{symbol}</span>
                <span className="text-base text-gray-500 dark:text-gray-400 ml-2">
                    {usdAmount}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
                {/* {mode === 'row-item' ? (
                    <span className={st.type} title={type}>
                        {shortenType}
                    </span>
                ) : null} */}
                <Button
                    buttonStyle="primary"
                    to={isBalanceZero ? '/buy' : sendUrl}
                    className="!py-2"
                >
                    <Icon
                        className="mr-2 text-xs"
                        icon={isBalanceZero ? SuiIcons.Buy : SuiIcons.Send}
                    />
                    {isBalanceZero ? 'Buy' : 'Send'}
                </Button>
                <Button
                    buttonStyle="secondary"
                    to={faucetAvailable ? undefined : '/receive'}
                    onClick={faucetAvailable ? _faucet : undefined}
                    className="!py-2"
                >
                    <Icon className="mr-2 text-xs" icon={SuiIcons.Receive} />
                    {usingFaucet ? <LoadingIndicator /> : <>Get Sui</>}
                </Button>
            </div>
        </div>
    );
}

export default memo(CoinBalance);

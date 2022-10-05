// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { SuiIcons } from '_font-icons/output/sui-icons';
// import { useMiddleEllipsis } from '_hooks';
import { Coin } from '_redux/slices/sui-objects/Coin';
import { balanceFormatOptions } from '_shared/formatting';
import Icon from '_src/ui/app/components/icon';
import Button, { ButtonStyle } from '_src/ui/app/shared/buttons/Button';

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
    // const stakeUrl = useMemo(
    //     () => `/stake?${new URLSearchParams({ type }).toString()}`,
    //     [type]
    // );
    // // TODO from Sui team: turn stake feature back on when fix is ready on next release.
    // // const showStake = !hideStake && GAS_TYPE_ARG === type;
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
                    buttonStyle={ButtonStyle.PRIMARY}
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
                    buttonStyle={ButtonStyle.SECONDARY}
                    to={'/receive'}
                    className="!py-2"
                >
                    <Icon className="mr-2 text-xs" icon={SuiIcons.Receive} />
                    Receive
                </Button>
            </div>
        </div>
    );
}

export default memo(CoinBalance);

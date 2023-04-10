// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { CircleStackIcon } from '@heroicons/react/24/solid';

import { Icon } from '../../shared/icons/Icon';
import { useAppSelector, useFormatCoin } from '_hooks';
import {
    accountAggregateBalancesSelector,
    accountNftsSelector,
} from '_redux/slices/account';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import CoinList from './tokens/CoinList';
import { sumCoinBalances } from '../../helpers/sumCoinBalances';
import { SUI_TYPE_ARG } from '@mysten/sui.js';

function CoinListPage() {
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const mistBalance = sumCoinBalances(balances);
    const [, , usdAmount] = useFormatCoin(mistBalance, SUI_TYPE_ARG);

    console.log('balances', balances);
    console.log('mistBalance', mistBalance);

    return (
        <div>
            {balances.length <= 0 ? (
                <EmptyPageState
                    iconWithNoClasses={
                        <Icon displayIcon={<CircleStackIcon />} />
                    }
                    title="You have no tokens yet"
                    subtitle="This is where your tokens will appear..."
                    linkText="Buy Tokens"
                    linkUrl={'/tokens'}
                />
            ) : (
                <>
                    <TextPageTitle title="Tokens" count={5} />
                    <CoinList balances={balances} />
                </>
            )}
        </div>
    );
}

export default CoinListPage;

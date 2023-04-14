// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { CircleStackIcon } from '@heroicons/react/24/solid';

import CoinList from './home/CoinList';
import Loading from '../../components/loading';
import { Icon } from '../../shared/icons/Icon';
import { useAppSelector } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import sortTokens from '../../helpers/sortCoins';

function TokensPage() {
    let balances = useAppSelector(accountAggregateBalancesSelector);
    const balLength = Object.keys(balances).length || 0;
    const empty = !balances || balLength === 0;

    balances = sortTokens(balances);

    return (
        <>
            {balances && balLength === 0 ? (
                <EmptyPageState
                    iconWithNoClasses={
                        <Icon displayIcon={<CircleStackIcon />} />
                    }
                    title="You have no tokens yet"
                    subtitle="This is where your tokens will appear..."
                    linkText="Buy Tokens"
                    linkUrl="/home"
                    internal={true}
                />
            ) : (
                <Loading
                    className="py-3 mt-3 flex justify-center items-center"
                    big={true}
                    loading={empty}
                >
                    <TextPageTitle title="Tokens" count={balLength} />
                    <div className={'px-6 pb-6'}>
                        <CoinList balances={balances} />
                    </div>
                </Loading>
            )}
        </>
    );
}

export default TokensPage;

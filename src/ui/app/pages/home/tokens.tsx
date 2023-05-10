import { CircleStackIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';

import CoinList from './home/CoinList';
import Loading from '../../components/loading';
import sortCoins from '../../helpers/sortCoins';
import SubpageHeader from '../../shared/headers/SubpageHeader';
import { Icon } from '../../shared/icons/Icon';
import { useAppSelector } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { openInNewTab } from '_src/shared/utils';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

function TokensPage() {
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);
    let balances = useAppSelector(accountAggregateBalancesSelector);
    const balLength = Object.keys(balances).length || 0;
    const empty = !balances || balLength === 0;

    balances = sortCoins(balances);

    const openBuyTab = useCallback(() => {
        openInNewTab(`/ui.html?type=popup#/home/buy?env=${selectedApiEnv}`);
    }, [selectedApiEnv]);

    return (
        <div className="flex flex-col gap-4">
            <SubpageHeader title="My Tokens" />

            {balances && balLength === 0 ? (
                <EmptyPageState
                    iconWithNoClasses={
                        <Icon displayIcon={<CircleStackIcon />} />
                    }
                    title="You have no tokens yet"
                    subtitle="This is where your tokens will appear..."
                    linkText="Buy Tokens"
                    onClick={openBuyTab}
                    internal={true}
                />
            ) : (
                <Loading
                    className="py-3 mt-3 flex justify-center items-center"
                    big={true}
                    loading={empty}
                >
                    <div className={'px-6 pb-6'}>
                        <CoinList balances={balances} />
                    </div>
                </Loading>
            )}
        </div>
    );
}

export default TokensPage;

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo, useState } from 'react';

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
    const [showAll, setShowAll] = useState(false);
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const { invalidPackages } = useAppSelector(({ valid }) => valid);

    const validBalances = useMemo(() => {
        if (showAll) return balances;

        const _validBalances = Object.entries(balances).reduce(
            (acc: Record<string, bigint>, [coinType, balance]) => {
                if (!invalidPackages.includes(coinType.split('::')[0])) {
                    acc[coinType] = balance;
                }
                return acc;
            },
            {}
        );
        return _validBalances;
    }, [showAll, balances, invalidPackages]);

    const validBalancesLength = useMemo(
        () => Object.keys(validBalances).length || 0,
        [validBalances]
    );

    const sortedValidBalances = useMemo(
        () => sortCoins(validBalances),
        [validBalances]
    );

    const openBuyTab = useCallback(() => {
        openInNewTab(`/ui.html?type=popup#/home/buy?env=${selectedApiEnv}`);
    }, [selectedApiEnv]);

    const toggleShowAll = useCallback(() => {
        setShowAll((prev) => !prev);
    }, []);

    const edit = useMemo(() => {
        return (
            <div
                onClick={toggleShowAll}
                className={`cursor-pointer ${
                    showAll
                        ? 'text-ethos-light-primary-light'
                        : 'text-ethos-light-text-medium'
                }`}
            >
                <AdjustmentsHorizontalIcon width={24} />
            </div>
        );
    }, [showAll, toggleShowAll]);

    return (
        <div className="flex flex-col gap-4">
            <SubpageHeader title="My Tokens" action={edit} />

            {validBalances && validBalancesLength === 0 ? (
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
                    loading={!validBalances}
                >
                    <div className={'px-4 pb-6'}>
                        <CoinList
                            balances={sortedValidBalances}
                            edit={showAll}
                        />
                    </div>
                </Loading>
            )}
        </div>
    );
}

export default TokensPage;

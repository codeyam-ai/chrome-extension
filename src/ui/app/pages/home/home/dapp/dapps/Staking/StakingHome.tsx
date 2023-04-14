import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import StakingIntro from './StakingIntro';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import { SUI_TYPE_ARG, type DelegatedStake } from '@mysten/sui.js';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import Loading from '_src/ui/app/components/loading';
import { useMemo } from 'react';
import Body from '_src/ui/app/shared/typography/Body';

export function useGetDelegatedStake(
    address: string
): UseQueryResult<DelegatedStake[], Error> {
    const rpc = api.instance.fullNode;
    return useQuery(['validator', address], () =>
        rpc.getStakes({ owner: address })
    );
}

const StakingHome: React.FC = () => {
    const { address } = useAppSelector(({ account }) => account);
    const { data: delegatedStake, isLoading } = useGetDelegatedStake(
        address || ''
    );

    // Total active stake for all delegations
    const totalActivePendingStake = useMemo(() => {
        if (!delegatedStake) return BigInt(0);

        return delegatedStake.reduce(
            (acc, curr) =>
                curr.stakes.reduce(
                    (total, { principal }) => total + BigInt(principal),
                    acc
                ),

            BigInt(0)
        );
    }, [delegatedStake]);

    const stakedValidators =
        delegatedStake?.map(({ validatorAddress }) => validatorAddress) || [];

    const [formatted, symbol, , , , queryResult] = useFormatCoin(
        totalActivePendingStake,
        SUI_TYPE_ARG
    );

    return (
        <Loading loading={isLoading || queryResult.isLoading} big={true}>
            {delegatedStake && !!totalActivePendingStake ? (
                <div className="flex flex-col gap-6">
                    <div className="flex gap-3">
                        <Body isSemibold>
                            {totalActivePendingStake
                                ? 'Currently Staked'
                                : 'Stake & Earn SUI'}
                        </Body>
                        <Body isSemibold>
                            {formatted} {symbol}
                        </Body>
                    </div>
                </div>
            ) : (
                <StakingIntro />
            )}
        </Loading>
    );
};

export default StakingHome;

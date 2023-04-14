import { SUI_TYPE_ARG, type DelegatedStake } from '@mysten/sui.js';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import ExistingStake from './ExistingStake';
import StakingIntro from './StakingIntro';
import Loading from '_src/ui/app/components/loading';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import { api } from '_src/ui/app/redux/store/thunk-extras';

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

    const [, , , , , queryResult] = useFormatCoin(
        totalActivePendingStake,
        SUI_TYPE_ARG
    );

    return (
        <div className="flex w-full h-full items-center place-content-center">
            <Loading loading={isLoading || queryResult.isLoading} big={true}>
                {delegatedStake && !!totalActivePendingStake ? (
                    <ExistingStake
                        delegatedStake={delegatedStake}
                        amountStaked={totalActivePendingStake}
                    />
                ) : (
                    <StakingIntro />
                )}
            </Loading>
        </div>
    );
};

export default StakingHome;

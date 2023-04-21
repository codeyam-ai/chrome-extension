import { useMemo } from 'react';

import ExistingStake from './ExistingStake';
import StakingIntro from './StakingIntro';
import Loading from '_src/ui/app/components/loading';
import { useAppSelector } from '_src/ui/app/hooks';
import useGetDelegatedStakes from '_src/ui/app/hooks/staking/useGetDelegatedStakes';

const StakingHome: React.FC = () => {
    const { address } = useAppSelector(({ account }) => account);
    const { data: delegatedStakes, isLoading } = useGetDelegatedStakes(
        address || ''
    );

    // Total active stake for all delegations
    const totalActivePendingStake = useMemo(() => {
        if (!delegatedStakes) return BigInt(0);

        return delegatedStakes.reduce(
            (acc, curr) =>
                curr.stakes.reduce(
                    (total, { principal }) => total + BigInt(principal),
                    acc
                ),

            BigInt(0)
        );
    }, [delegatedStakes]);

    return (
        <div className="flex w-full h-full items-center place-content-center">
            <Loading loading={isLoading} big={true}>
                {delegatedStakes && !!totalActivePendingStake ? (
                    <ExistingStake
                        delegatedStakes={delegatedStakes}
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

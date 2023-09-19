import { useMemo } from 'react';

import ExistingStake from './ExistingStake';
import StakingIntro from './StakingIntro';
import Loading from '_src/ui/app/components/loading';
import { useTotalStakedSUI } from '_src/ui/app/hooks/staking/useTotalStakedSUI';

const StakingHome: React.FC = () => {
    const { delegatedStakes, totalActivePendingStakedSUI, isLoading } =
        useTotalStakedSUI();

    const totalStakeEarnedRewards = useMemo(() => {
        if (!delegatedStakes) return BigInt(0);

        return delegatedStakes.reduce(
            (acc, curr) =>
                curr.stakes.reduce((total, stake) => {
                    const estimatedReward = "estimatedReward" in stake ? stake.estimatedReward : 0;
                    return total + BigInt(estimatedReward ?? 0);
                }, acc),

            BigInt(0)
        );
    }, [delegatedStakes]);

    return (
        <div className="flex w-full h-full items-center place-content-center">
            <Loading loading={isLoading} big={true}>
                {delegatedStakes && !!totalActivePendingStakedSUI ? (
                    <ExistingStake
                        delegatedStakes={delegatedStakes}
                        amountStaked={totalActivePendingStakedSUI}
                        totalStakeEarnedRewards={totalStakeEarnedRewards}
                    />
                ) : (
                    <StakingIntro />
                )}
            </Loading>
        </div>
    );
};

export default StakingHome;

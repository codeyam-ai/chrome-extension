import { formatDistanceToNowStrict } from 'date-fns';
import { useMemo } from 'react';

import getTimeToEarnStakeRewards from '../../helpers/staking/getTimeToEarnStakeRewards';
import { NUM_OF_EPOCH_BEFORE_EARNING } from '_src/shared/constants';

import type { Stake } from '../../pages/home/home/dapp/dapps/Staking/ExistingStake';
import type { SuiSystemStateSummary } from '@mysten/sui.js/client';

export const useDistanceToStartEarningRewards = (
    stake?: Stake,
    systemState?: SuiSystemStateSummary
) => {
    return useMemo(() => {
        if (!stake || !systemState) return {};

        const earningRewardsEpoch =
            Number(stake?.stakeRequestEpoch) + NUM_OF_EPOCH_BEFORE_EARNING;

        const isEarningRewards =
            Number(systemState?.epoch) >= Number(earningRewardsEpoch);

        const timeToRewardsStart = getTimeToEarnStakeRewards(
            earningRewardsEpoch,
            systemState
        );

        const formattedRelativeRewardsStart = isEarningRewards
            ? null
            : formatDistanceToNowStrict(new Date(timeToRewardsStart));

        return {
            isEarningRewards,
            timeToRewardsStart: formattedRelativeRewardsStart,
        };
    }, [stake, systemState]);
};

import { formatRelative } from 'date-fns';

import getTimeToEarnStakingRewards from './getTimeToEarnStakeRewards';
import capitalize from '../capitalize';
import { NUM_OF_EPOCH_BEFORE_EARNING } from '_src/shared/constants';

import type { SuiSystemStateSummary } from '@mysten/sui.js/client';

export function calculateStakeRewardStart(systemState?: SuiSystemStateSummary) {
    const startEarningRewardsEpoch =
        Number(systemState?.epoch || 0) + NUM_OF_EPOCH_BEFORE_EARNING;
    const timeToEarnStakeRewards =
        systemState &&
        getTimeToEarnStakingRewards(startEarningRewardsEpoch, systemState);
    const formattedDistanceToRewards = timeToEarnStakeRewards
        ? capitalize(
              formatRelative(new Date(timeToEarnStakeRewards), new Date())
          )
        : undefined;

    return {
        timeToEarnStakeRewards,
        formattedDistanceToRewards,
    };
}

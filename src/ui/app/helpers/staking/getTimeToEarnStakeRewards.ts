import type { SuiSystemStateSummary } from '@mysten/sui.js/client';

const getTimeToEarnStakingRewards = (
    startEarningEpoch: number,
    systemState?: SuiSystemStateSummary
) => {
    const currentEpoch = Number(systemState?.epoch || 0);
    const currentEpochStartTime = Number(
        systemState?.epochStartTimestampMs || 0
    );
    const epochPeriod = Number(systemState?.epochDurationMs || 0);
    const timeBeforeSpecifiedEpoch =
        startEarningEpoch > currentEpoch &&
        startEarningEpoch > 0 &&
        epochPeriod > 0
            ? currentEpochStartTime +
              (startEarningEpoch - currentEpoch) * epochPeriod
            : 0;
    return timeBeforeSpecifiedEpoch;
};

export default getTimeToEarnStakingRewards;

import { useMemo } from 'react';

import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';

import type { KeyNameAndValue } from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';

interface StakeSummaryProps {
    amount?: string;
    stakingAPY?: string;
    rewardsStart?: string;
    gasPrice?: string;
    commissionRate?: string;
    showRowDividers?: boolean;
}

const StakeSummary: React.FC<StakeSummaryProps> = ({
    amount,
    stakingAPY,
    rewardsStart,
    gasPrice,
    commissionRate,
    showRowDividers,
}) => {
    const computedCommissionRate = useMemo(() => {
        return (Number(commissionRate) / 100).toString();
    }, [commissionRate]);

    const keyValueList: KeyNameAndValue[] = [
        {
            keyName: 'Staking APY',
            value: stakingAPY ? `${stakingAPY}%` : 'N/A',
        },
    ];

    if (commissionRate) {
        keyValueList.push({
            keyName: 'Commission',
            value: `${computedCommissionRate}%`,
        });
    }

    if (amount) {
        keyValueList.unshift({
            keyName: 'Stake',
            value: `${amount} SUI`,
        });
    }

    if (gasPrice) {
        keyValueList.push({
            keyName: 'Gas Fee',
            value: `${gasPrice} SUI`,
        });
    }

    if (rewardsStart) {
        keyValueList.push({
            keyName: 'Rewards Start',
            keyHelpMessage:
                'Staked SUI begins counting as validator’s stake at the end of the Epoch in which it was staked. Rewards are earned separately for each Epoch and become available at the end of each Epoch.',
            value: rewardsStart,
        });
    }

    return (
        <KeyValueList
            paddingOverride={'p-0'}
            rowClassName={
                showRowDividers
                    ? 'pb-2 border-b border-ethos-light-purple dark:border-ethos-dark-text-stroke'
                    : ''
            }
            keyNamesAndValues={keyValueList}
        />
    );
};

export default StakeSummary;

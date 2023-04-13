import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';

interface StakeSummaryProps {
    amount?: string;
    stakingAPY: string;
    rewardsStart: string;
    gasPrice: string;
}

const StakeSummary: React.FC<StakeSummaryProps> = ({
    amount,
    stakingAPY,
    rewardsStart,
    gasPrice,
}) => {
    const keyValueList = [
        {
            keyName: 'Staking APY',
            value: `${stakingAPY}%`,
        },
        {
            keyName: 'Staking Rewards Start',
            keyHelpMessage:
                'The staked SUI starts earning reward at the end of the Epoch in which it was staked. The rewards will become available at the end of one full Epoch of staking.',
            value: rewardsStart,
        },
        {
            keyName: 'Gas Fee',
            value: `${gasPrice} SUI`,
        },
    ];

    if (amount) {
        keyValueList.unshift({
            keyName: 'Stake',
            value: `${amount} SUI`,
        });
    }

    return (
        <KeyValueList
            rowClassName="pb-2 border-b border-ethos-light-purple dark:border-ethos-dark-text-stroke"
            keyNamesAndValues={[
                {
                    keyName: 'Staking APY',
                    value: `${stakingAPY}%`,
                },
                {
                    keyName: 'Staking Rewards Start',
                    keyHelpMessage:
                        'The staked SUI starts earning reward at the end of the Epoch in which it was staked. The rewards will become available at the end of one full Epoch of staking.',
                    value: rewardsStart,
                },
                {
                    keyName: 'Gas Fee',
                    value: `${gasPrice} SUI`,
                },
            ]}
        />
    );
};

export default StakeSummary;

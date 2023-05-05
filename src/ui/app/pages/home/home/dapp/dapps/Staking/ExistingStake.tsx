import { CircleStackIcon } from '@heroicons/react/24/solid';
import {
    SUI_TYPE_ARG,
    type DelegatedStake,
    type SuiAddress,
} from '@mysten/sui.js';
import classNames from 'classnames';
import { type PropsWithChildren, useCallback, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '_src/shared/utils/themeContext';
import { useFormatCoin } from '_src/ui/app/hooks';
import { useDistanceToStartEarningRewards } from '_src/ui/app/hooks/staking/useDistanceToStartEarningRewards';
import { useSystemState } from '_src/ui/app/hooks/staking/useSystemState';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';

export interface Stake {
    status: 'Active' | 'Pending' | 'Unstaked';
    stakedSuiId: string;
    stakeRequestEpoch: string;
    stakeActiveEpoch: string;
    principal: string;
    estimatedReward?: string | undefined;
}

export interface StakeWithValidatorAddress extends Stake {
    validatorAddress: SuiAddress;
}

interface ExistingStakeProps {
    amountStaked: bigint;
    delegatedStakes: DelegatedStake[];
    totalStakeEarnedRewards: bigint;
}

interface StakingCardProps {
    backgroundColor?: string;
    className?: string;
}

export const Card: React.FC<PropsWithChildren<StakingCardProps>> = ({
    children,
    backgroundColor,
    className,
}) => {
    return (
        <div
            className={classNames(
                'flex flex-col items-center place-content-center py-4 rounded-xl border border-white/[.04]',
                className,
                backgroundColor ??
                    'bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey'
            )}
        >
            {children}
        </div>
    );
};

const ExistingStake: React.FC<ExistingStakeProps> = ({
    amountStaked,
    delegatedStakes,
    totalStakeEarnedRewards,
}) => {
    const [formatted, symbol] = useFormatCoin(amountStaked, SUI_TYPE_ARG);
    const [formattedRewards, earnedRewardssymbol] = useFormatCoin(
        totalStakeEarnedRewards,
        SUI_TYPE_ARG,
        9
    );

    const stakes = useMemo(() => {
        return delegatedStakes.flatMap((delegatedStake) =>
            delegatedStake.stakes.map((stake) => ({
                validatorAddress: delegatedStake.validatorAddress,
                ...stake,
            }))
        );
    }, [delegatedStakes]);

    return (
        <div className="w-full flex flex-col h-full justify-between">
            <div>
                <div className="mx-6 my-4 gap-2">
                    <Card>
                        <Body isTextColorMedium>Total staked</Body>
                        <Body isSemibold>
                            {formatted} {symbol}
                        </Body>
                    </Card>
                    <Card
                        className="my-2"
                        backgroundColor="bg-ethos-light-background-green"
                    >
                        <Body isTextColorMedium>Earned</Body>
                        <Body isSemibold>
                            {formattedRewards} {earnedRewardssymbol}
                        </Body>
                    </Card>
                    <Button
                        to={'/home/staking/select-validator'}
                        className="mt-4"
                        removeContainerPadding
                    >
                        <CircleStackIcon width={15} height={15} />
                        Stake More
                    </Button>
                </div>
                <div className="flex mx-6 mb-4">
                    <Body>Currently staking</Body>
                    <Body
                        isSemibold
                        className="pl-1"
                    >{`${delegatedStakes.length} Validators`}</Body>
                </div>
                {stakes.map((stake) => (
                    <StakeRow key={stake.stakedSuiId} stake={stake} />
                ))}
            </div>
        </div>
    );
};

const StakeRow = ({ stake }: { stake: StakeWithValidatorAddress }) => {
    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();
    const { data: systemState } = useSystemState();
    const { data: validators, isInitialLoading } = useValidatorsWithApy();

    const navigateToStakeDetail = useCallback(() => {
        navigate(
            `validator-details/${stake.validatorAddress}/${stake.stakedSuiId}`
        );
    }, [navigate, stake.stakedSuiId, stake.validatorAddress]);

    const [formattedAmount, symbol] = useFormatCoin(
        stake.principal,
        SUI_TYPE_ARG
    );

    const [formattedReward, rewardSymbol] = useFormatCoin(
        stake.estimatedReward,
        SUI_TYPE_ARG,
        9
    );

    const { isEarningRewards, timeToRewardsStart } =
        useDistanceToStartEarningRewards(stake, systemState);

    const validator = validators?.[stake.validatorAddress];

    return (
        <button
            onClick={navigateToStakeDetail}
            className="w-full flex flex-row items-center place-content-center justify-between py-4 px-6 hover:bg-ethos-super-light-purple dark:hover:bg-ethos-dark-background-secondary/50 border-t border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke"
        >
            <div className="flex items-center place-content-center gap-3">
                {validator?.imageUrl ? (
                    <img
                        src={validator.imageUrl}
                        alt={validator.name}
                        className="h-10 w-10 rounded-full"
                    />
                ) : (
                    <div className="h-10 w-10 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                )}
                <div className="flex flex-col items-start">
                    <Body isTextColorMedium>
                        {isInitialLoading ? (
                            <Skeleton
                                height={15}
                                width={112}
                                baseColor="#1A1C26"
                                highlightColor="#3e435b"
                            />
                        ) : (
                            `${formattedAmount} ${symbol}`
                        )}
                    </Body>
                    <Body isSemibold>
                        {isInitialLoading ? (
                            <Skeleton
                                height={15}
                                width={60}
                                baseColor={
                                    resolvedTheme === 'dark'
                                        ? '#1A1C26'
                                        : undefined
                                }
                                highlightColor={
                                    resolvedTheme === 'dark'
                                        ? '#3e435b'
                                        : undefined
                                }
                            />
                        ) : (
                            validator?.name
                        )}
                    </Body>
                </div>
            </div>
            <div className="flex flex-col items-end">
                {isEarningRewards ? (
                    <>
                        <Body className="ethos-light-text-medium !text-xs">
                            Staking Rewards
                        </Body>
                        <Body
                            isSemibold
                            className={classNames(
                                isEarningRewards
                                    ? 'text-ethos-success-green'
                                    : undefined
                            )}
                        >
                            {formattedReward} {rewardSymbol}
                        </Body>
                    </>
                ) : (
                    <>
                        <Body className="ethos-light-text-medium !text-xs">
                            Start earning in
                        </Body>
                        <Body>{timeToRewardsStart}</Body>
                    </>
                )}
            </div>
        </button>
    );
};

export default ExistingStake;

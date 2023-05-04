import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
    SUI_TYPE_ARG,
    type DelegatedStake,
    type SuiAddress,
} from '@mysten/sui.js';
import { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useFormatCoin } from '_src/ui/app/hooks';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import Title from '_src/ui/app/shared/typography/Title';
import { useTheme } from '_src/shared/utils/themeContext';

export interface Stake {
    status: 'Active' | 'Pending' | 'Unstaked';
    stakedSuiId: string;
    stakeRequestEpoch: string;
    stakeActiveEpoch: string;
    principal: string;
    estimatedReward?: number | undefined;
}

export interface StakeWithValidatorAddress extends Stake {
    validatorAddress: SuiAddress;
}

interface ExistingStakeProps {
    amountStaked: bigint;
    delegatedStakes: DelegatedStake[];
}

const ExistingStake: React.FC<ExistingStakeProps> = ({
    amountStaked,
    delegatedStakes,
}) => {
    const [formatted, symbol] = useFormatCoin(amountStaked, SUI_TYPE_ARG);

    return (
        <div className="w-full flex flex-col h-full justify-between">
            <div>
                <div className="flex gap-2 items-center place-content-center py-5 bg-ethos-light-green/10 dark:bg-ethos-dark-green/10 ">
                    <CheckCircleIcon className="h-5 w-5 text-ethos-light-green dark:text-ethos-dark-green" />
                    <BodyLarge
                        className="text-ethos-light-green dark:text-ethos-dark-green"
                        isSemibold
                    >
                        Your staked SUI is earning rewards!
                    </BodyLarge>
                </div>
                <div className="flex flex-col items-center place-content-center my-4">
                    <Subheader isTextColorMedium>Total staked:</Subheader>
                    <Title>
                        {formatted} {symbol}
                    </Title>
                </div>
                <div>
                    {delegatedStakes.map((delegatedStake) => (
                        <DelegatedStakeRow
                            key={delegatedStake.validatorAddress}
                            delegatedStake={delegatedStake}
                        />
                    ))}
                </div>
            </div>
            <Button to={'/home/staking/select-validator'} className="mt-2">
                Stake More
            </Button>
        </div>
    );
};

const DelegatedStakeRow = ({
    delegatedStake,
}: {
    delegatedStake: DelegatedStake;
}) => {
    const navigate = useNavigate();
    const { resolvedTheme } = useTheme();

    const navigateToStakeDetail = useCallback(() => {
        navigate(`validator-details/${delegatedStake.validatorAddress}`);
    }, [navigate, delegatedStake.validatorAddress]);

    const amountStaked = delegatedStake?.stakes.reduce(
        (total, { principal }) => total + BigInt(principal),
        BigInt(0)
    );

    const [formattedAmount, symbol] = useFormatCoin(amountStaked, SUI_TYPE_ARG);

    const { data: validators, isInitialLoading } = useValidatorsWithApy();
    const validator = validators?.[delegatedStake.validatorAddress];

    return (
        <button
            onClick={navigateToStakeDetail}
            key={delegatedStake.validatorAddress}
            className="w-full flex flex-row items-center place-content-center justify-between py-3 px-4 hover:bg-ethos-super-light-purple dark:hover:bg-ethos-dark-background-secondary/50 border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke"
        >
            <div className="flex items-center place-content-center gap-3">
                {validator?.imageUrl ? (
                    <img
                        src={validator.imageUrl}
                        alt={validator.name}
                        className="h-9 w-9 rounded-full"
                    />
                ) : (
                    <div className="h-9 w-9 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                )}
                <div className="flex flex-col items-start">
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
                    <Body isTextColorMedium>
                        {isInitialLoading ? (
                            <Skeleton
                                height={15}
                                width={112}
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
                            truncateMiddle(validator?.suiAddress || '')
                        )}
                    </Body>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <Body isSemibold>
                    {formattedAmount} {symbol}
                </Body>
            </div>
        </button>
    );
};

export default ExistingStake;

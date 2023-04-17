import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
    type DelegatedStake,
    SUI_TYPE_ARG,
    type SuiAddress,
} from '@mysten/sui.js';

import { useValidatorsWithApy } from './ValidatorList';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useFormatCoin } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import Title from '_src/ui/app/shared/typography/Title';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

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
    delegatedStake: DelegatedStake[];
}

const ExistingStake: React.FC<ExistingStakeProps> = ({
    amountStaked,
    delegatedStake,
}) => {
    const [formatted, symbol] = useFormatCoin(amountStaked, SUI_TYPE_ARG);

    const allStakes = delegatedStake.reduce((agg, stake) => {
        const { validatorAddress, stakes } = stake;
        const stakesWithValidator = stakes.map((st) => ({
            validatorAddress: validatorAddress,
            ...st,
        }));

        return [...stakesWithValidator, ...agg];
    }, [] as StakeWithValidatorAddress[]);

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
                <div className="flex flex-col items-center place-content-center">
                    <Subheader isTextColorMedium>Total staked:</Subheader>
                    <Title>
                        {formatted} {symbol}
                    </Title>
                </div>
                <div>
                    <div className="py-3 px-4 text-left rounded-lg border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                        {allStakes.map((stake) => (
                            <DelegatedStakeRow
                                key={stake.validatorAddress}
                                stake={stake}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <Button to={'/home/staking/select-validator'}>
                    Stake More
                </Button>
            </div>
        </div>
    );
};

const DelegatedStakeRow = ({ stake }: { stake: StakeWithValidatorAddress }) => {
    const navigate = useNavigate();

    const navigateToStakeDetail = useCallback(() => {
        navigate(`validator-details/${stake.validatorAddress}`);
    }, [navigate, stake.validatorAddress]);

    const { validators } = useValidatorsWithApy();
    const validator = validators?.[stake.validatorAddress];
    const [coinAmount] = useFormatCoin(stake.principal, SUI_TYPE_ARG);

    return (
        <button onClick={navigateToStakeDetail} key={stake.validatorAddress}>
            <div className="flex flex-row items-center place-content-center justify-between">
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
                    <div className="flex flex-col">
                        <Body isSemibold>{validator?.name}</Body>
                        <Body isTextColorMedium>
                            {truncateMiddle(validator?.suiAddress || '')}
                        </Body>
                    </div>
                </div>

                <div className="flex flex-col items-end">
                    <Body isSemibold>{coinAmount} SUI</Body>
                    <Body isTextColorMedium>{stake.status}</Body>
                </div>
            </div>
        </button>
    );
};

export default ExistingStake;

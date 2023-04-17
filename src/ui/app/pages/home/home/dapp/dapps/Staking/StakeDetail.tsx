import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
    type DelegatedStake,
    SUI_TYPE_ARG,
    type SuiAddress,
} from '@mysten/sui.js';

import { useValidatorsWithApy } from './ValidatorList';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import Title from '_src/ui/app/shared/typography/Title';
import { useParams } from 'react-router-dom';
import { useGetDelegatedStake } from './StakingHome';
import { useMemo } from 'react';

interface ExistingStakeProps {
    amountStaked: bigint;
    delegatedStake: DelegatedStake;
}

const StakeDetail: React.FC = () => {
    const { validatorAddress } = useParams();

    const { address } = useAppSelector(({ account }) => account);
    const { data: allDelegatedStakes } = useGetDelegatedStake(address || '');

    const delegatedStake = useMemo(() => {
        return allDelegatedStakes?.find(
            (stake) => stake.validatorAddress === validatorAddress
        );
    }, [validatorAddress, allDelegatedStakes]);

    const amountStaked = delegatedStake?.stakes.reduce(
        (total, { principal }) => total + BigInt(principal),
        BigInt(0)
    );

    const [formattedAmount, symbol] = useFormatCoin(amountStaked, SUI_TYPE_ARG);

    const { validators } = useValidatorsWithApy();
    const validator = validators?.[delegatedStake?.validatorAddress || ''];

    return (
        <div className="w-full flex flex-col h-full items-center">
            <div className="p-4">
                {validator?.imageUrl ? (
                    <img
                        src={validator.imageUrl}
                        alt={validator.name}
                        className="h-16 w-16 rounded-full"
                    />
                ) : (
                    <div className="h-16 w-16 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                )}
                <Body>{validator?.name}</Body>
                <Body>APY: {validator?.apy}</Body>
            </div>
            <Subheader isTextColorMedium>Total staked:</Subheader>
            <Title>
                {formattedAmount} {symbol}
            </Title>
            {delegatedStake?.stakes.map((stake) => (
                <StakeRow key={stake.stakedSuiId} stake={stake} />
            ))}
        </div>
    );
};

const StakeRow = ({ stake }: any) => {
    const [formattedPrincipal, symbol] = useFormatCoin(
        stake?.principal,
        SUI_TYPE_ARG
    );
    return (
        <div className="">
            <Body isSemibold>
                {formattedPrincipal} {symbol}
            </Body>
            <Body isTextColorMedium>{stake.status}</Body>
        </div>
    );
};
export default StakeDetail;

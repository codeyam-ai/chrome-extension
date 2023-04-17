import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetDelegatedStakes } from './StakingHome';
import { useValidatorsWithApy } from './ValidatorList';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';

interface Stake {
    status: 'Active' | 'Pending' | 'Unstaked';
    stakedSuiId: string;
    stakeRequestEpoch: string;
    stakeActiveEpoch: string;
    principal: string;
    estimatedReward?: number | undefined;
}

const StakeDetail: React.FC = () => {
    const { validatorAddress } = useParams();

    const { address } = useAppSelector(({ account }) => account);
    const { data: allDelegatedStakes } = useGetDelegatedStakes(address || '');

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
                <Subheader className="pt-2">{validator?.name}</Subheader>
                <Body>APY: {validator?.apy}%</Body>
            </div>
            <div className="flex gap-1 items-baseline">
                <Body isTextColorMedium>Total staked:</Body>
                <BodyLarge isSemibold>
                    {formattedAmount} {symbol}
                </BodyLarge>
            </div>
            <BodyLarge
                isTextColorMedium
                isSemibold
                className="self-start pt-4 pl-4"
            >
                Stakes:
            </BodyLarge>
            {delegatedStake?.stakes.map((stake) => (
                <StakeRow key={stake.stakedSuiId} stake={stake} />
            ))}
        </div>
    );
};

const StakeRow = ({ stake }: { stake: Stake }) => {
    const [formattedPrincipal, symbol] = useFormatCoin(
        stake?.principal,
        SUI_TYPE_ARG
    );

    return (
        <div className="w-full flex flex-row items-center place-content-center justify-between py-3 px-4 border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            <div className="flex flex-col items-start">
                <Body isSemibold>
                    {formattedPrincipal} {symbol}
                </Body>
                <Body isTextColorMedium>{stake.status}</Body>
            </div>

            <div className="flex flex-col items-start">
                <body className="flex gap-1">
                    <Body isTextColorMedium>Est. Reward:</Body>
                    <Body isSemibold>
                        {mistToSui(stake.estimatedReward, 2)} SUI
                    </Body>
                </body>
            </div>

            <button className="p-2">
                <MinusCircleIcon className="h-5 w-5 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            </button>
        </div>
    );
};
export default StakeDetail;

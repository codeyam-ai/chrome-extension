import { useValidatorsWithApy } from '../../hooks/staking/useValidatorsWithApy';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { StakingTransactionInfo } from '../../helpers/transactions/stakingTransactionAnalysis';

interface StakingSummaryProps {
    stakingTransactionInfo: StakingTransactionInfo;
    small?: boolean;
    isFailure?: boolean;
}

const StakingSummary = ({
    stakingTransactionInfo,
    small,
    isFailure,
}: StakingSummaryProps) => {
    const { data: validators } = useValidatorsWithApy();
    const validator = validators?.[stakingTransactionInfo.validatorAddress];
    return (
        <div className="flex flex-col justify-between items-start">
            <BodyLarge isSemibold>
                {isFailure ? 'Failed Staking' : 'Staked Sui'}
            </BodyLarge>
            <div className="flex items-center gap-1 !text-xs">
                {validator && validator.imageUrl ? (
                    <img
                        src={validator.imageUrl}
                        alt={validator.name}
                        className="h-4 w-4 rounded-full"
                    />
                ) : (
                    <div className="h-4 w-4 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                )}
                <Body isTextColorMedium>{validator?.name}</Body>
            </div>
        </div>
    );
};

export default StakingSummary;

import { useFormatCoin } from '../../hooks';
import { useValidatorsWithApy } from '../../hooks/staking/useValidatorsWithApy';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { StakingTransactionInfo } from '../../helpers/transactions/stakingTransactionAnalysis';

interface StakingSummaryProps {
    stakingTransactionInfo: StakingTransactionInfo;
    timeDisplay: string;
    isFailure?: boolean;
}

const StakingSummary = ({
    stakingTransactionInfo,
    timeDisplay,
    isFailure,
}: StakingSummaryProps) => {
    const { data: validators } = useValidatorsWithApy();
    const validator = validators?.[stakingTransactionInfo.validatorAddress];

    const [formattedCoinAmount, formattedCoinType] = useFormatCoin(
        stakingTransactionInfo.amount,
        stakingTransactionInfo.coinType
    );

    return (
        <div className="w-full flex justify-between items-center">
            <div className="flex flex-col justify-between items-start">
                <BodyLarge isSemibold>
                    {isFailure ? 'Failed Staking' : 'Staked Sui'}
                </BodyLarge>
                <div className="flex items-center gap-1 !text-xs">
                    {isFailure && (
                        <div>
                            {validator && validator.imageUrl ? (
                                <img
                                    src={validator.imageUrl}
                                    alt={validator.name}
                                    className="h-4 w-4 rounded-full"
                                />
                            ) : (
                                <div className="h-4 w-4 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                            )}
                        </div>
                    )}
                    <Body isTextColorMedium>{validator?.name}</Body>
                </div>
            </div>
            <div className="flex flex-col items-end">
                {!isFailure && (
                    <BodyLarge isSemibold>
                        {formattedCoinAmount} {formattedCoinType}
                    </BodyLarge>
                )}
                <Body isTextColorMedium className="text-right">
                    {timeDisplay}
                </Body>
            </div>{' '}
        </div>
    );
};

export default StakingSummary;

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import { Form, useField, useFormikContext } from 'formik';
import { useMemo } from 'react';

import StakeSummary from '../StakeSummary';
import { type SuiValidatorSummaryWithApy } from '../ValidatorList';
import ClickableTooltip from '_src/ui/app/components/ClickableTooltip';
import Loading from '_src/ui/app/components/loading';
import { calculateStakeRewardStart } from '_src/ui/app/helpers/staking/calculateStakeRewardStart';
import { useFormatCoin } from '_src/ui/app/hooks';
import { useSystemState } from '_src/ui/app/hooks/staking/useSystemState';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import Button from '_src/ui/app/shared/buttons/Button';
import SuiIcon from '_src/ui/app/shared/svg/SuiIcon';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';

interface StakeAmountFormProps {
    validator: SuiValidatorSummaryWithApy;
    formattedSuiBalance: string;
}

const StakeAmountForm: React.FC<StakeAmountFormProps> = ({
    validator,
    formattedSuiBalance,
}) => {
    const [amountField, amountMeta] = useField('amount');

    const { isSubmitting, isValid, dirty } = useFormikContext();

    const { data: systemState, isFetching: isFetchingSystemState } =
        useSystemState();

    const [formattedTotalStaked] = useFormatCoin(
        validator.stakingPoolSuiBalance,
        SUI_TYPE_ARG
    );

    const totalValidatorsStake = useMemo(() => {
        if (!systemState) return 0;
        return systemState.activeValidators.reduce(
            (acc, curr) => acc.plus(BigNumber(curr.stakingPoolSuiBalance)),
            BigNumber(0)
        );
    }, [systemState]);

    const stakingSharePercentage = useMemo(() => {
        if (Number(totalValidatorsStake) === 0) {
            return 0;
        }
        const rawPercentage = BigNumber(
            validator.stakingPoolSuiBalance
        ).dividedBy(totalValidatorsStake);
        return BigNumber(rawPercentage)
            .multipliedBy(100)
            .decimalPlaces(2)
            .toNumber();
    }, [totalValidatorsStake, validator.stakingPoolSuiBalance]);

    const { formattedDistanceToRewards } = useMemo(() => {
        return calculateStakeRewardStart(systemState);
    }, [systemState]);

    return (
        <div className="flex items-center place-content-center">
            <Loading loading={isFetchingSystemState} big>
                <Form
                    autoComplete="off"
                    className="flex flex-col h-full justify-between px-6"
                >
                    <div>
                        <Subheader className={'text-center mb-6'}>
                            How much would you like to stake?
                        </Subheader>

                        <div className="flex flex-col gap-2 py-5 px-4 rounded-xl border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                            <div className="flex justify-between">
                                <Body isSemibold>Amount</Body>
                                <span className="flex gap-1">
                                    <Body isTextColorMedium>Available:</Body>
                                    <Body isTextColorMedium isSemibold>
                                        {formattedSuiBalance} SUI
                                    </Body>
                                </span>
                            </div>
                            <div className="flex px-3 py-2 justify-between items-center place-content-center rounded-xl border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                                <div className="flex">
                                    <div className="p-2 rounded-full bg-ethos-sui-blue">
                                        <SuiIcon height={24} width={24} />
                                    </div>
                                    <input
                                        {...amountField}
                                        name="amount"
                                        type="text"
                                        className="w-full bg-transparent border-none focus:ring-0 caret-ethos-light-primary-light dark:caret-ethos-dark-primary-dark"
                                        autoFocus
                                        placeholder="0"
                                    />
                                </div>
                                <BodyLarge>SUI</BodyLarge>
                            </div>
                            {dirty && amountMeta.error && (
                                <div className="mt-1 text-ethos-light-red dark:text-ethos-dark-red">
                                    {amountMeta.error}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between p-3 mt-9 mb-4 rounded-lg bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary divide-y divide-ethos-light-text-stroke dark:divide-ethos-dark-text-stroke">
                        <div className="flex justify-between pt-2 pb-4">
                            <div className="flex place-content-center gap-1">
                                {validator.imageUrl ? (
                                    <img
                                        src={validator.imageUrl}
                                        alt={validator.name}
                                        className="h-5 w-5 rounded-full"
                                    />
                                ) : (
                                    <div className="h-5 w-5 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                                )}
                                <Body isSemibold>{validator.name}</Body>
                                <ClickableTooltip
                                    message={validator.description}
                                    tooltipPosition="below"
                                >
                                    <InformationCircleIcon className="mt-[2px] h-4 w-4 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                                </ClickableTooltip>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className="flex gap-1">
                                    <Body isTextColorMedium>Staking Share</Body>
                                    <Body isSemibold>
                                        {stakingSharePercentage}%
                                    </Body>
                                </div>
                                <div className="flex gap-1">
                                    <Body isTextColorMedium>Total Staked</Body>
                                    <Body isSemibold>
                                        {formattedTotalStaked} SUI
                                    </Body>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4">
                            <StakeSummary
                                amount={''}
                                rewardsStart={formattedDistanceToRewards}
                                stakingAPY={validator.apy?.toString()}
                                gasPrice={mistToSui(
                                    +(validator.gasPrice || '0'),
                                    4
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="!mb-6">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                                removeContainerPadding
                            >
                                Review
                            </Button>
                        </div>
                    </div>
                </Form>
            </Loading>
        </div>
    );
};

export default StakeAmountForm;

import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import { Form, useField, useFormikContext } from 'formik';
import { useMemo } from 'react';

import Sui from '../../../../Sui';
import StakeSummary from '../StakeSummary';
import { type SuiValidatorSummaryWithApy } from '../ValidatorList';
import ClickableTooltip from '_src/ui/app/components/ClickableTooltip';
import Loading from '_src/ui/app/components/loading';
import { calculateStakeRewardStart } from '_src/ui/app/helpers/staking/calculateStakeRewardStart';
import { useFormatCoin } from '_src/ui/app/hooks';
import { useSystemState } from '_src/ui/app/hooks/staking/useSystemState';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { KeyNameAndValue } from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import ValidatorImage from '../Validator/ValidatorImage';

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

    const validatorInfoKeyValueList: KeyNameAndValue[] = [
        {
            keyName: validator.name,
            value: (
                <div className="flex place-content-center gap-1">
                    <ValidatorImage
                        validator={validator}
                        className="h-5 w-5 rounded-full"
                    />
                    <Body isSemibold>{validator.name}</Body>
                    <ClickableTooltip
                        message={validator.description}
                        tooltipPosition="below"
                    >
                        <InformationCircleIcon className="mt-[2px] h-4 w-4 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                    </ClickableTooltip>
                </div>
            ),
        },
        {
            keyName: 'Staking Share',
            value: `${stakingSharePercentage}%`,
        },
        {
            keyName: 'Total Staked',
            value: `${formattedTotalStaked} SUI`,
        },
    ];

    return (
        <div className="flex items-center place-content-center">
            <Loading loading={isFetchingSystemState} big>
                <Form
                    autoComplete="off"
                    className="flex flex-col h-full justify-between"
                >
                    <div className="px-6">
                        <Subheader className={'text-center mb-6 mt-2'}>
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
                                    <Sui />
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
                    <div className="flex flex-col justify-between py-5 px-6 mt-9 mb-4 bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey divide-y divide-ethos-light-text-stroke dark:divide-ethos-dark-text-stroke border-t border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                        <div className="pb-2">
                            <KeyValueList
                                paddingOverride={'p-0'}
                                keyNamesAndValues={validatorInfoKeyValueList}
                            />
                        </div>
                        <div className="pt-4">
                            <StakeSummary
                                amount={''}
                                commissionRate={validator.commissionRate}
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
                        <div className="!mb-6 !mx-6">
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

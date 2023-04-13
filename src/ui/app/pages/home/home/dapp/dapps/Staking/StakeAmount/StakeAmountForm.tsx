import { Form, useField, useFormikContext } from 'formik';

import StakeSummary from '../StakeSummary';
import { type SuiValidatorSummaryWithApy } from '../ValidatorList';
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
    const { isSubmitting, isValid, dirty } = useFormikContext();

    const [amountField, amountMeta] = useField('amount');
    console.log('validartor', validator);

    return (
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
            <div>
                <div className={'-mx-6'}>
                    <StakeSummary
                        amount={''}
                        rewardsStart={'30sec'}
                        stakingAPY={validator.apy?.toString()}
                        gasPrice={mistToSui(+(validator.gasPrice || '0'), 4)}
                    />
                </div>
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
    );
};

export default StakeAmountForm;

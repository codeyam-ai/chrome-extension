import { SuiValidatorSummary } from '@mysten/sui.js';

import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import SuiIcon from '_src/ui/app/shared/svg/SuiIcon';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import { Field, Form, useFormikContext } from 'formik';

interface StakeAmountFormProps {
    validator: SuiValidatorSummary;
    formattedSuiBalance: string;
}

const StakeAmountForm: React.FC<StakeAmountFormProps> = ({
    validator,
    formattedSuiBalance,
}) => {
    const {
        isSubmitting,
        isValid,
        values: { amount },
    } = useFormikContext<any>();

    console.log('amount :>> ', amount);
    return (
        <Form autoComplete="off">
            <div className="flex flex-col h-full justify-between px-6">
                <div>
                    <Subheader className={'text-center mb-1'}>
                        How much would you like to stake?
                    </Subheader>
                    <Field
                        name="amount"
                        type="text"
                        // className={classes}
                        placeholder="Amount"
                        autoFocus
                        // disabled={isSubmitting}
                    />
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
                                    type="text"
                                    className="w-full bg-transparent border-none focus:ring-0 caret-ethos-light-primary-light dark:caret-ethos-dark-primary-dark"
                                    autoFocus
                                    placeholder="0"
                                />
                            </div>
                            <BodyLarge>SUI</BodyLarge>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={'-mx-6'}>
                        <KeyValueList
                            keyNamesAndValues={[
                                {
                                    keyName: 'Staking APY',
                                    value: '1.34%',
                                },
                                {
                                    keyName: 'Staking Rewards Start',
                                    keyHelpMessage:
                                        'The staked SUI starts earning reward at the end of the Epoch in which it was staked. The rewards will become available at the end of one full Epoch of staking.',
                                    value: '1 day 3 hours',
                                },
                                {
                                    keyName: 'Gas Fee',
                                    value: `${mistToSui(
                                        +(validator?.gasPrice || '0'),
                                        4
                                    )} SUI`,
                                },
                            ]}
                        />
                    </div>
                    <div className="!mb-6">
                        <Button type="submit" removeContainerPadding>
                            Review
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default StakeAmountForm;

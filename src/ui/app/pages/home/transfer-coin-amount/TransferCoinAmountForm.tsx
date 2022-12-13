// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo } from 'react';

import Sui from '../tokens/Sui';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import NumberInput from '_components/number-input';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import { CoinSelect } from '_src/ui/app/shared/coin-select/coin-dropdown';
import Alert from '_src/ui/app/shared/feedback/Alert';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';

import type { FormValues } from '.';

export type TransferCoinFormProps = {
    submitError: string | null;
    coinBalance: string;
    coinSymbol: string;
    gasBudget: number;
    onClearSubmitError: () => void;
};

const AvailableBalance = ({
    balances,
}: {
    balances: Record<string, bigint>;
}) => {
    const FormatCoin = (balance: bigint, type: string) => {
        const [balanceFormatted, symbol, usdAmount] = useFormatCoin(
            balance,
            type
        );

        return [balanceFormatted, symbol, usdAmount];
    };
    return (
        <div className="text-left">
            {Object.keys(balances).map((type: string, idx: number) => {
                const balance = balances[type];
                const [balanceFormatted, symbol, usdAmount] = FormatCoin(
                    balance,
                    type
                );
                return (
                    <div
                        className="flex items-align justify-between mt-3"
                        key={idx}
                    >
                        <div className="flex gap-4 items-align">
                            <div className="flex items-center">
                                <Sui />
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="font-light text-base">
                                    Available Balance
                                </div>
                                <div className="font-light text-sm text-slate-500 dark:text-slate-400">
                                    <div>
                                        {balanceFormatted} {symbol}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center text-base text-slate-800 dark:text-slate-300">
                            <div>{usdAmount}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

function TransferCoinForm({
    submitError,
    onClearSubmitError,
}: TransferCoinFormProps) {
    const formState = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const balances = useAppSelector(accountAggregateBalancesSelector);

    const {
        isSubmitting,
        isValid,
        values: { amount },
    } = useFormikContext<FormValues>();

    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    useEffect(() => {
        onClearRef.current();
    }, [amount]);

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(parseFloat(amount) * 100);

    return (
        <Form autoComplete="off" noValidate={false}>
            <div className="pt-6 px-6 text-left flex flex-col mb-[40px]">
                <div className={'mb-5 flex flex-row items-center gap-6'}>
                    <BodyLarge isTextColorMedium>Sending</BodyLarge>
                    <CoinSelect />
                </div>
                <Body isTextColorMedium>{`To: ${truncateMiddle(
                    formState.to
                )}`}</Body>
            </div>
            <div className="flex flex-col mt-2 px-6 text-left">
                <Field
                    autoFocus
                    value={formState.amount || 'SUI'}
                    component={NumberInput}
                    allowNegative={false}
                    name="amount"
                    decimals
                    className="p-0 border-transparent focus:border-transparent focus:ring-0 font-weight-ethos-title outline-none border-none h-[40px] w-full text-size-ethos-jumbo-title dark:bg-ethos-dark-background-default"
                />
                <BodyLarge isSemibold isTextColorMedium>
                    {parseInt(amount) >= 0 ? dollars : '$0.00'}
                </BodyLarge>
                <ErrorMessage
                    className="mt-1 text-red-500 dark:text-red-400"
                    name="amount"
                    component="div"
                />
            </div>
            {submitError ? (
                <div className="flex flex-col mt-2">
                    <Alert title="Transfer failed" subtitle={submitError} />
                </div>
            ) : null}
            <ContentBlock className={'mt-8'}>
                <div>
                    <AvailableBalance balances={balances} />
                </div>
            </ContentBlock>
            <div className="flex flex-col mt-2 absolute w-full bottom-[63px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default pt-4">
                <Button
                    buttonStyle="primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="mt-2"
                >
                    {isSubmitting ? <LoadingIndicator /> : 'Review'}
                </Button>
            </div>
        </Form>
    );
}

export default memo(TransferCoinForm);

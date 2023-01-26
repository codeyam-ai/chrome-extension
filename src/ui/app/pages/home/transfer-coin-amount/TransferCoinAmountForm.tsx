// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { useEffect, useMemo, useRef, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Sui from '../tokens/Sui';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import NumberInput from '_components/number-input';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import { CoinSelect } from '_src/ui/app/pages/home/tokens/CoinDropdown';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Alert from '_src/ui/app/shared/feedback/Alert';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import CopyBody from '_src/ui/app/shared/typography/CopyBody';

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
    filterType,
}: {
    balances: Record<string, bigint>;
    filterType?: string | null;
}) => {
    const FormatCoin = (balance: bigint, type: string) => {
        const [balanceFormatted, symbol, usdAmount] = useFormatCoin(
            balance,
            type
        );

        return [balanceFormatted, symbol, usdAmount];
    };

    const filterdTypes = useMemo(() => {
        const types = Object.keys(balances);
        if (!filterType) return types;

        return types.filter((type: string) => filterType === type);
    }, [balances, filterType]);

    return (
        <div className="text-left">
            {filterdTypes.map((type: string, idx: number) => {
                const balance = balances[type];
                const [balanceFormatted, symbol, usdAmount] = FormatCoin(
                    balance,
                    type
                );
                return (
                    <div className="flex items-align justify-between" key={idx}>
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

    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');

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

    const inputClasses =
        'flex flex-row w-full py-[16px] px-[20px] focus:py-[15px] focus:px-[19px] resize-none shadow-sm rounded-[16px] bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary font-weight-ethos-body-large text-size-ethos-body-large leading-line-height-ethos-body-large tracking-letter-spacing-ethos-body-large bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:dark:border-ethos-dark-primary-dark focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused';

    return (
        <Form autoComplete="off" noValidate={false}>
            <div className="pt-6 px-6 text-left flex flex-col mb-2">
                <div
                    className={'mb-5 relative flex flex-row items-center gap-6'}
                >
                    <BodyLarge isTextColorMedium>Sending</BodyLarge>
                    <CoinSelect selectedCoinType={coinType} />
                </div>
                <CopyBody
                    txt={formState.to}
                    isTextColorMedium
                >{`To: ${truncateMiddle(formState.to)}`}</CopyBody>
            </div>
            <div className="flex flex-col mb-8 px-6 text-left">
                <div className={'mb-3'}>
                    <Field
                        autoFocus
                        value={formState.amount}
                        placeholder="Amount"
                        component={NumberInput}
                        allowNegative={false}
                        name="amount"
                        decimals
                        className={inputClasses}
                    />
                </div>
                <BodyLarge isSemibold isTextColorMedium>
                    {parseInt(amount) >= 0 ? dollars : '$0.00'}
                </BodyLarge>
                <ErrorMessage
                    className="mt-1 text-red-500 dark:text-red-400"
                    name="amount"
                    component="div"
                />
                {submitError ? (
                    <div className="flex flex-col mb-2">
                        <Alert title="Transfer failed" subtitle={submitError} />
                    </div>
                ) : null}
            </div>
            <ContentBlock className="mb-2">
                <AvailableBalance balances={balances} filterType={coinType} />
            </ContentBlock>
            <div className="flex flex-col mb-2 absolute w-full bottom-[-10px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default pt-4 rounded-b-2xl">
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

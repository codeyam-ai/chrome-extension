// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo } from 'react';

import AddressInput from '_components/address-input';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import NumberInput from '_components/number-input';
import { SuiIcons } from '_font-icons/output/sui-icons';
import { GAS_SYMBOL, GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import Icon from '_src/ui/app/components/icon';
import { useFormatCoin } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Alert from '_src/ui/app/shared/feedback/Alert';

import type { FormValues } from '.';

import st from './TransferCoinForm.module.scss';

export type TransferCoinFormProps = {
    submitError: string | null;
    coinBalance: string;
    coinSymbol: string;
    gasBudget: number;
    onClearSubmitError: () => void;
};

function TransferCoinForm({
    submitError,
    coinBalance,
    coinSymbol,
    gasBudget,
    onClearSubmitError,
}: TransferCoinFormProps) {
    const {
        isSubmitting,
        isValid,
        values: { amount, to },
    } = useFormikContext<FormValues>();
    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;
    useEffect(() => {
        onClearRef.current();
    }, [amount, to]);
    const [formattedGasAmount] = useFormatCoin(gasBudget, GAS_TYPE_ARG);

    return (
        <Form className={st.container} autoComplete="off" noValidate={true}>
            <div className="flex flex-col px-6 text-left">
                <label
                    htmlFor="to"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                    To
                </label>
                <Field
                    component={AddressInput}
                    name="to"
                    className="flex-1 block w-full min-w-0 rounded-md sm:text-sm focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    The recipient&apos;s address or SuiNS name
                </div>
                <ErrorMessage
                    className="mt-1 text-red-500 dark:text-red-400"
                    name="to"
                    component="div"
                />
            </div>
            <div className="flex flex-col mt-2 px-6 text-left">
                <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                    Amount
                </label>
                <span className="flex">
                    <Field
                        component={NumberInput}
                        allowNegative={false}
                        name="amount"
                        placeholder={`Total ${coinSymbol.toLocaleUpperCase()} to send`}
                        className="flex-1 block w-full min-w-fit rounded-md focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                        decimals
                    />
                    <span className="w-full flex items-center ml-2 text-base text-gray-700 dark:text-white">
                        {coinSymbol.toLocaleUpperCase()}
                    </span>
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Available balance: {coinBalance} {coinSymbol}
                </div>
                <ErrorMessage
                    className="mt-1 text-red-500 dark:text-red-400"
                    name="amount"
                    component="div"
                />
            </div>
            <div className="flex flex-col mt-2 text-gray-500 dark:text-gray-400">
                Estimated fee (gas cost): {formattedGasAmount} {GAS_SYMBOL}
            </div>
            {submitError ? (
                <div className="flex flex-col mt-2">
                    <Alert title="Transfer failed" subtitle={submitError} />
                </div>
            ) : null}
            <div className="flex flex-col mt-2">
                <Button
                    buttonStyle="primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="mt-2"
                >
                    {isSubmitting ? (
                        <LoadingIndicator />
                    ) : (
                        <>
                            <Icon
                                className="mr-2 text-xs"
                                icon={SuiIcons.Send}
                            />
                            Send
                        </>
                    )}
                </Button>
            </div>
        </Form>
    );
}

export default memo(TransferCoinForm);

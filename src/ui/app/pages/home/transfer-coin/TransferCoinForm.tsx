// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo } from 'react';
import { useIntl } from 'react-intl';

import AddressInput from '_components/address-input';
import Alert from '_components/alert';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import NumberInput from '_components/number-input';
import { SuiIcons } from '_font-icons/output/sui-icons';
import {
    DEFAULT_GAS_BUDGET_FOR_TRANSFER,
    GAS_SYMBOL,
} from '_redux/slices/sui-objects/Coin';
import { balanceFormatOptions } from '_shared/formatting';
import Icon from '_src/ui/app/components/icon';
import Button, { ButtonStyle } from '_src/ui/app/shared/buttons/Button';

import type { FormValues } from '.';

import st from './TransferCoinForm.module.scss';

export type TransferCoinFormProps = {
    submitError: string | null;
    coinBalance: string;
    coinSymbol: string;
    onClearSubmitError: () => void;
};

function TransferCoinForm({
    submitError,
    coinBalance,
    coinSymbol,
    onClearSubmitError,
}: TransferCoinFormProps) {
    const {
        isSubmitting,
        isValid,
        values: { amount, to },
    } = useFormikContext<FormValues>();
    const intl = useIntl();
    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;
    useEffect(() => {
        onClearRef.current();
    }, [amount, to]);
    return (
        <Form className={st.container} autoComplete="off" noValidate={true}>
            <div className="flex flex-col mt-2">
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
                    The recipient&apos;s address
                </div>
                <ErrorMessage
                    className="mt-1 text-red-500 dark:text-red-400"
                    name="to"
                    component="div"
                />
            </div>
            <div className="flex flex-col mt-2">
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
                        className="flex-1 block w-full min-w-fit rounded-md focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                    />
                    <span className="w-full flex items-center ml-2 text-base text-gray-700 dark:text-white">
                        {coinSymbol.toLocaleUpperCase()}
                    </span>
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Available balance:{' '}
                    {intl.formatNumber(
                        BigInt(coinBalance),
                        balanceFormatOptions
                    )}{' '}
                    {coinSymbol}
                </div>
                <ErrorMessage
                    className="mt-1 text-red-500 dark:text-red-400"
                    name="amount"
                    component="div"
                />
            </div>
            <div className="flex flex-col mt-2 text-gray-500 dark:text-gray-400">
                Total transaction fee estimate (gas cost):{' '}
                {DEFAULT_GAS_BUDGET_FOR_TRANSFER} {GAS_SYMBOL}
            </div>
            {submitError ? (
                <div className="flex flex-col mt-2">
                    <Alert>
                        <strong>Transfer failed.</strong>{' '}
                        <small>{submitError}</small>
                    </Alert>
                </div>
            ) : null}
            <div className="flex flex-col mt-2">
                <Button
                    buttonStyle={ButtonStyle.PRIMARY}
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

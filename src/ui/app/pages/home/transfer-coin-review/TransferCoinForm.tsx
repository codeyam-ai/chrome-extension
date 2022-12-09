// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo, useCallback, MouseEventHandler } from 'react';

import AddressInput from '_components/address-input';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import NumberInput from '_components/number-input';
import { SuiIcons } from '_font-icons/output/sui-icons';
import { GAS_SYMBOL, GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import Icon from '_src/ui/app/components/icon';
import NFTDisplayCard from '_src/ui/app/components/nft-display';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Alert from '_src/ui/app/shared/feedback/Alert';
import SuiIcon from '_src/ui/app/shared/svg/SuiIcon';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import WalletList, {
    WalletListProps,
} from '_src/ui/app/shared/wallet-list/WalletList';

import type { FormValues } from '.';

import st from './TransferCoinForm.module.scss';

export type TransferCoinFormProps = {
    submitError: string | null;
    coinBalance: string;
    coinSymbol: string;
    gasBudget: number;
    onClearSubmitError: () => void;
};

interface WalletSectionProps extends WalletListProps {
    header: string;
}

function TransferCoinForm({
    submitError,
    coinBalance,
    coinSymbol,
    gasBudget,
    onClearSubmitError,
}: TransferCoinFormProps) {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );

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
        <Form autoComplete="off" noValidate={true}>
            <div className="pt-6 px-6 text-left flex flex-col">
                <div className={'mb-6 flex flex-row items-center gap-6'}>
                    <BodyLarge isTextColorMedium>Sending</BodyLarge>
                    <div
                        className={
                            'pr-6 flex flex-row gap-2 p-2 rounded-full items-center bg-ethos-light-background-secondary dark:ethos-light-background-secondary'
                        }
                    >
                        <div
                            className={
                                'rounded-full w-6 h-6 flex justify-center items-center bg-[#3D5FF2]'
                            }
                        >
                            <SuiIcon width={16} height={16} />
                        </div>
                        <BodyLarge>SUI</BodyLarge>
                        {/* <ChevronDownIcon
                            width={20}
                            height={12}
                            color={'grey'}
                        /> */}
                    </div>
                </div>
                <div className={'relative'}>
                    <Field
                        className={'flex flex-col gap-2 pl-0 pr-0'}
                        component={AddressInput}
                        name="to"
                        label={'Recipient'}
                    />{' '}
                    <div
                        className={`absolute top-0 right-0 mt-1 text-red-500 dark:text-red-400 ${
                            isValid && 'hidden'
                        }`}
                    >
                        {!isValid && to !== ''
                            ? 'Please use a valid address'
                            : ' '}
                    </div>
                </div>
            </div>
            <div className={'pb-[80px]'}>
                <WalletList
                    header={'Transfer Between My Wallets'}
                    wallets={accountInfos}
                    isWalletEditing={false}
                    activeAccountIndex={activeAccountIndex}
                />
            </div>
            {/*<div className="flex flex-col mt-2 px-6 text-left">
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
            ) : null}*/}
            <div className="flex flex-col mt-2 absolute w-full bottom-[63px] bg-white pt-4">
                <Button
                    buttonStyle="primary"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="mt-2"
                >
                    {isSubmitting ? <LoadingIndicator /> : 'Continue'}
                </Button>
            </div>
        </Form>
    );
}

export default memo(TransferCoinForm);

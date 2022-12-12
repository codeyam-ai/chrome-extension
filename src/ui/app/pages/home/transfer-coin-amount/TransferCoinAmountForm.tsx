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
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Alert from '_src/ui/app/shared/feedback/Alert';
import SuiIcon from '_src/ui/app/shared/svg/SuiIcon';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';

import { useFormik } from 'formik';

import type { FormValues } from '.';
import CoinList from '../tokens/CoinList';
import CoinBalance from '../tokens/CoinBalance';
import Sui from '../tokens/Sui';
import { useSearchParams } from 'react-router-dom';
import { CoinSelect } from '_src/ui/app/shared/coin-select/coin-dropdown';

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
    return (
        <div className="text-left">
            {Object.keys(balances).map((type: string, idx: number) => {
                const balance = balances[type];
                const [balanceFormatted, symbol, usdAmount] = useFormatCoin(
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
    coinBalance,
    coinSymbol,
    gasBudget,
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

    let [formatted, symbol, dollars] = useFormatCoin(amount, coinType);

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

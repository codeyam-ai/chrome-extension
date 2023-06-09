// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { memo, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import CoinList from '../home/CoinList';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import ns from '_shared/namespace';
import { useDependencies } from '_shared/utils/dependenciesContext';
import WalletTo from '_src/ui/app/components/wallet-to';
import humanReadableTransactionErrors from '_src/ui/app/helpers/humanReadableTransactionError';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import { useCoinDecimals } from '_src/ui/app/hooks/useFormatCoin';
import { CoinSelect } from '_src/ui/app/pages/home/home/CoinDropdown';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Alert from '_src/ui/app/shared/feedback/Alert';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import CopyBody from '_src/ui/app/shared/typography/CopyBody';
import Typography from '_src/ui/app/shared/typography/Typography';

import type { FormValues } from '.';

export type TransferCoinFormProps = {
    submitError: string | null;
    coinBalance: string;
    coinSymbol: string;
    gasBudget: number;
    onClearSubmitError: () => void;
};

function TransferCoinForm({
    submitError,
    onClearSubmitError,
}: TransferCoinFormProps) {
    const formState = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const walletTo = useAppSelector(({ account: { accountInfos } }) =>
        accountInfos.find((accountInfo) => accountInfo.address === formState.to)
    );
    const contactTo = useAppSelector(({ contacts: { contacts } }) =>
        contacts.find((contact) => contact.address === formState.to)
    );
    const balances = useAppSelector(accountAggregateBalancesSelector);

    const suiBal: Record<string, bigint> = {};

    Object.keys(balances).forEach((key) => {
        if (key === '0x2::sui::SUI') {
            suiBal[key] = balances[key];
        }
    });

    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');

    const {
        isSubmitting,
        isValid,
        values: { amount },
    } = useFormikContext<FormValues>();
    const { locale } = useIntl();
    const amountBigNumber = ns.parse.numberString({
        numberString: amount,
        locale,
    });

    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    const [decimals] = useCoinDecimals(coinType);
    const [, , dollars] = useFormatCoin(
        amountBigNumber.shiftedBy(decimals || 9).toString(),
        coinType
    );

    useEffect(() => {
        onClearRef.current();
    }, [amount]);

    const dollarDisplay = amountBigNumber.gte(0) ? dollars : '$0.00';

    const { featureFlags } = useDependencies();

    return (
        <Form autoComplete="off" noValidate={false}>
            <div className="pt-6 px-6 text-left flex flex-col mb-2">
                <div
                    className={'mb-5 relative flex flex-row items-center gap-6'}
                >
                    <BodyLarge isTextColorMedium>Sending</BodyLarge>
                    <CoinSelect selectedCoinType={coinType} />
                </div>
                <CopyBody txt={formState.to} isTextColorMedium>
                    <WalletTo
                        addressTo={formState.to}
                        walletTo={
                            walletTo
                                ? walletTo
                                : contactTo
                                ? contactTo
                                : undefined
                        }
                    />
                </CopyBody>
            </div>
            <div className="flex flex-col mb-8 px-6 text-left">
                <div className={'mb-3'}>
                    <AmountField />
                </div>
                {featureFlags.showUsd && (
                    <BodyLarge isSemibold isTextColorMedium>
                        ≈ {dollarDisplay} USD
                    </BodyLarge>
                )}
                <ErrorMessage
                    className="mt-1 text-ethos-light-red dark:text-ethos-dark-red"
                    name="amount"
                    component="div"
                />
                {submitError ? (
                    <div className="flex flex-col m-3">
                        <Alert
                            title="Problem"
                            subtitle={humanReadableTransactionErrors(
                                submitError
                            )}
                        />
                    </div>
                ) : null}
            </div>
            <ContentBlock className="mb-2">
                <Body isSemibold className="ml-1">
                    Available Balance
                </Body>
                <CoinList balances={suiBal} />
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

function AmountField() {
    const { isSubmitting } = useFormikContext();

    const classes =
        'flex flex-row w-full py-[16px] px-[20px] focus:py-[15px] focus:px-[19px] resize-none shadow-sm rounded-[16px] bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary font-weight-ethos-body-large text-size-ethos-body-large leading-line-height-ethos-body-large tracking-letter-spacing-ethos-body-large bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke focus:ring-0 focus:border-2 focus:border-ethos-light-primary-light focus:dark:border-ethos-dark-primary-dark focus:shadow-ethos-light-stroke-focused dark:focus:shadow-ethos-dark-stroke-focused';

    return (
        <div className={'relative'}>
            <Field
                name="amount"
                type="text"
                className={classes}
                placeholder="Amount"
                autoFocus
                disabled={isSubmitting}
            />
            <Typography
                className={
                    'absolute top-[18px] right-5 font-weight-ethos-body-large text-size-ethos-body-large leading-line-height-ethos-body-large text-ethos-light-text-medium dark:text-ethos-dark-text-medium'
                }
            >
                SUI
            </Typography>
        </div>
    );
}

export default memo(TransferCoinForm);

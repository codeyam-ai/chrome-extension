// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Coin } from '@mysten/sui.js';
import { BigNumber } from 'bignumber.js';
import { Form, useFormikContext } from 'formik';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import LoadingIndicator from '_components/loading/LoadingIndicator';
import WalletTo from '_src/ui/app/components/wallet-to';
import { getTheme } from '_src/ui/app/helpers/getTheme';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import { AssetCard } from '_src/ui/app/shared/nfts/AssetCard';
import Body from '_src/ui/app/shared/typography/Body';
import Header from '_src/ui/app/shared/typography/Header';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { FormValues } from '.';

export type TransferCoinFormProps = {
    submitted: boolean;
    submitError: string | null;
    onClearSubmitError: () => void;
};

function TransferCoinForm({
    onClearSubmitError,
    submitted,
}: TransferCoinFormProps) {
    const {
        isSubmitting,
        values: { amount, to },
    } = useFormikContext<FormValues>();
    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');
    const formData = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const walletFrom = useAppSelector(({ account: { accountInfos } }) =>
        accountInfos.find(
            (accountInfo) => accountInfo.address === formData.from
        )
    );
    const walletTo = useAppSelector(({ account: { accountInfos } }) =>
        accountInfos.find((accountInfo) => accountInfo.address === formData.to)
    );
    const contactTo = useAppSelector(({ contacts: { contacts } }) =>
        contacts.find((contact) => contact.address === formData.to)
    );
    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    const [, , , , , queryResult] = useFormatCoin(null, coinType);
    const decimals =
        queryResult?.data &&
        typeof queryResult.data === 'object' &&
        'decimals' in queryResult.data
            ? (queryResult.data.decimals as number)
            : 9;
    const unformattedAmount = new BigNumber(formData.amount)
        .shiftedBy(decimals)
        .toString();

    const [, , dollars, , icon] = useFormatCoin(unformattedAmount, coinType);

    useEffect(() => {
        onClearRef.current();
    }, [amount, to]);

    const coinSymbol = useMemo(
        () => (coinType && Coin.getCoinSymbol(coinType)) || '',
        [coinType]
    );

    const theme = getTheme();

    if (amount === '' || to === '' || !coinSymbol) {
        return <Navigate to={'/home'} />;
    } else {
        return (
            <Form autoComplete="off" noValidate={true}>
                <div className="p-6 flex flex-col">
                    {coinSymbol && (
                        <AssetCard
                            theme={theme}
                            txType={'transfer'}
                            coinType={coinSymbol}
                            name={coinSymbol}
                            imgUrl={icon || ''}
                        />
                    )}
                    <Body isTextColorMedium>Transfer</Body>
                    <Header className={'font-weight-ethos-subheader'}>
                        {amount} {truncateString(coinSymbol, 8)}
                    </Header>
                    <Subheader isTextColorMedium>{dollars}</Subheader>
                </div>
                <KeyValueList
                    keyNamesAndValues={[
                        {
                            keyName: 'From',
                            shortValue: (
                                <WalletTo
                                    addressTo={formData.from}
                                    walletTo={walletFrom}
                                    noTo={true}
                                />
                            ),
                            value: formData.from,
                        },
                        {
                            keyName: 'To',
                            shortValue: (
                                <WalletTo
                                    addressTo={formData.to}
                                    walletTo={
                                        walletTo
                                            ? walletTo
                                            : contactTo
                                            ? contactTo
                                            : undefined
                                    }
                                    noTo={true}
                                />
                            ),
                            value: formData.to,
                        },
                        {
                            keyName: 'Token',
                            shortValue: truncateString(coinSymbol, 12),
                            value: coinSymbol,
                        },
                        {
                            keyName: 'Transaction Fee',
                            value: formData.gasFee || '',
                        },
                    ]}
                />
                <div className="flex flex-col mb-2 absolute w-full bottom-[-10px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default pt-4 rounded-b-2xl">
                    <Button
                        disabled={submitted}
                        buttonStyle="primary"
                        type="submit"
                        className="mt-2"
                    >
                        {isSubmitting ? <LoadingIndicator /> : 'Confirm & Send'}
                    </Button>
                </div>
            </Form>
        );
    }
}

export default memo(TransferCoinForm);

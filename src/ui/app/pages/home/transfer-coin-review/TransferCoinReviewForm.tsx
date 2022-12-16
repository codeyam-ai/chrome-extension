// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Coin } from '@mysten/sui.js';
import { Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo, useMemo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import UnknownToken from '../tokens/UnknownToken';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import { getTheme } from '_src/ui/app/helpers/getTheme';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import { AssetCard } from '_src/ui/app/shared/nfts/AssetCard';
import TxSui from '_src/ui/app/shared/svg/TxSui';
import Body from '_src/ui/app/shared/typography/Body';
import Header from '_src/ui/app/shared/typography/Header';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { FormValues } from '.';

export type TransferCoinFormProps = {
    submitError: string | null;
    onClearSubmitError: () => void;
};

function TransferCoinForm({ onClearSubmitError }: TransferCoinFormProps) {
    const {
        isSubmitting,
        values: { amount, to },
    } = useFormikContext<FormValues>();
    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');
    const formData = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    useEffect(() => {
        onClearRef.current();
    }, [amount, to]);

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(parseFloat(amount) * 100);

    const coinSymbol = useMemo(
        () => (coinType && Coin.getCoinSymbol(coinType)) || '',
        [coinType]
    );

    const theme = getTheme();

    const icon = useMemo(() => {
        if (!coinSymbol) return null;
        const dim = 59;

        switch (coinSymbol) {
            case 'SUI':
                return (
                    <TxSui
                        borderColor={theme === 'light' ? '#ffffff' : '#111111'}
                    />
                );
            default:
                return <UnknownToken width={dim} height={dim} />;
        }
    }, [coinSymbol]);

    if (amount === '' || to === '' || !coinSymbol) {
        return <Navigate to={'/tokens'} />;
    } else {
        return (
            <Form autoComplete="off" noValidate={true}>
                <div className="p-6 flex flex-col">
                    {icon && (
                        <AssetCard
                            theme={theme}
                            isNft={false}
                            coinType={coinSymbol}
                            name={coinSymbol}
                        />
                    )}
                    <Body isTextColorMedium>Sending</Body>
                    <Header className={'font-weight-ethos-subheader'}>
                        {amount} {truncateString(coinSymbol, 8)}
                    </Header>
                    <Subheader isTextColorMedium>{dollars}</Subheader>
                </div>
                <KeyValueList
                    keyNamesAndValues={[
                        {
                            keyName: 'From',
                            value: formData.from,
                        },
                        {
                            keyName: 'To',
                            value: truncateMiddle(formData.to),
                        },
                        {
                            keyName: 'Token',
                            value: truncateString(coinSymbol, 12),
                        },
                        {
                            keyName: 'Transaction Fee',
                            value: formData.gasFee || '',
                        },
                    ]}
                />
                <div className="flex flex-col mb-2 absolute w-full bottom-[-10px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default pt-4 rounded-b-2xl">
                    <Button
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

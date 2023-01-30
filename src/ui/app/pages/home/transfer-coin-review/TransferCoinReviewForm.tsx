// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Coin } from '@mysten/sui.js';
import { Form, useFormikContext } from 'formik';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import LoadingIndicator from '_components/loading/LoadingIndicator';
import { getTheme } from '_src/ui/app/helpers/getTheme';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
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
    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    const [, , dollars, , icon] = useFormatCoin(null, coinType);

    useEffect(() => {
        onClearRef.current();
    }, [amount, to]);

    const coinSymbol = useMemo(
        () => (coinType && Coin.getCoinSymbol(coinType)) || '',
        [coinType]
    );

    const theme = getTheme();

    if (amount === '' || to === '' || !coinSymbol) {
        return <Navigate to={'/tokens'} />;
    } else {
        return (
            <Form autoComplete="off" noValidate={true}>
                <div className="p-6 flex flex-col">
                    {coinSymbol && (
                        <AssetCard
                            theme={theme}
                            isNft={false}
                            isFunc={false}
                            coinType={coinSymbol}
                            name={coinSymbol}
                            imgUrl={icon || ''}
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
                            shortValue: truncateMiddle(formData.to),
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

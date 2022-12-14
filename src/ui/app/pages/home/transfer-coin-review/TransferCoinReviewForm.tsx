// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingIndicator from '_components/loading/LoadingIndicator';
import { getTheme } from '_src/ui/app/helpers/getTheme';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import { AssetCard } from '_src/ui/app/shared/nfts/AssetCard';
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

    const formData = useAppSelector(({ forms: { sendSui } }) => sendSui);
    const theme = getTheme();
    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    useEffect(() => {
        onClearRef.current();
    }, [amount, to]);

    const dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(parseFloat(amount) * 100);

    if (amount === '' || to === '') {
        return <Navigate to={'/tokens'} />;
    } else {
        return (
            <Form autoComplete="off" noValidate={true}>
                <div className="p-6 flex flex-col">
                    <AssetCard
                        theme={theme}
                        isNft={false}
                        imgUrl={''}
                        name={''}
                    />
                    <Body isTextColorMedium>Sending</Body>
                    <Header className={'font-weight-ethos-subheader'}>
                        {amount} Sui
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
                            value: 'SUI',
                        },
                        {
                            keyName: 'Transaction Fee',
                            value: formData.gasFee || '',
                        },
                    ]}
                />
                <div className="flex flex-col mt-2 absolute w-full bottom-[63px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default pt-4">
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

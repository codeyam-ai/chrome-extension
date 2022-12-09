// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Field, Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo } from 'react';

import AddressInput from '_components/address-input';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import SuiIcon from '_src/ui/app/shared/svg/SuiIcon';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import WalletList from '_src/ui/app/shared/wallet-list/WalletList';

import type { FormValues } from '.';

export type TransferCoinRecipientFormProps = {
    submitError: string | null;
    onClearSubmitError: () => void;
};

function TransferCoinRecipientForm({
    onClearSubmitError,
}: TransferCoinRecipientFormProps) {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );

    const {
        isSubmitting,
        isValid,
        values: { to },
    } = useFormikContext<FormValues>();

    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    useEffect(() => {
        onClearRef.current();
    }, [to]);

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

export default memo(TransferCoinRecipientForm);

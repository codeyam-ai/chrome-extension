// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Field, Form, useFormikContext } from 'formik';
import { useEffect, useRef, memo } from 'react';

import AddressInput from '_components/address-input';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import SuiIcon from '_src/ui/app/shared/svg/SuiIcon';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';

import SuiTxWalletList from '_src/ui/app/shared/wallet-list/SuiTxWalletList';
import { setSuiRecipient } from '_src/ui/app/redux/slices/forms';
import account from '_src/ui/app/redux/slices/account';
import { CoinSelect } from '_src/ui/app/shared/coin-select/coin-dropdown';

export type TransferCoinRecipientFormProps = {
    submitError: string | null;
    onClearSubmitError: () => void;
};

const vals = {
    to: '',
};

export type FormValues = typeof vals;

function TransferCoinRecipientForm({
    onClearSubmitError,
}: TransferCoinRecipientFormProps) {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );

    const formState = useAppSelector(({ forms: { sendSui } }) => sendSui);

    const {
        isSubmitting,
        isValid,
        setValues,
        values: { to },
    } = useFormikContext<FormValues>();

    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    useEffect(() => {
        setValues({ to: formState.to });
        console.log('form state: ', formState);
    }, [formState.to]);

    const dispatch = useAppDispatch();

    return (
        <Form autoComplete="off" noValidate={true}>
            <div className="pt-6 px-6 text-left flex flex-col">
                <div className={'mb-6 flex flex-row items-center gap-6'}>
                    <BodyLarge isTextColorMedium>Sending</BodyLarge>
                    <CoinSelect />
                </div>
                <div className={'relative'}>
                    <Field
                        id="to"
                        placeholder={to || '0x... or SuiNS name'}
                        className={'flex flex-col gap-2 pl-0 pr-0'}
                        component={AddressInput}
                        name="to"
                        label={'Recipient'}
                        onChange={(e: { target: { name: string } }) => {
                            dispatch(
                                setSuiRecipient({
                                    walletIdx: undefined,
                                    to: e.target.name,
                                    from: 'Wallet',
                                })
                            );
                        }}
                    />
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
                {accountInfos.length > 1 && (
                    <SuiTxWalletList
                        header={'Transfer Between My Wallets'}
                        wallets={accountInfos}
                        activeAccountIndex={activeAccountIndex}
                    />
                )}
            </div>
            <div className="flex flex-col mt-2 absolute w-full bottom-[63px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default pt-4">
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

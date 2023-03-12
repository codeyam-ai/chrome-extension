// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Field, Form, useFormikContext } from 'formik';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import AddressInput from '_components/address-input';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import Loading from '_src/ui/app/components/loading';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { CoinSelect } from '_src/ui/app/pages/home/tokens/CoinDropdown';
import { setSuiRecipient } from '_src/ui/app/redux/slices/forms';
import {
    getTransactionsByAddress,
    type TxResultState,
} from '_src/ui/app/redux/slices/txresults';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import SuiTxWalletList from '_src/ui/app/shared/wallet-list/SuiTxWalletList';

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

    const [searchParams] = useSearchParams();
    const coinType = searchParams.get('type');

    const txByAddress: TxResultState[] = useAppSelector(({ txresults }) =>
        txresults.latestTx.filter((tx) => tx.isSender)
    );

    console.log('txByAddress', txByAddress);
    const recentTxs: string[] = [];
    txByAddress.forEach((tx) => {
        if (tx.to) {
            return recentTxs.push(tx.to);
        }
    });

    const loading = useAppSelector(({ txresults }) => txresults.loading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTransactionsByAddress()).unwrap();
    }, [dispatch]);

    const {
        isSubmitting,
        isValid,
        errors,
        values: { to },
        setFieldValue,
    } = useFormikContext<FormValues>();

    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    const handleOnblur = useCallback(
        (e: { target: { name: string } }) => {
            dispatch(
                setSuiRecipient({
                    to: e.target.name,
                    from: accountInfos[activeAccountIndex].name || 'Wallet',
                })
            );
        },
        [accountInfos, activeAccountIndex, dispatch]
    );

    const recentWallets = [...new Set(recentTxs)].splice(0, 3);

    if (!coinType) return <></>;

    return (
        <Loading loading={loading} big={true}>
            <Form autoComplete="off" noValidate={true}>
                <div className="pt-6 px-6 text-left flex flex-col absolute w-full bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                    <div
                        className={
                            'mb-6 flex flex-row items-center gap-6 relative z-5'
                        }
                    >
                        <BodyLarge isTextColorMedium>Sending</BodyLarge>
                        <CoinSelect selectedCoinType={coinType} />
                    </div>
                    <div className={'relative'}>
                        <Field
                            placeholder={'0x... or SuiNS name'}
                            className={'flex flex-col gap-2 pl-0 pr-0'}
                            component={AddressInput}
                            name="to"
                            id="to"
                            label={'Recipient'}
                            onBlur={handleOnblur}
                        />
                        <div
                            className={`absolute top-0 right-0 mt-1 text-red-500 dark:text-red-400 ${
                                isValid && 'hidden'
                            }`}
                        >
                            {!isValid && to !== '' ? errors.to : ' '}
                        </div>
                    </div>
                </div>
                <div className={'pb-[80px] pt-[202px]'}>
                    {recentWallets.length > 0 && (
                        <SuiTxWalletList
                            header={'Recent Wallets'}
                            wallets={accountInfos}
                            transactions={recentWallets}
                            activeAccountIndex={activeAccountIndex}
                            setFieldValue={setFieldValue}
                        />
                    )}
                    {accountInfos.length > 1 && (
                        <SuiTxWalletList
                            header={'Transfer Between My Wallets'}
                            wallets={accountInfos}
                            activeAccountIndex={activeAccountIndex}
                            setFieldValue={setFieldValue}
                        />
                    )}
                </div>
                <div className="flex flex-col mb-2 absolute w-full bottom-[-10px] bg-ethos-light-background-default dark:bg-ethos-dark-background-default pt-4 rounded-b-2xl">
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
        </Loading>
    );
}

export default memo(TransferCoinRecipientForm);

// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { ErrorMessage, Field, Form, useFormikContext } from 'formik';
import { memo, useEffect, useRef } from 'react';

import { Content } from '_app/shared/bottom-menu-layout';
import AddressInput from '_components/address-input';
import NFTDisplayCard from '_components/nft-display';
import { DEFAULT_NFT_TRANSFER_GAS_FEE } from '_redux/slices/sui-objects/Coin';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { getTransactionsByAddress } from '_src/ui/app/redux/slices/txresults';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import SuiTxWalletList from '_src/ui/app/shared/wallet-list/SuiTxWalletList';

import type { FormValues } from '.';
import type { SuiObject } from '@mysten/sui.js';
import type { TxResultState } from '_src/ui/app/redux/slices/txresults';

import st from './TransferNFTForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';

export type TransferNFTFormProps = {
    submitError: string | null;
    gasBalance: string;
    nftobj: SuiObject;
    onClearSubmitError: () => void;
};

function TransferNFTForm({
    submitError,
    gasBalance,
    nftobj,
    onClearSubmitError,
}: TransferNFTFormProps) {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);

    const activeAccountIndex = useAppSelector(
        ({ account: { activeAccountIndex } }) => activeAccountIndex
    );

    const txByAddress: TxResultState[] = useAppSelector(({ txresults }) =>
        txresults.latestTx.filter((tx) => tx.isSender)
    );

    const recentTxs: string[] = [];
    txByAddress.forEach((tx) => {
        if (tx.to) {
            return recentTxs.push(tx.to);
        }
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTransactionsByAddress()).unwrap();
    }, [dispatch]);
    const {
        isSubmitting,
        isValid,
        errors,
        values: { to, amount },
        setFieldValue,
    } = useFormikContext<FormValues>();

    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;

    useEffect(() => {
        onClearRef.current();
    }, [to, amount]);

    const recentWallets = [...new Set(recentTxs)].splice(0, 3);

    return (
        <div>
            <Content>
                <Form
                    className={st.container}
                    autoComplete="off"
                    noValidate={true}
                >
                    <div>
                        <div className="pt-6 px-6 text-left flex flex-col absolute w-full bg-ethos-light-background-default dark:bg-ethos-dark-background-default">
                            <div className={'mb-6'}>
                                <BodyLarge isTextColorMedium className={'mb-4'}>
                                    Transfer
                                </BodyLarge>
                                {nftobj && (
                                    <NFTDisplayCard
                                        nftobj={nftobj}
                                        wideview={true}
                                    />
                                )}
                            </div>
                            <div className={'relative'}>
                                <Field
                                    className={
                                        'flex flex-col gap-2 text-left pl-0 pr-0'
                                    }
                                    component={AddressInput}
                                    name="to"
                                    label={'Recipient'}
                                />{' '}
                                <div
                                    className={`absolute top-0 right-0 mt-1 text-red-500 dark:text-red-400 ${
                                        isValid && 'hidden'
                                    }`}
                                >
                                    {!isValid && to !== '' ? errors.to : ' '}
                                </div>
                            </div>
                            <ErrorMessage
                                className="mt-1 text-red-500 dark:text-red-400"
                                name="to"
                                component="div"
                            />
                            {BigInt(gasBalance) <
                                DEFAULT_NFT_TRANSFER_GAS_FEE && (
                                <div className="mt-1 text-red-500 dark:text-red-400">
                                    * Insufficient balance to cover transfer
                                    cost
                                </div>
                            )}
                            <div
                                className={
                                    'mt-1 text-red-500 dark:text-red-400' &&
                                    submitError
                                        ? 'block'
                                        : 'hidden'
                                }
                            >
                                {submitError ? submitError : ' '}
                            </div>
                        </div>
                        <div className={'pb-[80px] pt-[240px]'}>
                            {recentWallets.length > 0 && (
                                <SuiTxWalletList
                                    header={'Recent Wallets'}
                                    transactions={recentWallets}
                                    wallets={accountInfos}
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
                        <div
                            className={
                                'bg-ethos-light-background-default dark:bg-ethos-dark-background-default absolute bottom-0 w-full p-6 left-0 right-0 rounded-b-2xl'
                            }
                        >
                            <Button
                                isInline
                                removeContainerPadding
                                buttonStyle="primary"
                                disabled={!isValid || isSubmitting}
                                className={'mb-0 relative'}
                                type={'submit'}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </Form>
            </Content>
        </div>
    );
}

export default memo(TransferNFTForm);

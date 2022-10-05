// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from 'classnames';
import { ErrorMessage, Form, Field, useFormikContext } from 'formik';
import { useEffect, useRef, memo } from 'react';

import { Content } from '_app/shared/bottom-menu-layout';
import AddressInput from '_components/address-input';
import Icon, { SuiIcons } from '_components/icon';
import LoadingIndicator from '_components/loading/LoadingIndicator';
import { DEFAULT_NFT_TRANSFER_GAS_FEE } from '_redux/slices/sui-objects/Coin';
import Button, { ButtonStyle } from '_src/ui/app/shared/buttons/Button';

import type { FormValues } from '.';

import st from './TransferNFTForm.module.scss';

export type TransferNFTFormProps = {
    submitError: string | null;
    gasBalance: string;
    onClearSubmitError: () => void;
};

function TransferNFTForm({
    submitError,
    gasBalance,
    onClearSubmitError,
}: TransferNFTFormProps) {
    const {
        isSubmitting,
        isValid,
        dirty,
        values: { to, amount },
    } = useFormikContext<FormValues>();

    const onClearRef = useRef(onClearSubmitError);
    onClearRef.current = onClearSubmitError;
    useEffect(() => {
        onClearRef.current();
    }, [to, amount]);

    // TODO: add QR code scanner
    // const clearAddress = useCallback(() => {
    //     setFieldValue('to', '');
    // }, [setFieldValue]);

    return (
        <div className={st.sendNft}>
            <Content>
                <Form
                    className={st.container}
                    autoComplete="off"
                    noValidate={true}
                >
                    <label className="text-base text-gray-700 dark:text-gray-400">
                        Send to
                    </label>
                    <div
                        className={cl(
                            st.group,
                            dirty && to !== '' && !isValid ? st.invalidAddr : ''
                        )}
                    >
                        <Field
                            component={AddressInput}
                            name="to"
                            className="flex-1 block w-full min-w-0 rounded-md sm:text-sm focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 border-gray-300 dark:border-gray-500 dark:bg-gray-700"
                        />{' '}
                        {/* {dirty && to !== '' && (
                            <div
                                onClick={clearAddress}
                                className={cl(
                                    st.inputGroupAppend,
                                    st.changeAddrIcon + ' sui-icons-close'
                                )}
                            ></div>
                        )} */}
                    </div>

                    <ErrorMessage
                        className="mt-1 text-red-500 dark:text-red-400"
                        name="to"
                        component="div"
                    />
                    {isValid && (
                        <div className="flex flex-row mt-1 text-green-500 dark:text-green-400">
                            <Icon
                                icon={SuiIcons.Checkmark}
                                className={st.checkmark + ' mr-1'}
                            />
                            That&apos;s a valid address
                        </div>
                    )}
                    {BigInt(gasBalance) < DEFAULT_NFT_TRANSFER_GAS_FEE && (
                        <div className="mt-1 text-red-500 dark:text-red-400">
                            * Insufficient balance to cover transfer cost
                        </div>
                    )}

                    {submitError ? (
                        <div className="mt-1 text-red-500 dark:text-red-400">
                            {submitError}
                        </div>
                    ) : null}

                    <Button
                        buttonStyle={ButtonStyle.PRIMARY}
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="mt-4"
                    >
                        {isSubmitting ? <LoadingIndicator /> : 'Send'}
                    </Button>
                </Form>
            </Content>
        </div>
    );
}

export default memo(TransferNFTForm);

// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useFormik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import logo from '../../components/logo/ethos-logo.png';
import Button, { ButtonStyle } from '../../shared/Button';
import BackButton from './BackButton';
import { useAppDispatch, useAppSelector } from '_hooks';
import { createMnemonic, setMnemonic } from '_redux/slices/account';
import {
    normalizeMnemonics,
    validateMnemonics,
} from '_shared/cryptography/mnemonics';

import type { FocusEventHandler } from 'react';

const validationSchema = Yup.object({
    mnemonic: Yup.string()
        .ensure()
        .required()
        .trim()
        .transform((mnemonic) => normalizeMnemonics(mnemonic))
        .test('mnemonic-valid', 'Recovery phrase is invalid', (mnemonic) =>
            validateMnemonics(mnemonic)
        )
        .label('Recovery phrase'),
});

const initialValues = {
    mnemonic: '',
};
type ValuesType = typeof initialValues;

const ImportPage = () => {
    const createInProgress = useAppSelector(({ account }) => account.creating);
    const dispatch = useAppDispatch();
    const onHandleSubmit = useCallback(
        async ({ mnemonic }: ValuesType) => {
            await dispatch(createMnemonic(mnemonic));
            await dispatch(setMnemonic(mnemonic));
        },
        [dispatch]
    );
    const {
        handleBlur,
        handleChange,
        values: { mnemonic },
        isSubmitting,
        isValid,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
    } = useFormik({
        initialValues,
        onSubmit: onHandleSubmit,
        validationSchema,
        validateOnMount: true,
    });
    const onHandleMnemonicBlur = useCallback<
        FocusEventHandler<HTMLTextAreaElement>
    >(
        async (e) => {
            const adjMnemonic = await validationSchema.fields.mnemonic.cast(
                mnemonic
            );
            await setFieldValue('mnemonic', adjMnemonic, false);
            handleBlur(e);
        },
        [setFieldValue, mnemonic, handleBlur]
    );
    return (
        <>
            <BackButton to="/" />
            <img src={logo} className="h-36 mx-auto pb-3" alt="" />
            <h1 className="text-xl font-semibold tracking-tight sm:text-4xl">
                Recover Your Wallet
            </h1>
            <div className="text-center space-y-6 py-4">
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <textarea
                        rows={2}
                        onChange={handleChange}
                        value={mnemonic}
                        onBlur={onHandleMnemonicBlur}
                        id="mnemonic"
                        className="max-w-sm mx-auto text-center shadow-sm block w-full resize-none text-sm rounded-md border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-violet-700 dark:focus:border-violet-700 dark:border-gray-500 dark:bg-gray-700"
                        placeholder="Insert your recovery phrase"
                        name="mnemonic"
                        disabled={createInProgress || isSubmitting}
                    />
                    <div className="mt-1 text-red-700 dark:text-red-400">
                        {(touched.mnemonic && errors?.mnemonic) || null}
                    </div>
                    <Button
                        buttonStyle={ButtonStyle.PRIMARY}
                        type="submit"
                        className="mt-4"
                        disabled={isSubmitting || createInProgress || !isValid}
                    >
                        Import
                    </Button>
                </form>
            </div>
        </>
    );
};

export default ImportPage;

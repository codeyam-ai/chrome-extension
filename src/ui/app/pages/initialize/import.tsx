// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useFormik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import logo from '../../components/logo/ethos-logo.png';
import Button, { ButtonStyle } from '../../shared/buttons/Button';
import BackButton from './BackButton';
import { useAppDispatch, useAppSelector } from '_hooks';
import { createMnemonic, setMnemonic } from '_redux/slices/account';
import {
    normalizeMnemonics,
    validateMnemonics,
} from '_shared/cryptography/mnemonics';

import type { FocusEventHandler } from 'react';
import Title from '../../shared/typography/Title';
import Mnemonic from '../../shared/inputs/Mnemonic';

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

            <Title as="h1" className="mb-4">
                Recover Your Wallet
            </Title>

            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Mnemonic
                    mnemonic={mnemonic}
                    isReadOnly={false}
                    onChange={handleChange}
                    onBlur={onHandleMnemonicBlur}
                    disabled={createInProgress || isSubmitting}
                    errorText={
                        (touched.mnemonic && errors?.mnemonic) || undefined
                    }
                />
                <Button
                    buttonStyle={ButtonStyle.PRIMARY}
                    type="submit"
                    disabled={isSubmitting || createInProgress || !isValid}
                >
                    Import
                </Button>
            </form>
        </>
    );
};

export default ImportPage;

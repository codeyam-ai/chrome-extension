// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useQueryClient } from '@tanstack/react-query';
import { Field, Formik, Form } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';

import InputWithAction from '_app/shared/input-with-action';
import Alert from '_components/alert';
import { useAppSelector, useAppDispatch } from '_hooks';
import { setCustomRPC } from '_redux/slices/app';
import Button from '_src/ui/app/shared/buttons/Button';

import st from '../NetworkSelector.module.scss';

const MIN_CHAR = 5;

const isValidUrl = (url: string | undefined) => {
    if (!url) return false;
    try {
        new URL(url);
    } catch (e) {
        return false;
    }
    return true;
};

const validation = Yup.object({
    rpcInput: Yup.string()
        .required()
        .label('Custom RPC URL')
        .min(MIN_CHAR)
        .test('validate-url', 'Not a valid URL', (value) => isValidUrl(value)),
});

export function CustomRPCInput() {
    const placeholder = 'http://localhost:3000/';

    const customRPC = useAppSelector(({ app }) => app.customRPC || '');

    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();
    const changeNetwork = useCallback(
        async ({ rpcInput }: { rpcInput: string }) => {
            dispatch(setCustomRPC({ customRPC: rpcInput, queryClient }));
        },
        [dispatch]
    );

    return (
        <Formik
            initialValues={{ rpcInput: customRPC }}
            validationSchema={validation}
            onSubmit={changeNetwork}
            enableReinitialize={true}
        >
            {({ dirty, isSubmitting, isValid, touched, errors }) => (
                <Form>
                    <Field
                        component={InputWithAction}
                        type="text"
                        name="rpcInput"
                        min={MIN_CHAR}
                        placeholder={placeholder}
                        disabled={isSubmitting}
                        className="text-sm w-72"
                    >
                        <Button
                            type="submit"
                            disabled={!dirty || isSubmitting || !isValid}
                        >
                            Save
                        </Button>
                    </Field>

                    {touched.rpcInput && errors.rpcInput ? (
                        <Alert className={st.error}>{errors.rpcInput}</Alert>
                    ) : null}
                </Form>
            )}
        </Formik>
    );
}

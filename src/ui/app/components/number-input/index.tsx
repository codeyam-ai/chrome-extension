// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback } from 'react';
import { NumericFormat } from 'react-number-format';

import { useNumberDelimiters } from '_hooks';

import type { FieldProps } from 'formik';
import type { NumberFormatValues } from 'react-number-format';

export interface NumberInputProps<Values> extends FieldProps<string, Values> {
    allowNegative: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    decimals?: boolean;
    autoFocus?: boolean;
}

function NumberInput<FormValues>({
    allowNegative,
    className,
    placeholder,
    autoFocus,
    disabled: forcedDisabled,
    decimals = false,
    field: { onBlur, name, value },
    form: { isSubmitting, setFieldValue },
}: NumberInputProps<FormValues>) {
    const disabled =
        forcedDisabled !== undefined ? forcedDisabled : isSubmitting;
    const { groupDelimiter, decimalDelimiter } = useNumberDelimiters();

    const handleOnValueChange = useCallback(
        (values: NumberFormatValues) => {
            setFieldValue(name, values.formattedValue);
        },
        [name, setFieldValue]
    );
    return (
        <NumericFormat
            type="text"
            onKeyDown={onBlur}
            {...{
                className,
                placeholder,
                autoFocus,
                disabled,
                value,
                name,
                allowNegative,
                decimalScale: decimals ? undefined : 0,
                decimalSeparator: decimalDelimiter || '.',
                thousandSeparator: groupDelimiter || ',',
                onBlur,
                onValueChange: handleOnValueChange,
            }}
        />
    );
}

export default memo(NumberInput);

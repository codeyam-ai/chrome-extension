// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import Input from '../../shared/inputs/Input';
import lookup from './lookup';
import { SUI_ADDRESS_VALIDATION } from './validation';

import type { SuiAddress } from '@mysten/sui.js';
import type { FieldProps } from 'formik';
import type { ChangeEventHandler } from 'react';

export interface AddressInputProps<Values>
    extends FieldProps<SuiAddress, Values> {
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    label?: string;
}

function AddressInput<FormValues>({
    disabled: forcedDisabled,
    placeholder = '0x... or SuiNS name',
    className,
    label,
    form: { isSubmitting, setFieldValue },
    field: { onBlur, name, value },
}: AddressInputProps<FormValues>) {
    const [displayedValue, setDisplayedValue] = useState<string>(value);
    const [showAddress, setShowAddress] = useState<boolean>(false);
    const disabled =
        forcedDisabled !== undefined ? forcedDisabled : isSubmitting;

    useEffect(() => {
        setDisplayedValue(value);
    }, [value]);

    const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            const _value = e.currentTarget.value;
            setDisplayedValue(_value);
            if (!_value.startsWith('0x')) {
                lookup(_value).then((address: string) => {
                    setShowAddress(address !== _value);
                    setFieldValue(name, SUI_ADDRESS_VALIDATION.cast(address));
                });
            } else {
                setFieldValue(name, SUI_ADDRESS_VALIDATION.cast(_value));
            }
        },
        [setFieldValue, setDisplayedValue, name]
    );

    const formattedValue = useMemo(
        () => SUI_ADDRESS_VALIDATION.cast(value),
        [value]
    );

    return (
        <div className="flex flex-col gap-1 flex-1">
            <Input
                label={label}
                className={className}
                disabled={disabled}
                placeholder={placeholder}
                onBlur={onBlur}
                value={displayedValue}
                onChange={handleOnChange}
                name={name}
            />
            <input
                type="hidden"
                {...{
                    disabled,
                    value: formattedValue,
                    name,
                }}
            />
            {showAddress && <div>{formattedValue}</div>}
        </div>
    );
}

export default memo(AddressInput);

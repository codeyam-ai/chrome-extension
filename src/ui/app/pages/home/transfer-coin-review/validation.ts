// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SUI_TYPE_ARG } from '@mysten/sui.js';
import BigNumber from 'bignumber.js';
import * as Yup from 'yup';

import { formatBalance } from '_app/hooks/useFormatCoin';
import { SUI_SYMBOL } from '_redux/slices/sui-objects/Coin';

export function createTokenValidation(
    coinType: string,
    coinBalance: bigint,
    coinSymbol: string,
    gasBalance: bigint,
    decimals: number,
    gasDecimals: number,
    gasBudget: number
) {
    return Yup.mixed()
        .transform((_, original) => {
            return new BigNumber(original);
        })
        .test('required', `\${path} is a required field`, (value) => {
            return !!value;
        })
        .test(
            'valid',
            'The value provided is not valid.',
            (value?: BigNumber) => {
                if (!value || value.isNaN() || !value.isFinite()) {
                    return false;
                }
                return true;
            }
        )
        .test(
            'min',
            `\${path} must be greater than 0 ${coinSymbol}`,
            (amount?: BigNumber) => (amount ? amount.gt(0) : false)
        )
        .test(
            'max',
            `\${path} must be less than ${formatBalance(
                coinBalance,
                decimals
            )} ${coinSymbol}`,
            (amount?: BigNumber) =>
                amount
                    ? amount.shiftedBy(decimals).lte(coinBalance.toString())
                    : false
        )
        .test(
            'max-decimals',
            `The value exeeds the maximum decimals (${decimals}).`,
            (amount?: BigNumber) => {
                return amount ? amount.shiftedBy(decimals).isInteger() : false;
            }
        )
        .test(
            'gas-balance-check',
            `Insufficient ${SUI_SYMBOL} balance to cover gas fee (${formatBalance(
                gasBudget,
                gasDecimals
            )} ${SUI_SYMBOL})`,
            (amount?: BigNumber) => {
                if (!amount) {
                    return false;
                }
                try {
                    let availableGas = gasBalance;
                    if (coinType === SUI_TYPE_ARG) {
                        availableGas -= BigInt(
                            amount.shiftedBy(decimals).toString()
                        );
                    }
                    return availableGas >= gasBudget;
                } catch (e) {
                    return false;
                }
            }
        )
        .label('Amount');
}

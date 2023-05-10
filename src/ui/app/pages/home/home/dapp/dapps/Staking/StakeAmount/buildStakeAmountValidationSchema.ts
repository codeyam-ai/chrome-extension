import { SUI_TYPE_ARG } from '@mysten/sui.js';
import * as Yup from 'yup';

import ns from '_shared/namespace';
import { SUI_SYMBOL } from '_src/ui/app/redux/slices/sui-objects/Coin';

import type BigNumber from 'bignumber.js';

export interface BuildValidationSchema {
    coin?: {
        type: string | null;
        symbol: string;
        balance: bigint;
        decimals?: number;
    };
    gas?: {
        aggregateBalance: bigint;
        decimals?: number;
        budget: number;
    };
    locale: string;
}

export function buildStakeAmountValidationSchema({
    coin,
    gas,
    locale,
}: BuildValidationSchema) {
    return Yup.object().shape({
        amount: Yup.mixed()
            .transform((value, originalValue) => {
                // let v;

                // if (original.includes(',')) {
                //     v = original.replace(',', '.');
                // } else {
                //     v = original;
                // }

                // return new BigNumber(parseFloat(v));
                return ns.parse.numberString({
                    locale,
                    numberString: value as string,
                });
            })
            .test('required', `\${path} is a required field`, (value) => {
                return !!value;
            })
            .test(
                'max',
                `You have no ${coin?.symbol}. Please use the faucet to get more.`,
                () => !!coin?.balance && coin?.balance >= 0
            )
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
                `Amount must be at least 1 ${coin?.symbol}`,
                (amount?: BigNumber) => (amount ? amount.gte(1) : false)
            )
            .test(
                'max',
                `Amount must be less than ${
                    !!coin?.balance && !!coin?.decimals
                        ? ns.format.coinBalance(coin?.balance, coin?.decimals)
                        : '---'
                } ${coin?.symbol}`,
                (amount?: BigNumber) => {
                    return amount &&
                        !!coin?.balance &&
                        !!coin?.decimals &&
                        coin.balance >= 0
                        ? amount
                              .shiftedBy(coin.decimals)
                              .lte(coin.balance.toString())
                        : false;
                }
            )
            .test(
                'max-decimals',
                `The value exeeds the maximum decimals (${coin?.decimals}).`,
                (amount?: BigNumber) => {
                    return amount && !!coin?.decimals
                        ? amount.shiftedBy(coin.decimals).isInteger()
                        : false;
                }
            )
            .test(
                'gas-balance-check',
                `Insufficient ${SUI_SYMBOL} balance to cover gas fee (${
                    !!gas?.budget && !!gas?.decimals
                        ? ns.format.coinBalance(gas.budget, gas.decimals)
                        : '---'
                } ${SUI_SYMBOL})`,
                (amount?: BigNumber) => {
                    if (!amount || !gas) {
                        return false;
                    }
                    try {
                        let availableGas = gas.aggregateBalance;
                        if (
                            availableGas &&
                            !!coin?.decimals &&
                            coin.type === SUI_TYPE_ARG
                        ) {
                            availableGas -= BigInt(
                                amount.shiftedBy(coin.decimals).toString()
                            );
                        }
                        return availableGas >= gas.budget;
                    } catch (e) {
                        return false;
                    }
                }
            )
            .label('amount'),
    });
}

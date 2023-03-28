// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import { getFormattedBalance } from '../formatCoin';

import type {
    BalanceChange,
    FormattedTransaction,
} from '../transactions/types';

function isObjectOwner(value: unknown): value is { [key: string]: any } {
    return typeof value === 'object' && value !== null;
}

export const getSuiObj = (
    ownerAddr: string,
    txn: FormattedTransaction
): BalanceChange | undefined => {
    if (!txn.balanceChanges) return;

    return txn.balanceChanges.find((obj) => {
        const { owner, coinType } = obj;
        return (
            coinType === '0x2::sui::SUI' &&
            isObjectOwner(owner) &&
            (('AddressOwner' in owner && owner.AddressOwner === ownerAddr) ||
                ('ObjectOwner' in owner && owner.ObjectOwner === ownerAddr))
        );
    });
};

export const getGasFee = (txn: FormattedTransaction): number => {
    if (!txn.effects) return 0;
    const gasObj = txn.effects.gasUsed;
    const totalGasCost =
        Number(gasObj.computationCost) +
        Number(gasObj.storageCost) -
        Number(gasObj.storageRebate);
    return totalGasCost;
};

export const getFormattedGasFee = (gasFee: number): string | undefined => {
    if (gasFee) {
        return getFormattedBalance(gasFee, 9);
    }
};

export function getSuiTransferAmount(
    ownerAddr: string,
    txn: FormattedTransaction
) {
    let mistAmt = 0;

    // Get the first amount in the balanceChanges array
    if (Array(txn.balanceChanges)) {
        // locate the object containing Sui coin from the balanceChanges array
        // where the coinType = "0x2::sui::SUI" an return the amount
        const suiObj = getSuiObj(ownerAddr, txn);
        const totalGasCost = getGasFee(txn);

        // if the Sui object is found, get the amount
        if (suiObj) {
            mistAmt = parseFloat(suiObj.amount) + totalGasCost;

            if (mistAmt)
                if (!(mistAmt > 1 || mistAmt < -1)) {
                    mistAmt = 0;
                }
        }
    }

    // convert MIST to SUI where 1 SUI = 1**9 MIST
    const transferAmount = getFormattedBalance(mistAmt, 9) as string;

    return transferAmount;
}

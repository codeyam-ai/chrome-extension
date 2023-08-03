// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getHumanReadable } from '../helpers/transactions';
import analyzeTransactions from '../helpers/transactions/analyzeTransactions';
import sortUniqueTransactions from '../helpers/transactions/sortUniqueTransactions';
import { api } from '_redux/store/thunk-extras';

export const queryTransactionsByAddress = async (
    address: string,
    cursorTo?: string,
    cursorFrom?: string,
    limit?: number
) => {
    const rpc = api.instance.fullNode;

    // combine from and to transactions
    const [toBlocks, fromBlocks] = await Promise.all([
        rpc.queryTransactionBlocks({
            cursor: cursorTo,
            limit: limit,
            filter: {
                ToAddress: address || '',
            },
            options: {
                showBalanceChanges: true,
                showEffects: true,
                showEvents: true,
                showInput: true,
                showObjectChanges: true,
            },
        }),
        rpc.queryTransactionBlocks({
            cursor: cursorFrom,
            limit: limit,
            filter: {
                FromAddress: address || '',
            },
            options: {
                showBalanceChanges: true,
                showEffects: true,
                showEvents: true,
                showInput: true,
                showObjectChanges: true,
            },
        }),
    ]);

    const txBlocks = sortUniqueTransactions([
        ...toBlocks.data,
        ...fromBlocks.data,
    ]);

    const analyzedTxBlock = analyzeTransactions(address, txBlocks);

    const formattedTxBlocks = analyzedTxBlock.map((analyzedTransaction) => {
        const humanReadable = getHumanReadable(analyzedTransaction);
        return {
            analyzedTransaction: analyzedTransaction,
            humanReadable: humanReadable,
        };
    });

    return {
        blocks: formattedTxBlocks,
        toNextPageCursor: toBlocks.nextCursor,
        fromPageCursor: fromBlocks.nextCursor,
        toHasNext: toBlocks.hasNextPage,
        fromHasNext: fromBlocks.hasNextPage,
    };
};

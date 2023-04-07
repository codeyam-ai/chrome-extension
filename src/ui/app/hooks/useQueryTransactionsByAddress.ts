// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { type SuiAddress } from '@mysten/sui.js';

import { getHumanReadable } from '../helpers/transactions';
import { api } from '_redux/store/thunk-extras';

export const queryTransactionsByAddress = async (
    address: SuiAddress,
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

    const txBlocks = [...toBlocks.data, ...fromBlocks.data]
        .filter(
            (value, index, self) =>
                self.findIndex((tx) => tx.digest === value.digest) === index
        )
        .sort(
            // timestamp could be null, so we need to handle
            (a, b) => (b.timestampMs || 0) - (a.timestampMs || 0)
        );

    const formattedTxBlocks = txBlocks.map((txBlock) => {
        const humanReadable = getHumanReadable(address, txBlock);
        return {
            transaction: txBlock,
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

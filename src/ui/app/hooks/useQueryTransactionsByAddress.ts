// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { type SuiAddress } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';

import { api } from '_redux/store/thunk-extras';
import { getHumanReadable } from '../helpers/transactions';

export function useQueryTransactionsByAddress(address: SuiAddress | null) {
    const rpc = api.instance.fullNode;

    return useQuery(
        ['transactions-by-address', address],
        async () => {
            // combine from and to transactions
            const allTransactionBlocks = await Promise.all([
                rpc.queryTransactionBlocks({
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

            const txBlocks = allTransactionBlocks
                .map((transcationBlocks) => transcationBlocks.data)
                .flat()
                .map((transactionBlock) => ({
                    ...transactionBlock,
                    transactionBlock: transactionBlock.transaction,
                }))
                .filter(
                    (value, index, self) =>
                        self.findIndex((tx) => tx.digest === value.digest) ===
                        index
                )
                .sort(
                    // timestamp could be null, so we need to handle
                    (a, b) => (b.timestampMs || 0) - (a.timestampMs || 0)
                );

            const formattedTxBlocks = txBlocks.map((txBlock) => {
                const humanReadable = getHumanReadable(address || '', txBlock);
                return {
                    transaction: txBlock,
                    humanReadable: humanReadable,
                };
            });

            return formattedTxBlocks;
        },
        { enabled: !!address, staleTime: 0, cacheTime: 0 }
    );
}

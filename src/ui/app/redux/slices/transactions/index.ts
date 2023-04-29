// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    getTransactionDigest,
    // Coin as CoinAPI,
    SUI_TYPE_ARG,
    TransactionBlock,
} from '@mysten/sui.js';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { fetchAllBalances } from '../balances';
import { accountCoinsSelector } from '_redux/slices/account';
import {
    fetchAllOwnedAndRequiredObjects,
    // suiObjectsAdapterSelectors,
} from '_redux/slices/sui-objects';
import { Coin } from '_redux/slices/sui-objects/Coin';
import { getSigner } from '_src/ui/app/helpers/getSigner';

import type {
    SuiAddress,
    SuiMoveObject,
    // SuiObjectData,
    SuiTransactionBlockResponse,
} from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

type SendTokensTXArgs = {
    tokenTypeArg: string;
    amount: bigint;
    recipientAddress: SuiAddress;
};

// TODO: why alias this here?
type TransactionBlockResult = SuiTransactionBlockResponse;

export const sendTokens = createAsyncThunk<
    TransactionBlockResult | undefined,
    SendTokensTXArgs,
    AppThunkConfig
>(
    'sui-objects/send-tokens',
    async (
        { tokenTypeArg, amount, recipientAddress },
        { getState, dispatch }
    ): Promise<TransactionBlockResult | undefined> => {
        const state = getState();
        const {
            account: {
                authentication,
                address,
                activeAccountIndex,
                accountInfos,
                passphrase,
            },
        } = state;

        const signer = await getSigner(
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex
        );

        if (!signer) return;

        const allCoins: SuiMoveObject[] = accountCoinsSelector(state);
        const [primaryCoin, ...mergeCoins] = allCoins.filter(
            (coin) => coin.type === `0x2::coin::Coin<${tokenTypeArg}>`
        );

        const transactionBlock = new TransactionBlock();
        if (tokenTypeArg === SUI_TYPE_ARG) {
            const coinToTransfer = transactionBlock.splitCoins(
                transactionBlock.gas,
                [transactionBlock.pure(amount)]
            );
            transactionBlock.transferObjects(
                [coinToTransfer],
                transactionBlock.pure(recipientAddress)
            );
        } else {
            const primaryCoinInput = transactionBlock.object(
                Coin.getID(primaryCoin)
            );
            if (mergeCoins.length > 0) {
                transactionBlock.mergeCoins(
                    primaryCoinInput,
                    mergeCoins.map((mergeCoin) =>
                        transactionBlock.object(Coin.getID(mergeCoin))
                    )
                );
            }
            const coinToTransfer = transactionBlock.splitCoins(
                primaryCoinInput,
                [transactionBlock.pure(amount)]
            );
            transactionBlock.transferObjects(
                [coinToTransfer],
                transactionBlock.pure(recipientAddress)
            );
        }

        const response = await signer.signAndExecuteTransactionBlock({
            transactionBlock,
        });

        // TODO: better way to sync latest objects
        dispatch(fetchAllBalances());
        dispatch(fetchAllOwnedAndRequiredObjects());
        return response;
    }
);

export const executeMoveCall = createAsyncThunk<
    TransactionBlockResult | undefined,
    TransactionBlock,
    AppThunkConfig
>(
    'sui-objects/execute-move-call',
    async (
        moveCall,
        { getState }
    ): Promise<TransactionBlockResult | undefined> => {
        const state = getState();
        const {
            account: {
                authentication,
                address,
                activeAccountIndex,
                accountInfos,
                passphrase,
            },
        } = state;

        const signer = await getSigner(
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex
        );

        if (!signer) return;

        const response = await signer.signAndExecuteTransactionBlock({
            transactionBlock: moveCall,
        });

        return response;
    }
);

const txAdapter = createEntityAdapter<TransactionBlockResult>({
    selectId: (tx) => getTransactionDigest(tx),
});

export const txSelectors = txAdapter.getSelectors(
    (state: RootState) => state.transactions
);

const slice = createSlice({
    name: 'transactions',
    initialState: txAdapter.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendTokens.fulfilled, (state, { payload }) => {
            // This line of code was giving me "TS2589: Type instantiation is excessively deep and possibly infinite."
            // Both at runtime and in my IDE.
            // Not sure if turning off this warning is safe.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return txAdapter.setOne(state, payload);
        });
        builder.addCase(executeMoveCall.fulfilled, (state, { payload }) => {
            if (!payload) return state;
            return txAdapter.setOne(state, payload);
        });
        // builder.addCase(StakeTokens.fulfilled, (state, { payload }) => {
        //     return txAdapter.setOne(state, payload);
        // });
    },
});

export default slice.reducer;

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { getTransactionDigest, Coin as CoinAPI } from '@mysten/sui.js';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { DEFAULT_GAS_BUDGET_FOR_PAY, GAS_TYPE_ARG } from '../sui-objects/Coin';
import { accountCoinsSelector } from '_redux/slices/account';
import {
    fetchAllOwnedAndRequiredObjects,
    suiObjectsAdapterSelectors,
} from '_redux/slices/sui-objects';
import { Coin } from '_redux/slices/sui-objects/Coin';

import type {
    SuiAddress,
    SuiMoveObject,
    SuiExecuteTransactionResponse,
    MoveCallTransaction,
} from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

type SendTokensTXArgs = {
    tokenTypeArg: string;
    amount: bigint;
    recipientAddress: SuiAddress;
};

type TransactionResult = SuiExecuteTransactionResponse;

export const createGasCoin = createAsyncThunk<
    SuiAddress | undefined,
    bigint,
    AppThunkConfig
>(
    'sui-objects/create-gas-coin',
    async (
        amount,
        { getState, extra: { api, keypairVault }, dispatch }
    ): Promise<SuiAddress | undefined> => {
        const state = getState();
        const {
            account: { authentication, address, activeAccountIndex },
        } = state;

        let signer;
        if (authentication) {
            signer = api.getEthosSignerInstance(address || '', authentication);
        } else {
            signer = api.getSignerInstance(
                keypairVault.getKeyPair(activeAccountIndex)
            );
        }

        const gasPrice = await signer.provider.getReferenceGasPrice();
        const gasAmount = amount * BigInt(gasPrice);

        const coins: SuiMoveObject[] = accountCoinsSelector(state);
        const sortedCoins = coins
            .filter((coin) => Coin.isSUI(coin))
            .sort(
                (a, b) =>
                    parseInt(b.fields.balance) - parseInt(a.fields.balance)
            );

        if (sortedCoins.length === 0) return;

        if (
            sortedCoins.length === 1 ||
            BigInt(sortedCoins[0].fields.balance) >= gasAmount
        ) {
            return sortedCoins[0].fields.id.id;
        }

        try {
            const payTransaction = await CoinAPI.newPayTransaction(
                coins,
                GAS_TYPE_ARG,
                gasAmount,
                address || '',
                DEFAULT_GAS_BUDGET_FOR_PAY
            );

            const response = await signer.signAndExecuteTransaction(
                payTransaction
            );

            // TODO: better way to sync latest objects
            dispatch(fetchAllOwnedAndRequiredObjects());

            if (
                'EffectsCert' in response &&
                'effects' in response.EffectsCert
            ) {
                return response.EffectsCert.effects.effects.created?.[0]
                    ?.reference?.objectId;
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Error transferring', e);
            return;
        }

        return;
    }
);

export const sendTokens = createAsyncThunk<
    TransactionResult,
    SendTokensTXArgs,
    AppThunkConfig
>(
    'sui-objects/send-tokens',
    async (
        { tokenTypeArg, amount, recipientAddress },
        { getState, extra: { api, keypairVault }, dispatch }
    ): Promise<TransactionResult> => {
        const state = getState();
        const {
            account: { authentication, address, activeAccountIndex },
        } = state;

        let signer;
        if (authentication) {
            signer = api.getEthosSignerInstance(address || '', authentication);
        } else {
            signer = api.getSignerInstance(
                keypairVault.getKeyPair(activeAccountIndex)
            );
        }

        const coins: SuiMoveObject[] = accountCoinsSelector(state);
        const response = await signer.signAndExecuteTransaction(
            await CoinAPI.newPayTransaction(
                coins,
                tokenTypeArg,
                amount,
                recipientAddress,
                DEFAULT_GAS_BUDGET_FOR_PAY
            )
        );

        // TODO: better way to sync latest objects
        dispatch(fetchAllOwnedAndRequiredObjects());
        return response;
    }
);

export const executeMoveCall = createAsyncThunk<
    TransactionResult,
    MoveCallTransaction,
    AppThunkConfig
>(
    'sui-objects/send-tokens',
    async (
        moveCall,
        { getState, extra: { api, keypairVault }, dispatch }
    ): Promise<TransactionResult> => {
        const state = getState();
        const {
            account: { authentication, address, activeAccountIndex },
        } = state;

        let signer;
        if (authentication) {
            signer = api.getEthosSignerInstance(address || '', authentication);
        } else {
            signer = api.getSignerInstance(
                keypairVault.getKeyPair(activeAccountIndex)
            );
        }

        // console.log('moveCall.gasPayment', moveCall.gasPayment);
        // if (!moveCall.gasPayment) {
        //     const gasPrice = await signer.provider.getReferenceGasPrice();
        //     const coins: SuiMoveObject[] = accountCoinsSelector(state);
        //     const minimalSetOfCoins =
        //         CoinAPI.selectCoinSetWithCombinedBalanceGreaterThanOrEqual(
        //             coins,
        //             BigInt(moveCall.gasBudget * gasPrice)
        //         );
        //     console.log('minimalSetOfCoins', minimalSetOfCoins);
        //     if (minimalSetOfCoins.length > 1) {
        //         const response = await signer.signAndExecuteTransaction(
        //             await CoinAPI.newPayTransaction(
        //                 coins,
        //                 GAS_TYPE_ARG,
        //                 BigInt(moveCall.gasBudget * gasPrice),
        //                 address || '',
        //                 DEFAULT_GAS_BUDGET_FOR_PAY
        //             )
        //         );
        //         console.log('RESPONSE', response);
        //     }
        //     moveCall.gasPayment = CoinAPI.getID(minimalSetOfCoins[0]);
        // }

        const response = await signer.signAndExecuteTransaction({
            kind: 'moveCall',
            data: moveCall,
        });

        return response;
    }
);

type StakeTokensTXArgs = {
    tokenTypeArg: string;
    amount: bigint;
};

export const StakeTokens = createAsyncThunk<
    TransactionResult,
    StakeTokensTXArgs,
    AppThunkConfig
>(
    'sui-objects/stake',
    async (
        { tokenTypeArg, amount },
        { getState, extra: { api, keypairVault }, dispatch }
    ) => {
        const state = getState();
        const {
            account: { authentication, address, activeAccountIndex },
        } = state;

        let signer;
        if (authentication) {
            signer = api.getEthosSignerInstance(address || '', authentication);
        } else {
            signer = api.getSignerInstance(
                keypairVault.getKeyPair(activeAccountIndex)
            );
        }
        const coinType = Coin.getCoinTypeFromArg(tokenTypeArg);

        const coins: SuiMoveObject[] = suiObjectsAdapterSelectors
            .selectAll(state)
            .filter(
                (anObj) =>
                    anObj.data.dataType === 'moveObject' &&
                    anObj.data.type.startsWith(coinType)
            )
            .map(({ data }) => data as SuiMoveObject);

        // TODO: fetch the first active validator for now,
        // repalce it with the user picked one
        const activeValidators = await Coin.getActiveValidators(
            api.instance.fullNode
        );
        const first_validator = activeValidators[0];
        const metadata = (first_validator as SuiMoveObject).fields.metadata;
        const validatorAddress = (metadata as SuiMoveObject).fields.sui_address;
        const response = await Coin.stakeCoin(
            signer,
            coins,
            amount,
            validatorAddress
        );
        dispatch(fetchAllOwnedAndRequiredObjects());
        return response;
    }
);

const txAdapter = createEntityAdapter<TransactionResult>({
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
        builder.addCase(StakeTokens.fulfilled, (state, { payload }) => {
            return txAdapter.setOne(state, payload);
        });
    },
});

export default slice.reducer;

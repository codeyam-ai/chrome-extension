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

import { accountCoinsSelector } from '_redux/slices/account';
import {
    fetchAllOwnedAndRequiredObjects,
    // suiObjectsAdapterSelectors,
} from '_redux/slices/sui-objects';
import { Coin } from '_redux/slices/sui-objects/Coin';

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

// type GasCoinResponse = {
//     gasCoinObjectId?: SuiAddress;
//     error?: string;
//     totalSui?: bigint;
//     gasCost?: bigint;
// };

// export const createGasCoin = createAsyncThunk<
//     GasCoinResponse,
//     bigint,
//     AppThunkConfig
// >(
//     'sui-objects/create-gas-coin',
//     async (
//         amount,
//         { getState, extra: { api, keypairVault }, dispatch }
//     ): Promise<GasCoinResponse> => {
//         const state = getState();
//         const {
//             account: { authentication, address, activeAccountIndex },
//         } = state;

//         let signer;
//         if (authentication) {
//             signer = api.getEthosSignerInstance(address || '', authentication);
//         } else {
//             signer = api.getSignerInstance(
//                 keypairVault.getKeyPair(activeAccountIndex)
//             );
//         }

//         const gasPrice = await signer.provider.getReferenceGasPrice();
//         const gasAmount =
//             amount * BigInt(gasPrice) +
//             BigInt(DEFAULT_GAS_BUDGET_FOR_PAY * gasPrice);

//         const coins: SuiMoveObject[] = accountCoinsSelector(state);
//         const sortedCoins = coins
//             .filter((coin) => Coin.isSUI(coin))
//             .sort(
//                 (a, b) =>
//                     parseInt(b.fields.balance) - parseInt(a.fields.balance)
//             );

//         if (sortedCoins.length === 0)
//             return {
//                 error: "You don't have any Sui",
//                 totalSui: BigInt(0),
//                 gasCost: gasAmount,
//             };

//         if (
//             sortedCoins.length === 1 ||
//             BigInt(sortedCoins[0].fields.balance) >= gasAmount
//         ) {
//             return {
//                 gasCoinObjectId: sortedCoins[0].fields.id.id,
//                 totalSui: sortedCoins[0].fields.balance,
//                 gasCost: gasAmount,
//             };
//         }

//         try {
//             const payTransaction = await CoinAPI.newPayTransaction(
//                 sortedCoins,
//                 SUI_TYPE_ARG,
//                 gasAmount,
//                 address || '',
//                 DEFAULT_GAS_BUDGET_FOR_PAY + sortedCoins.length * 5
//             );

//             const response = await signer.signAndExecuteTransaction(
//                 payTransaction
//             );
//             // TODO: better way to sync latest objects
//             dispatch(fetchAllOwnedAndRequiredObjects());

//             if ('EffectsCert' in response && 'effects' in response) {
//                 const gasCoinObjectId =
//                     response.effects.created?.[0]?.reference?.objectId;
//                 return { gasCoinObjectId };
//             }
//         } catch (error) {
//             // eslint-disable-next-line no-console
//             console.log('Error transferring', error);
//             const message = (error as { message: string }).message;

//             if (message.includes('GasBalanceTooLowToCoverGasBudget')) {
//                 return {
//                     error: "You don't have enough Sui to cover the gas for this transaction.",
//                     gasCost: gasAmount,
//                 };
//             }

//             return {
//                 error: message,
//             };
//         }

//         return {
//             error: 'Unable to merge coins for gas payment',
//         };
//     }
// );

export const sendTokens = createAsyncThunk<
    TransactionBlockResult,
    SendTokensTXArgs,
    AppThunkConfig
>(
    'sui-objects/send-tokens',
    async (
        { tokenTypeArg, amount, recipientAddress },
        { getState, extra: { api, keypairVault }, dispatch }
    ): Promise<TransactionBlockResult> => {
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
        dispatch(fetchAllOwnedAndRequiredObjects());
        return response;
    }
);

export const executeMoveCall = createAsyncThunk<
    TransactionBlockResult,
    TransactionBlock,
    AppThunkConfig
>(
    'sui-objects/execute-move-call',
    async (
        moveCall,
        { getState, extra: { api, keypairVault }, dispatch }
    ): Promise<TransactionBlockResult> => {
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

        const response = await signer.signAndExecuteTransactionBlock({
            transactionBlock: moveCall,
        });

        return response;
    }
);

// type StakeTokensTXArgs = {
//     tokenTypeArg: string;
//     amount: bigint;
// };

// export const StakeTokens = createAsyncThunk<
//     TransactionResult,
//     StakeTokensTXArgs,
//     AppThunkConfig
// >(
//     'sui-objects/stake',
//     async (
//         { tokenTypeArg, amount },
//         { getState, extra: { api, keypairVault }, dispatch }
//     ) => {
//         const state = getState();
//         const {
//             account: { authentication, address, activeAccountIndex },
//         } = state;

//         let signer;
//         if (authentication) {
//             signer = api.getEthosSignerInstance(address || '', authentication);
//         } else {
//             signer = api.getSignerInstance(
//                 keypairVault.getKeyPair(activeAccountIndex)
//             );
//         }
//         const coinType = Coin.getCoinTypeFromArg(tokenTypeArg);

//         const coins: SuiObjectData[] = suiObjectsAdapterSelectors
//             .selectAll(state)
//             .filter(
//                 (anObj) =>
//                     anObj.type === 'moveObject' &&
//                     anObj.type.startsWith(coinType)
//             )
//             .map((anObj) => anObj as SuiObjectData);

//         // TODO: fetch the first active validator for now,
//         // repalce it with the user picked one
//         const activeValidators = await Coin.getActiveValidators(
//             api.instance.fullNode
//         );
//         const first_validator = activeValidators[0];
//         const metadata = (first_validator as SuiMoveObject).fields.metadata;
//         const validatorAddress = (metadata as SuiMoveObject).fields.suix_address;
//         const response = await Coin.stakeCoin(
//             signer,
//             coins,
//             amount,
//             validatorAddress
//         );
//         dispatch(fetchAllOwnedAndRequiredObjects());
//         return response;
//     }
// );

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
            return txAdapter.setOne(state, payload);
        });
        // builder.addCase(StakeTokens.fulfilled, (state, { payload }) => {
        //     return txAdapter.setOne(state, payload);
        // });
    },
});

export default slice.reducer;

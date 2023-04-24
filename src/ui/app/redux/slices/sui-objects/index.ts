// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    getExecutionStatusType,
    getObjectId,
    getTimestampFromTransactionResponse,
    getTotalGasUsed,
    getTransactionDigest,
    getObjectVersion,
    TransactionBlock,
    getSuiObjectData,
} from '@mysten/sui.js';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { SUI_SYSTEM_STATE_OBJECT_ID } from './Coin';

import type { SuiAddress, ObjectId, SuiObjectData } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

const objectsAdapter = createEntityAdapter<SuiObjectData>({
    selectId: (info) => info.objectId,
    sortComparer: (a, b) => a.objectId.localeCompare(b.objectId),
});

export const fetchAllOwnedAndRequiredObjects = createAsyncThunk<
    SuiObjectData[],
    void,
    AppThunkConfig
>('sui-objects/fetch-all', async (_, { getState, extra: { api } }) => {
    const state = getState();
    const {
        account: { address },
    } = state;
    const allSuiObjects: SuiObjectData[] = [];
    if (address) {
        const allObjectRefs = await api.instance.fullNode.getOwnedObjects({
            owner: address,
        });

        const objectIDs = allObjectRefs.data
            .filter((anObj) => {
                const fetchedVersion = getObjectVersion(anObj);
                const storedObj = suiObjectsAdapterSelectors.selectById(
                    state,
                    getObjectId(anObj)
                );
                const storedVersion = storedObj
                    ? getObjectVersion(storedObj)
                    : null;
                const objOutdated = fetchedVersion !== storedVersion;
                if (!objOutdated && storedObj) {
                    allSuiObjects.push(storedObj);
                }
                return objOutdated;
            })
            .map((anObj) => {
                if (
                    typeof anObj.data === 'object' &&
                    'objectId' in anObj.data
                ) {
                    return anObj.data.objectId;
                } else {
                    return '';
                }
            })
            .filter((objId) => objId.length > 0);

        const allObjRes = await api.instance.fullNode.multiGetObjects({
            ids: objectIDs,
            options: {
                showOwner: true,
                showContent: true,
                showType: true,
                showDisplay: true,
            },
        });
        for (const objRes of allObjRes) {
            const suiObjectData = getSuiObjectData(objRes);
            if (suiObjectData) {
                // if (
                //     suiObjectData.owner &&
                //     typeof suiObjectData.owner === 'object' &&
                //     'AddressOwner' in suiObjectData.owner
                // ) {
                //     suiObjectData.owner.AddressOwner = address;
                // }
                allSuiObjects.push(suiObjectData);
            }
        }
    }

    return allSuiObjects;
});

type NFTTxResponse = {
    timestamp_ms?: number;
    status?: string;
    gasFee?: string;
    txId?: string;
};

export const transferNFT = createAsyncThunk<
    NFTTxResponse,
    { nftId: ObjectId; recipientAddress: SuiAddress; transferCost: number },
    AppThunkConfig
>(
    'transferNFT',
    async (data, { extra: { api, keypairVault }, getState, dispatch }) => {
        const {
            account: { activeAccountIndex, authentication, address },
        } = getState();
        let signer;
        if (authentication) {
            signer = api.getEthosSignerInstance(address || '', authentication);
        } else {
            signer = api.getSignerInstance(
                keypairVault.getKeyPair(activeAccountIndex)
            );
        }
        const transactionBlock = new TransactionBlock();
        transactionBlock.add(
            TransactionBlock.Transactions.TransferObjects(
                [transactionBlock.object(data.nftId)],
                transactionBlock.pure(data.recipientAddress)
            )
        );
        const executedTransaction = await signer.signAndExecuteTransactionBlock(
            {
                transactionBlock,
                options: {
                    showEffects: true,
                    showEvents: true,
                    showInput: true,
                },
            }
        );

        await dispatch(fetchAllOwnedAndRequiredObjects());
        const txnResp = {
            timestamp_ms:
                getTimestampFromTransactionResponse(executedTransaction),
            status: getExecutionStatusType(executedTransaction),
            gasFee: executedTransaction
                ? getTotalGasUsed(executedTransaction)?.toString()
                : '0',
            txId: getTransactionDigest(executedTransaction),
        };

        return txnResp as NFTTxResponse;
    }
);
interface SuiObjectsManualState {
    loading: boolean;
    error: false | { code?: string; message?: string; name?: string };
    lastSync: number | null;
}
const initialState = objectsAdapter.getInitialState<SuiObjectsManualState>({
    loading: true,
    error: false,
    lastSync: null,
});

const slice = createSlice({
    name: 'sui-objects',
    initialState: initialState,
    reducers: {
        clearForNetworkOrWalletSwitch: (state) => {
            state.error = false;
            state.lastSync = null;
            state.loading = true;
            objectsAdapter.removeAll(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchAllOwnedAndRequiredObjects.fulfilled,
                (state, action) => {
                    if (action.payload) {
                        objectsAdapter.setAll(state, action.payload);
                        state.loading = false;
                        state.error = false;
                        state.lastSync = Date.now();
                    }
                }
            )
            .addCase(
                fetchAllOwnedAndRequiredObjects.pending,
                (state, action) => {
                    state.loading = true;
                }
            )
            .addCase(
                fetchAllOwnedAndRequiredObjects.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loading = false;
                    state.error = { code, message, name };
                }
            );
    },
});

export default slice.reducer;

export const { clearForNetworkOrWalletSwitch } = slice.actions;

export const suiObjectsAdapterSelectors = objectsAdapter.getSelectors(
    (state: RootState) => state.suiObjects
);

export const suiSystemObjectSelector = (state: RootState) =>
    suiObjectsAdapterSelectors.selectById(state, SUI_SYSTEM_STATE_OBJECT_ID);

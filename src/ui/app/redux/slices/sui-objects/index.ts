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
import { NFT } from './NFT';
import { fetchAllBalances } from '../balances';
import { getSigner } from '_src/ui/app/helpers/getSigner';
import transferObjectTransactionBlock from '_src/ui/app/helpers/transferObjectTransactionBlock';

import type {
    SuiAddress,
    ObjectId,
    SuiObjectData,
    PaginatedObjectsResponse,
    SuiObjectResponse,
} from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

export interface ExtendedSuiObjectData extends SuiObjectData {
    kiosk?: SuiObjectData;
}

const objectsAdapter = createEntityAdapter<ExtendedSuiObjectData>({
    selectId: (info) => info.objectId,
    sortComparer: (a, b) => a.objectId.localeCompare(b.objectId),
});

export const fetchAllOwnedAndRequiredObjects = createAsyncThunk<
    ExtendedSuiObjectData[],
    void,
    AppThunkConfig
>('sui-objects/fetch-all', async (_, { getState, extra: { api } }) => {
    const state = getState();

    if (!state.balances.lastSync) {
        try {
            const response = await fetch(
                api.instance.fullNode.connection.fullnode,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        id: 1,
                        method: 'rpc.discover',
                    }),
                }
            );

            if (response.status !== 200) {
                throw new Error('RPC not responding');
            }
        } catch (e) {
            throw new Error('RPC not responding');
        }
    }

    const {
        account: { address },
    } = state;
    const allSuiObjects: ExtendedSuiObjectData[] = [];
    if (address) {
        let allObjRes: SuiObjectResponse[] = [];
        let nextCursor: PaginatedObjectsResponse['nextCursor'] | undefined;
        let page = 0;
        while (nextCursor !== null) {
            page += 1;
            const allObjectRefs = await api.instance.fullNode.getOwnedObjects({
                owner: address,
                cursor: nextCursor,
            });

            if (page > 20) {
                nextCursor = null;
            } else {
                if (allObjectRefs.hasNextPage) {
                    nextCursor = allObjectRefs.nextCursor;
                } else {
                    nextCursor = null;
                }
            }

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

            const newObjRes = await api.instance.fullNode.multiGetObjects({
                ids: objectIDs,
                options: {
                    showOwner: true,
                    showContent: true,
                    showType: true,
                    showDisplay: true,
                },
            });

            allObjRes = [...allObjRes, ...newObjRes];
        }

        for (const objRes of allObjRes) {
            const suiObjectData = getSuiObjectData(objRes);
            if (suiObjectData) {
                if (NFT.isKiosk(suiObjectData)) {
                    const kioskObjects = await NFT.getKioskObjects(
                        api.instance.fullNode,
                        suiObjectData
                    );

                    for (const kioskObject of kioskObjects) {
                        const kioskObjectData = getSuiObjectData(kioskObject);
                        if (kioskObjectData) {
                            allSuiObjects.push({
                                kiosk: suiObjectData,
                                ...kioskObjectData,
                            });
                        }
                    }
                } else {
                    allSuiObjects.push(suiObjectData);
                }
            }
        }

        // for (const o of allSuiObjects) {
        //     if (
        //         o.owner &&
        //         typeof o.owner === 'object' &&
        //         'AddressOwner' in o.owner
        //     ) {
        //         o.owner.AddressOwner = address;
        //     }
        // }
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
    NFTTxResponse | undefined,
    { nftId: ObjectId; recipientAddress: SuiAddress; transferCost: number },
    AppThunkConfig
>('transferNFT', async (data, { getState, dispatch, extra: { api } }) => {
    const {
        account: {
            activeAccountIndex,
            authentication,
            address,
            accountInfos,
            passphrase,
        },
        suiObjects: { entities },
    } = getState();

    const nft = entities[data.nftId];

    if (!nft) return;

    const signer = await getSigner(
        passphrase,
        accountInfos,
        address,
        authentication,
        activeAccountIndex
    );

    if (!signer) return;

    let transactionBlock: TransactionBlock | null = new TransactionBlock();

    transactionBlock = await transferObjectTransactionBlock(
        transactionBlock,
        nft,
        data.recipientAddress,
        api.instance.fullNode
    );

    if (!transactionBlock) return;

    const executedTransaction = await signer.signAndExecuteTransactionBlock({
        transactionBlock,
        options: {
            showEffects: true,
            showEvents: true,
            showInput: true,
        },
    });

    dispatch(fetchAllBalances());
    await dispatch(fetchAllOwnedAndRequiredObjects());
    const txnResp = {
        timestamp_ms: getTimestampFromTransactionResponse(executedTransaction),
        status: getExecutionStatusType(executedTransaction),
        gasFee: executedTransaction
            ? getTotalGasUsed(executedTransaction)?.toString()
            : '0',
        txId: getTransactionDigest(executedTransaction),
    };

    return txnResp as NFTTxResponse;
});
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

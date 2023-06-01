// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    getObjectId,
    getObjectVersion,
    getSuiObjectData,
} from '@mysten/sui.js';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { SUI_SYSTEM_STATE_OBJECT_ID } from './Coin';
import { NFT } from './NFT';
import testConnection from '../../testConnection';

import type {
    // SuiAddress,
    // ObjectId,
    SuiObjectData,
    PaginatedObjectsResponse,
    SuiObjectResponse,
} from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

export interface ExtendedSuiObjectData extends SuiObjectData {
    kiosk?: SuiObjectData;
    kioskLoaded?: boolean;
}

const objectsAdapter = createEntityAdapter<ExtendedSuiObjectData>({
    selectId: (info) => info.objectId,
    sortComparer: (a, b) => a.objectId.localeCompare(b.objectId),
});

export const fetchAllOwnedAndRequiredObjects = createAsyncThunk<
    {
        suiObjects: ExtendedSuiObjectData[];
        cursor?: PaginatedObjectsResponse['nextCursor'];
    } | null,
    { cursor: PaginatedObjectsResponse['nextCursor'] } | undefined,
    AppThunkConfig
>('sui-objects/fetch-all', async (data, { getState, extra: { api } }) => {
    const state = getState();

    if (!state.suiObjects.lastSync) {
        await testConnection(api);
    }

    const {
        account: { address },
    } = state;

    if (!address) {
        return null;
    }

    let cursor = data?.cursor;
    const suiObjects: ExtendedSuiObjectData[] = [];
    if (address) {
        let allObjRes: SuiObjectResponse[] = [];
        let objectsRefPage = 0;
        while (cursor !== null) {
            objectsRefPage += 1;
            const allObjectRefs = await api.instance.fullNode.getOwnedObjects({
                owner: '0x174d523be66c291225bb1c9c283aed9aeb9e7ae737e616ffe3b723919c749333',
                cursor,
            });

            if (objectsRefPage > 10) {
                cursor = null;
            } else {
                if (
                    allObjectRefs.hasNextPage &&
                    cursor !== allObjectRefs.nextCursor
                ) {
                    cursor = allObjectRefs.nextCursor;
                } else {
                    cursor = null;
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
                        suiObjects.push(storedObj);
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

        let kioskObjectsLoaded = 0;
        for (const objRes of allObjRes) {
            const suiObjectData = getSuiObjectData(objRes);

            if (suiObjectData) {
                if (NFT.isKiosk(suiObjectData) && kioskObjectsLoaded < 10) {
                    (suiObjectData as ExtendedSuiObjectData).kioskLoaded = true;
                    const kioskObjects = await NFT.getKioskObjects(
                        api.instance.fullNode,
                        suiObjectData
                    );

                    for (const kioskObject of kioskObjects) {
                        const kioskObjectData = getSuiObjectData(kioskObject);
                        if (kioskObjectData) {
                            suiObjects.push({
                                kiosk: suiObjectData,
                                ...kioskObjectData,
                            });
                        }
                        kioskObjectsLoaded += 1;
                    }
                } else {
                    suiObjects.push(suiObjectData);
                }
            }
        }

        for (const o of suiObjects) {
            if (
                o.owner &&
                typeof o.owner === 'object' &&
                'AddressOwner' in o.owner
            ) {
                o.owner.AddressOwner = address;
            }
        }
    }

    return { suiObjects, cursor };
});

// type NFTTxResponse = {
//     timestamp_ms?: number;
//     status?: string;
//     gasFee?: string;
//     txId?: string;
// };

// export const transferNFT = createAsyncThunk<
//     NFTTxResponse | undefined,
//     { nftId: ObjectId; recipientAddress: SuiAddress; transferCost: number },
//     AppThunkConfig
// >('transferNFT', async (data, { getState, dispatch, extra: { api } }) => {
//     const {
//         account: {
//             activeAccountIndex,
//             authentication,
//             address,
//             accountInfos,
//             passphrase,
//         },
//         suiObjects: { entities },
//     } = getState();

//     const nft = entities[data.nftId];

//     if (!nft) return;

//     const signer = await getSigner(
//         passphrase,
//         accountInfos,
//         address,
//         authentication,
//         activeAccountIndex
//     );

//     if (!signer) return;

//     let transactionBlock: TransactionBlock | null = new TransactionBlock();

//     transactionBlock = await transferObjectTransactionBlock(
//         transactionBlock,
//         nft,
//         data.recipientAddress,
//         api.instance.fullNode
//     );

//     if (!transactionBlock) return;

//     const executedTransaction = await signer.signAndExecuteTransactionBlock({
//         transactionBlock,
//         options: {
//             showEffects: true,
//             showEvents: true,
//             showInput: true,
//         },
//     });

//     dispatch(fetchAllBalances());
//     await dispatch(fetchAllOwnedAndRequiredObjects());
//     const txnResp = {
//         timestamp_ms: getTimestampFromTransactionResponse(executedTransaction),
//         status: getExecutionStatusType(executedTransaction),
//         gasFee: executedTransaction
//             ? getTotalGasUsed(executedTransaction)?.toString()
//             : '0',
//         txId: getTransactionDigest(executedTransaction),
//     };

//     return txnResp as NFTTxResponse;
// });

interface SuiObjectsManualState {
    loading: boolean;
    error: false | { code?: string; message?: string; name?: string };
    lastSync: number | null;
    cursor?: PaginatedObjectsResponse['nextCursor'];
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
                        objectsAdapter.setAll(state, action.payload.suiObjects);
                        state.cursor = action.payload.cursor;
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

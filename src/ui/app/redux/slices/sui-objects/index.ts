// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit';

import { SUI_SYSTEM_STATE_OBJECT_ID } from './Coin';
import { NFT } from './NFT';
import testConnection from '../../testConnection';
import utils from '_src/ui/app/helpers/utils';

import type {
    PaginatedObjectsResponse,
    SuiObjectData,
    SuiObjectResponse,
} from '@mysten/sui.js/client';
import type { RootState } from '_redux/RootReducer';
import type { AppThunkConfig } from '_store/thunk-extras';

export interface ExtendedSuiObjectData extends SuiObjectData {
    index: number;
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
        kiosksPending: boolean;
        cursor?: PaginatedObjectsResponse['nextCursor'];
    } | null,
    void,
    AppThunkConfig
>('sui-objects/fetch-all', async (_, { getState, extra: { api } }) => {
    const state = getState();

    const {
        account: { address },
        suiObjects: { lastSync },
    } = state;

    if (!address) {
        return null;
    }

    if (!lastSync) {
        await testConnection(api);
    }

    let objectResponses: SuiObjectResponse[] = [];
    let nextCursor: PaginatedObjectsResponse['nextCursor'] | undefined;
    let cursor: PaginatedObjectsResponse['nextCursor'] | undefined;
    let kiosksPending = state.suiObjects.kiosksPending;
    const suiObjects: ExtendedSuiObjectData[] = [];
    if (address) {
        let objectsRefPage = 0;
        while (nextCursor !== null) {
            objectsRefPage += 1;
            const allObjectRefs = await api.instance.client.getOwnedObjects({
                owner: address,
                cursor,
            });

            cursor = allObjectRefs.nextCursor;

            if (objectsRefPage > 10) {
                nextCursor = null;
            } else {
                if (allObjectRefs.hasNextPage && nextCursor !== cursor) {
                    nextCursor = cursor;
                } else {
                    nextCursor = null;
                }
            }

            const objectIDs = allObjectRefs.data
                .filter((anObj) => {
                    const fetchedVersion = utils.getObjectVersion(anObj);
                    const storedObj = suiObjectsAdapterSelectors.selectById(
                        state,
                        utils.getObjectId(anObj)
                    );
                    const storedVersion = storedObj
                        ? utils.getObjectVersion(storedObj)
                        : null;
                    const objOutdated = fetchedVersion !== storedVersion;
                    if (!objOutdated && storedObj) {
                        suiObjects.push(storedObj);
                    }
                    return objOutdated;
                })
                .map((anObj) => {
                    if (
                        anObj.data &&
                        typeof anObj.data === 'object' &&
                        'objectId' in anObj.data
                    ) {
                        return anObj.data.objectId;
                    } else {
                        return '';
                    }
                })
                .filter((objId) => objId.length > 0);

            const newObjRes = await api.instance.client.multiGetObjects({
                ids: objectIDs,
                options: {
                    showOwner: true,
                    showContent: true,
                    showType: true,
                    showDisplay: true,
                },
            });

            objectResponses = [...objectResponses, ...newObjRes];
        }

        let objectIndex = 0;
        let kioskObjectsLoaded = 0;
        for (const objRes of objectResponses) {
            const suiObjectData = objRes.data;

            if (suiObjectData) {
                if (NFT.isKiosk(suiObjectData)) {
                    if (kioskObjectsLoaded < 10) {
                        const kioskObjects = await NFT.getKioskObjects(
                            api.instance.client,
                            suiObjectData
                        );

                        for (const kioskObject of kioskObjects) {
                            const kioskObjectData = kioskObject.data;
                            if (kioskObjectData) {
                                suiObjects.push({
                                    index: objectIndex,
                                    kiosk: suiObjectData,
                                    ...kioskObjectData,
                                });
                            }
                            kioskObjectsLoaded += 1;
                        }

                        suiObjects.push({
                            index: objectIndex,
                            kioskLoaded: true,
                            ...suiObjectData,
                        });
                    } else {
                        suiObjects.push({
                            index: objectIndex,
                            ...suiObjectData,
                        });
                        kiosksPending = true;
                    }
                } else {
                    suiObjects.push({
                        index: objectIndex,
                        ...suiObjectData,
                    });
                }
            }

            objectIndex += 1;
        }

        // for (const o of suiObjects) {
        //     if (
        //         o.owner &&
        //         typeof o.owner === 'object' &&
        //         'AddressOwner' in o.owner
        //     ) {
        //         o.owner.AddressOwner = address;
        //     }
        // }
    }

    return { suiObjects, kiosksPending, cursor };
});

export const fetchMoreObjects = createAsyncThunk<
    {
        newSuiObjects: ExtendedSuiObjectData[];
        kiosksPending: boolean;
        cursor?: PaginatedObjectsResponse['nextCursor'];
    } | null,
    void,
    AppThunkConfig
>('sui-objects/fetch-more', async (_, { getState, extra: { api } }) => {
    const { suiObjects } = getState();

    const suiObjectDatas = objectsAdapter.getSelectors().selectAll(suiObjects);
    const newSuiObjects: ExtendedSuiObjectData[] = [];
    let objectIndex = suiObjectDatas.length;
    let kiosksPending = true;
    let kioskObjectsLoaded = 0;
    if (suiObjects.kiosksPending) {
        for (const suiObjectData of suiObjectDatas) {
            if (!NFT.isKiosk(suiObjectData) || suiObjectData.kioskLoaded) {
                continue;
            }

            if (kioskObjectsLoaded >= 10) {
                kiosksPending = true;
                break;
            }

            const kioskObjects = await NFT.getKioskObjects(
                api.instance.client,
                suiObjectData
            );

            for (const kioskObject of kioskObjects) {
                const kioskObjectData = kioskObject.data;
                if (kioskObjectData) {
                    newSuiObjects.push({
                        kiosk: suiObjectData,
                        index: objectIndex,
                        ...kioskObjectData,
                    });
                }
                kioskObjectsLoaded += 1;
            }

            newSuiObjects.push({
                kioskLoaded: true,
                ...suiObjectData,
            });

            objectIndex += 1;
        }
    }

    return { newSuiObjects, kiosksPending };
});

interface SuiObjectsManualState {
    loading: boolean;
    loadingMore: boolean;
    error: false | { code?: string; message?: string; name?: string };
    lastSync: number | null;
    cursor?: PaginatedObjectsResponse['nextCursor'];
    kiosksPending: boolean;
    objectResponses: SuiObjectResponse[];
}
const initialState = objectsAdapter.getInitialState<SuiObjectsManualState>({
    loading: true,
    loadingMore: false,
    error: false,
    lastSync: null,
    kiosksPending: false,
    objectResponses: [],
});

// This is probably dangerous and should be removed as soon a possible
// The error is: Type instantiation is excessively deep and possibly infinite.ts(2589)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Not sure how to fix this
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
        removeObject: objectsAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchAllOwnedAndRequiredObjects.fulfilled,
                (state, action) => {
                    if (action.payload) {
                        objectsAdapter.upsertMany(
                            state,
                            action.payload.suiObjects
                        );
                        state.cursor = action.payload.cursor;
                        state.kiosksPending = action.payload.kiosksPending;
                        state.loading = false;
                        state.error = false;
                        state.lastSync = Date.now();
                    }
                }
            )
            .addCase(fetchAllOwnedAndRequiredObjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchAllOwnedAndRequiredObjects.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loading = false;
                    state.error = { code, message, name };
                }
            )
            .addCase(fetchMoreObjects.pending, (state) => {
                state.loadingMore = true;
            })
            .addCase(fetchMoreObjects.fulfilled, (state, action) => {
                if (action.payload) {
                    objectsAdapter.upsertMany(
                        state,
                        action.payload.newSuiObjects
                    );
                    // state.cursor = action.payload.cursor;
                    state.kiosksPending = action.payload.kiosksPending;
                    state.loadingMore = false;
                }
            })
            .addCase(
                fetchMoreObjects.rejected,
                (state, { error: { code, name, message } }) => {
                    state.loadingMore = false;
                    state.error = { code, message, name };
                }
            );
    },
});

export default slice.reducer;

export const { clearForNetworkOrWalletSwitch, removeObject } = slice.actions;

export const suiObjectsAdapterSelectors = objectsAdapter.getSelectors(
    (state: RootState) => state.suiObjects
);

export const suiSystemObjectSelector = (state: RootState) =>
    suiObjectsAdapterSelectors.selectById(state, SUI_SYSTEM_STATE_OBJECT_ID);

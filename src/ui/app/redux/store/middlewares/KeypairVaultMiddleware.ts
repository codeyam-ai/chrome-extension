// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isAnyOf } from '@reduxjs/toolkit';

import {
    loadAccountInformationFromStorage,
    setMnemonic,
    setAddress,
} from '_redux/slices/account';
import { thunkExtras } from '_store/thunk-extras';

import type { Middleware } from '@reduxjs/toolkit';

const matchUpdateMnemonic = isAnyOf(
    loadAccountInformationFromStorage.fulfilled,
    setMnemonic
);

export const KeypairVaultMiddleware: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        if (matchUpdateMnemonic(action)) {
            if (action.payload) {
                const mnemonic =
                    typeof action.payload === 'string'
                        ? action.payload
                        : action.payload.mnemonic;
                if (mnemonic) {
                    thunkExtras.keypairVault.mnemonic = mnemonic;
                    dispatch(setAddress(thunkExtras.keypairVault.getAddress()));
                }
            }
        }
        return next(action);
    };

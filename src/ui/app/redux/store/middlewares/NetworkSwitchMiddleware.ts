// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { isAnyOf } from '@reduxjs/toolkit';

import { changeRPCNetwork } from '_redux/slices/app';
import { clearForNetworkOrWalletSwitch as clearBalancesForNetworkOrWalletSwitch } from '_redux/slices/balances';
import { clearForNetworkOrWalletSwitch as clearTokensForNetworkOrWalletSwitch } from '_redux/slices/sui-objects';

import type { Middleware } from '@reduxjs/toolkit';

const isChangeNetwork = isAnyOf(changeRPCNetwork.pending);

export const NetworkSwitchMiddleware: Middleware =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (isChangeNetwork(action)) {
            await dispatch(clearBalancesForNetworkOrWalletSwitch());
            await dispatch(clearTokensForNetworkOrWalletSwitch());
        }
        return next(action);
    };

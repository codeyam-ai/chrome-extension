// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { DAppInterface } from './DAppInterface';

Object.defineProperty(window, 'ethosWallet', {
    enumerable: false,
    configurable: false,
    value: new DAppInterface(),
});

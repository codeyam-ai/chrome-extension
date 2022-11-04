// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { registerWallet } from '@mysten/wallet-standard';

import { DAppInterface } from './DAppInterface';
import { EthosWallet } from './WalletStandardInterface';

registerWallet(new EthosWallet());

Object.defineProperty(window, 'ethosWallet', {
    enumerable: false,
    configurable: false,
    value: new DAppInterface(),
});

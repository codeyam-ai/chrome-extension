// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export const BASE_URL = process.env.ETHOS_BASE_URL || 'http://localhost:3000';
export const SECURE_URL =
    process.env.ETHOS_SECURE_URL || 'http://localhost:3000';
export const LINK_URL = BASE_URL;

// const queryParamFrom = '?from=ethos-extension';

export const ToS_LINK = BASE_URL + '/terms-of-service';
export const DASHBOARD_LINK = LINK_URL + '/dashboard'; // + queryParamFrom;
export const IFRAME_URL =
    BASE_URL + '/wallet?apiKey=' + process.env.ETHOS_API_KEY;
export const DASHBOARD_COLLECTIBLES = BASE_URL + '/dashboard/collectibles';
export const LOGIN_URL = BASE_URL + '/logged_in';
export const MAILTO_SUPPORT_URL = 'mailto:support@ethoswallet.xyz';
export const TWITTER_URL = 'https://twitter.com/EthosWalletXYZ';
export const DISCORD_URL = 'https://discord.gg/ethoswallet';

export const MIST_PER_SUI = 1000000000;

export const PASSPHRASE_TEST = 'PASSPHRASE_TEST';
export const MNEMONIC_TEST = 'MNEMONIC_TEST';
export const TX_STORE_KEY = 'transactions';
export const PREAPPROVAL_KEY = 'preapprovals';
export const AUTO_LOCK_TIMEOUT_KEY = 'autoLockTimeout';
export const DEFAULT_AUTO_LOCK_TIMEOUT_IN_MINUTES = 15;

export const BIOMETRIC_DISCLAIMER =
    'Your privacy is important. Ethos never tracks, handles, or stores your biometric data.';

export const NUM_OF_EPOCH_BEFORE_EARNING = 2;

export enum AccountType {
    EMAIL = 'EMAIL',
    PASSWORD = 'PASSWORD',
    UNINITIALIZED = 'UNINITIALIZED',
}

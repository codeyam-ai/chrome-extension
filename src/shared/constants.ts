// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

export const BASE_URL = process.env.ETHOS_BASE_URL || 'http://localhost:3000';
export const LINK_URL = process.env.ETHOS_BETA_URL || BASE_URL;

// const queryParamFrom = '?from=ethos-extension';

export const ToS_LINK = BASE_URL + '/terms';
export const DASHBOARD_LINK = LINK_URL + '/dashboard'; // + queryParamFrom;
export const IFRAME_URL = BASE_URL + '/wallet?appId=ethos';
export const NFT_EXPERIMENT_LINK = BASE_URL + '/dashboard/experiment'; //+ queryParamFrom;
export const LOGIN_URL = BASE_URL + '/logged_in';
export const MAILTO_SUPPORT_URL = 'mailto:support@ethoswallet.xyz';
export const TWITTER_URL = 'https://twitter.com/EthosWalletXYZ';

export const MIST_PER_SUI = 1000000000;

export const WALLET_LOCK_TIMEOUT_MS = 15 * 60000;

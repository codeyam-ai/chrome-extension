// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { API_ENV, DEFAULT_API_ENV } from '_app/ApiProvider';

import type { ObjectId, SuiAddress, TransactionDigest } from '@mysten/sui.js';

const API_ENV_TO_EXPLORER_URL: Record<API_ENV, string | undefined> = {
    [API_ENV.local]: process.env.EXPLORER_URL_LOCAL,
    [API_ENV.devNet]: process.env.EXPLORER_URL_DEVNET,
    [API_ENV.testNet]: process.env.EXPLORER_URL_TESTNET,
    [API_ENV.mainNet]: process.env.EXPLORER_URL_MAINNET,
    //No explorer url for Custom PRC
    [API_ENV.customRPC]: undefined,
};

const API_ENV_TO_EXPLORER_QUERY_PARAM: Record<API_ENV, string | undefined> = {
    [API_ENV.local]: undefined,
    [API_ENV.devNet]: process.env.EXPLORER_PARAM_DEVNET,
    [API_ENV.testNet]: process.env.EXPLORER_PARAM_TESTNET,
    [API_ENV.mainNet]: undefined,
    [API_ENV.customRPC]: undefined,
};

// TODO: rewrite this
function getDefaultUrl(apiEnv?: API_ENV) {
    let url = API_ENV_TO_EXPLORER_URL[apiEnv || DEFAULT_API_ENV];
    if (!url) {
        url = API_ENV_TO_EXPLORER_URL[DEFAULT_API_ENV];
    }
    return url;
}

export class Explorer {
    public static getObjectUrl(objectID: ObjectId, apiEnv: API_ENV) {
        const url = new URL(`/objects/${objectID}`, getDefaultUrl(apiEnv));
        const queryParam = API_ENV_TO_EXPLORER_QUERY_PARAM[apiEnv];
        if (queryParam) {
            url.searchParams.set('network', queryParam);
        }
        return url.href;
    }

    public static getTransactionUrl(
        txDigest: TransactionDigest,
        apiEnv: API_ENV
    ) {
        const url = new URL(
            `/transactions/${encodeURIComponent(txDigest)}`,
            getDefaultUrl(apiEnv)
        );
        const queryParam = API_ENV_TO_EXPLORER_QUERY_PARAM[apiEnv];
        if (queryParam) {
            url.searchParams.set('network', queryParam);
        }
        return url.href;
    }

    public static getAddressUrl(address: SuiAddress, apiEnv: API_ENV) {
        const url = new URL(`/addresses/${address}`, getDefaultUrl(apiEnv));
        const queryParam = API_ENV_TO_EXPLORER_QUERY_PARAM[apiEnv];
        if (queryParam) {
            url.searchParams.set('network', queryParam);
        }
        return url.href;
    }
}

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    RawSigner,
    JsonRpcProvider,
    LocalTxnDataSerializer,
} from '@mysten/sui.js';
import Browser from 'webextension-polyfill';

import { growthbook } from './experimentation/feature-gating';
import { FEATURES } from './experimentation/features';
import { queryClient } from './helpers/queryClient';
import { EthosSigner } from '_src/shared/cryptography/EthosSigner';

import type { Keypair, SuiAddress } from '@mysten/sui.js';

export enum API_ENV {
    local = 'local',
    devNet = 'devNet',
    testNet = 'testNet',
    customRPC = 'customRPC',
}

type EnvInfo = {
    name: string;
};

type ApiEndpoints = {
    fullNode: string;
    faucet: string;
} | null;
export const API_ENV_TO_INFO: Record<API_ENV, EnvInfo> = {
    [API_ENV.local]: { name: 'Local' },
    [API_ENV.devNet]: { name: 'Devnet' },
    [API_ENV.customRPC]: { name: 'Custom RPC URL' },
    [API_ENV.testNet]: { name: 'Testnet' },
};

export const ENV_TO_API: Record<string, ApiEndpoints> = {
    [API_ENV.local.toString()]: {
        fullNode: process.env.API_ENDPOINT_LOCAL_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_LOCAL_FAUCET || '',
    },
    [API_ENV.devNet.toString()]: {
        fullNode: process.env.API_ENDPOINT_DEV_NET_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_DEV_NET_FAUCET || '',
    },
    [API_ENV.customRPC.toString()]: null,
    [API_ENV.testNet.toString()]: {
        fullNode: process.env.API_ENDPOINT_TEST_NET_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_TEST_NET_FAUCET || '',
    },
};

function getDefaultApiEnv() {
    const apiEnv = growthbook.getFeatureValue(
        'default-api-env',
        API_ENV.devNet
    );
    if (apiEnv && !Object.keys(API_ENV).includes(apiEnv)) {
        throw new Error(`Unknown environment variable API_ENV, ${apiEnv}`);
    }
    return apiEnv ? API_ENV[apiEnv as keyof typeof API_ENV] : API_ENV.devNet;
}

function getDefaultAPI(env: API_ENV) {
    const dynamicApiEnvs = growthbook.getFeatureValue(
        'api-endpoints',
        ENV_TO_API
    );

    const mergedApiEnvs = ENV_TO_API;
    for (const env of Object.keys(dynamicApiEnvs)) {
        mergedApiEnvs[env] = {
            fullNode: '',
            faucet: '',
            ...mergedApiEnvs[env],
            ...dynamicApiEnvs[env],
        };
    }

    const apiEndpoint = mergedApiEnvs[env];

    if (
        !apiEndpoint ||
        apiEndpoint.fullNode === '' ||
        apiEndpoint.faucet === ''
    ) {
        throw new Error(`API endpoint not found for API_ENV ${env}`);
    }
    return apiEndpoint;
}

export const DEFAULT_API_ENV = getDefaultApiEnv();

type NetworkTypes = keyof typeof API_ENV;

export const generateActiveNetworkList = (): NetworkTypes[] => {
    const excludedNetworks: NetworkTypes[] = [];

    if (!growthbook.isOn(FEATURES.USE_TEST_NET_ENDPOINT)) {
        excludedNetworks.push(API_ENV.testNet);
    }

    if (!growthbook.isOn(FEATURES.USE_CUSTOM_RPC_URL)) {
        excludedNetworks.push(API_ENV.customRPC);
    }

    return Object.values(API_ENV).filter(
        (env) => !excludedNetworks.includes(env as keyof typeof API_ENV)
    );
};
export default class ApiProvider {
    private _apiFullNodeProvider?: JsonRpcProvider;
    private _signer: RawSigner | null = null;
    private _apiEnv: API_ENV = DEFAULT_API_ENV;

    public setNewJsonRpcProvider(
        apiEnv: API_ENV = DEFAULT_API_ENV,
        customRPC?: string | null
    ) {
        this._apiEnv = apiEnv;
        Browser.storage.local.set({ sui_Env: apiEnv });
        // We also clear the query client whenever set set a new API provider:
        queryClient.clear();
        this._apiFullNodeProvider = new JsonRpcProvider(
            customRPC ?? getDefaultAPI(this._apiEnv).fullNode
        );
        this._signer = null;
    }

    public getEndPoints(apiEnv?: API_ENV) {
        return getDefaultAPI(apiEnv || this._apiEnv || DEFAULT_API_ENV);
    }

    public get instance() {
        if (!this._apiFullNodeProvider) {
            this.setNewJsonRpcProvider();
        }
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            fullNode: this._apiFullNodeProvider!,
        };
    }

    public getSignerInstance(keypair: Keypair, force?: boolean): RawSigner {
        if (!this._apiFullNodeProvider) {
            this.setNewJsonRpcProvider();
        }
        if (!this._signer || force) {
            this._signer = new RawSigner(
                keypair,
                this._apiFullNodeProvider,
                growthbook.isOn(FEATURES.USE_LOCAL_TXN_SERIALIZER)
                    ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      new LocalTxnDataSerializer(this._apiFullNodeProvider!)
                    : undefined
            );
        }
        return this._signer;
    }

    public resetSignerInstance(): void {
        this._signer = null;
    }

    public getEthosSignerInstance(
        address: SuiAddress,
        accessToken: string
    ): EthosSigner {
        if (!this._apiFullNodeProvider) {
            this.setNewJsonRpcProvider();
        }
        return new EthosSigner(
            address,
            accessToken,
            this._apiFullNodeProvider,
            growthbook.isOn(FEATURES.USE_LOCAL_TXN_SERIALIZER)
                ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  new LocalTxnDataSerializer(this._apiFullNodeProvider!)
                : undefined
        );
    }
}

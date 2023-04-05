// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { RawSigner, JsonRpcProvider, Connection } from '@mysten/sui.js';

import { growthbook } from './experimentation/feature-gating';
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

export const API_ENV_TO_INFO: Record<string, EnvInfo> = {
    [API_ENV.local.toString()]: { name: 'Local' },
    [API_ENV.devNet.toString()]: { name: 'Devnet' },
    [API_ENV.customRPC.toString()]: { name: 'Custom RPC URL' },
    [API_ENV.testNet.toString()]: { name: 'Testnet' },
};

export const ENV_TO_API: Record<string, Connection | null> = {
    [API_ENV.local.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_LOCAL_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_LOCAL_FAUCET || '',
    }),
    [API_ENV.devNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_DEVNET_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_DEVNET_FAUCET || '',
    }),
    [API_ENV.customRPC.toString()]: null,
    [API_ENV.testNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_TESTNET_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_TESTNET_FAUCET || '',
    }),
};

function getDefaultApiEnv() {
    const apiEnv = growthbook.getFeatureValue(
        'default-api-env',
        API_ENV.testNet
    );
    if (apiEnv && !Object.keys(API_ENV).includes(apiEnv)) {
        throw new Error(`Unknown environment variable API_ENV, ${apiEnv}`);
    }
    return apiEnv ? API_ENV[apiEnv as keyof typeof API_ENV] : API_ENV.testNet;
}

function getDefaultAPI(env: API_ENV) {
    const dynamicApiEnvs = growthbook.getFeatureValue(
        'api-endpoints',
        {} as Record<string, Record<string, string>>
    );

    const mergedApiEnvs = ENV_TO_API;
    for (const env of Object.keys(ENV_TO_API)) {
        if (dynamicApiEnvs[env]) {
            mergedApiEnvs[env] = new Connection({
                fullnode:
                    dynamicApiEnvs[env]?.fullnode ||
                    ENV_TO_API[env]?.fullnode ||
                    '',
                faucet:
                    dynamicApiEnvs[env]?.faucet ||
                    ENV_TO_API[env]?.faucet ||
                    '',
                websocket:
                    dynamicApiEnvs[env]?.websocket ||
                    ENV_TO_API[env]?.websocket ||
                    '',
            });
        }
    }

    const apiEndpoint = mergedApiEnvs[env];

    if (
        !apiEndpoint ||
        apiEndpoint.fullnode === '' ||
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
        // We also clear the query client whenever set set a new API provider:
        queryClient.clear();

        const connection = customRPC
            ? new Connection({ fullnode: customRPC })
            : getDefaultAPI(apiEnv);
        this._apiFullNodeProvider = new JsonRpcProvider(connection);

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
            this._signer = new RawSigner(keypair, this.instance.fullNode);
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this._apiFullNodeProvider!
        );
    }
}

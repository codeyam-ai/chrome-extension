// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Connection, JsonRpcProvider, RawSigner } from '@mysten/sui.js';

import { EthosSigner } from '_src/shared/cryptography/EthosSigner';

import type { Keypair, SuiAddress } from '@mysten/sui.js';
import type { QueryClient } from '@tanstack/react-query';

export enum API_ENV {
    mainNet = 'mainNet',
    testNet = 'testNet',
    devNet = 'devNet',
    local = 'local',
    customRPC = 'customRPC',
}

type EnvInfo = {
    name: string;
};

export const API_ENV_TO_INFO: Record<string, EnvInfo> = {
    [API_ENV.mainNet.toString()]: { name: 'Mainnet' },
    [API_ENV.testNet.toString()]: { name: 'Testnet' },
    [API_ENV.devNet.toString()]: { name: 'Devnet' },
    [API_ENV.local.toString()]: { name: 'Local' },
    [API_ENV.customRPC.toString()]: { name: 'Custom RPC URL' },
};

export const ENV_TO_API: Record<string, Connection | null> = {
    [API_ENV.mainNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_MAINNET_FULLNODE || '',
        faucet: '',
    }),
    [API_ENV.testNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_TESTNET_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_TESTNET_FAUCET || '',
    }),
    [API_ENV.devNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_DEVNET_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_DEVNET_FAUCET || '',
    }),
    [API_ENV.local.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_LOCAL_FULLNODE || '',
        faucet: process.env.API_ENDPOINT_LOCAL_FAUCET || '',
    }),
    [API_ENV.customRPC.toString()]: null,
};

export const ENV_TO_API_2: Record<string, Connection | null> = {
    [API_ENV.mainNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_MAINNET_FULLNODE_2 || '',
        faucet: '',
    }),
    [API_ENV.testNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_TESTNET_FULLNODE_2 || '',
        faucet: process.env.API_ENDPOINT_TESTNET_FAUCET || '',
    }),
    [API_ENV.devNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_DEVNET_FULLNODE_2 || '',
        faucet: process.env.API_ENDPOINT_DEVNET_FAUCET || '',
    }),
    [API_ENV.local.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_LOCAL_FULLNODE_2 || '',
        faucet: process.env.API_ENDPOINT_LOCAL_FAUCET || '',
    }),
    [API_ENV.customRPC.toString()]: null,
};

export const ENV_TO_API_3: Record<string, Connection | null> = {
    [API_ENV.mainNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_MAINNET_FULLNODE_3 || '',
        faucet: '',
    }),
    [API_ENV.testNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_TESTNET_FULLNODE_3 || '',
        faucet: process.env.API_ENDPOINT_TESTNET_FAUCET || '',
    }),
    [API_ENV.devNet.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_DEVNET_FULLNODE_3 || '',
        faucet: process.env.API_ENDPOINT_DEVNET_FAUCET || '',
    }),
    [API_ENV.local.toString()]: new Connection({
        fullnode: process.env.API_ENDPOINT_LOCAL_FULLNODE_3 || '',
        faucet: process.env.API_ENDPOINT_LOCAL_FAUCET || '',
    }),
    [API_ENV.customRPC.toString()]: null,
};

function getDefaultAPI(env: API_ENV, fallbackNumber?: number) {
    // TODO: use the new, async, Growthbook code to load API endpoints from the server

    // const dynamicApiEnvs = growthbook.getFeatureValue(
    //     'api-endpoints',
    //     {} as Record<string, Record<string, string>>
    // );

    const dynamicApiEnvs = {} as Record<string, Record<string, string>>;

    let mergedApiEnvs = ENV_TO_API;

    if (fallbackNumber === 2) {
        mergedApiEnvs = ENV_TO_API_2;
    } else if (fallbackNumber === 3) {
        mergedApiEnvs = ENV_TO_API_3;
    }

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

    if (!apiEndpoint || apiEndpoint.fullnode === '') {
        throw new Error(`API endpoint not found for API_ENV ${env}`);
    }
    return apiEndpoint;
}

export const DEFAULT_API_ENV = API_ENV.mainNet;

type NetworkTypes = keyof typeof API_ENV;

export const generateActiveNetworkList = (): NetworkTypes[] => {
    const excludedNetworks: NetworkTypes[] = [];

    return Object.values(API_ENV).filter(
        (env) => !excludedNetworks.includes(env as keyof typeof API_ENV)
    );
};

export default class ApiProvider {
    public fallbackNumber: number | undefined = undefined;

    private _apiFullNodeProvider?: JsonRpcProvider;
    private _signer: RawSigner | null = null;
    private _apiEnv: API_ENV = DEFAULT_API_ENV;
    private _customRPC: string | null = null;

    public setNewJsonRpcProvider(
        apiEnv: API_ENV = DEFAULT_API_ENV,
        fallbackNumber?: number,
        customRPC?: string | null,
        queryClient?: QueryClient
    ) {
        this._apiEnv = apiEnv;
        this.fallbackNumber = fallbackNumber;
        this._customRPC = customRPC ?? null;

        // Make sure that state is cleared when switching networks
        queryClient?.clear();

        const connection = customRPC
            ? new Connection({ fullnode: customRPC })
            : getDefaultAPI(apiEnv, this.fallbackNumber);

        this._apiFullNodeProvider = new JsonRpcProvider(connection);

        this._signer = null;
    }

    public getEndPoints(apiEnv?: API_ENV) {
        return getDefaultAPI(
            apiEnv || this._apiEnv || DEFAULT_API_ENV,
            this.fallbackNumber
        );
    }

    public fallback(currentFallbackNumber?: number) {
        if (this.fallbackNumber !== currentFallbackNumber) return true;
        if (this.fallbackNumber === 3) return false;
        this.setNewJsonRpcProvider(
            this._apiEnv,
            (this.fallbackNumber ?? 1) + 1,
            this._customRPC
        );
        return true;
    }

    public get instance() {
        if (!this._apiFullNodeProvider) {
            this.setNewJsonRpcProvider(
                this._apiEnv,
                this.fallbackNumber,
                this._customRPC
            );
        }
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            fullNode: this._apiFullNodeProvider!,
        };
    }

    public getSignerInstance(keypair: Keypair, force?: boolean): RawSigner {
        if (!this._apiFullNodeProvider) {
            this.setNewJsonRpcProvider(
                this._apiEnv,
                this.fallbackNumber,
                this._customRPC
            );
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
            this.setNewJsonRpcProvider(
                this._apiEnv,
                this.fallbackNumber,
                this._customRPC
            );
        }
        return new EthosSigner(
            address,
            accessToken,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this._apiFullNodeProvider!
        );
    }
}

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SuiClient } from '@mysten/sui.js/client';
import { getFaucetHost } from '@mysten/sui.js/faucet';

import { BaseSigner } from '_src/shared/cryptography/BaseSigner';
import { EthosSigner } from '_src/shared/cryptography/EthosSigner';

import type { Ed25519Keypair } from '@mysten/sui.js/dist/cjs/keypairs/ed25519';
import type { QueryClient } from '@tanstack/react-query';
import type { WalletSigner } from '_src/shared/cryptography/WalletSigner';

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

export const ENV_TO_API: Record<string, string | null> = {
    [API_ENV.mainNet.toString()]:
        process.env.API_ENDPOINT_MAINNET_FULLNODE || '',
    [API_ENV.testNet.toString()]:
        process.env.API_ENDPOINT_TESTNET_FULLNODE || '',
    [API_ENV.devNet.toString()]: process.env.API_ENDPOINT_DEVNET_FULLNODE || '',
    [API_ENV.local.toString()]: process.env.API_ENDPOINT_LOCAL_FULLNODE || '',
    [API_ENV.customRPC.toString()]: null,
};

export const ENV_TO_API_2: Record<string, string | null> = {
    [API_ENV.mainNet.toString()]:
        process.env.API_ENDPOINT_MAINNET_FULLNODE_2 || '',
    [API_ENV.testNet.toString()]:
        process.env.API_ENDPOINT_TESTNET_FULLNODE_2 || '',
    [API_ENV.devNet.toString()]:
        process.env.API_ENDPOINT_DEVNET_FULLNODE_2 || '',
    [API_ENV.local.toString()]: process.env.API_ENDPOINT_LOCAL_FULLNODE_2 || '',
    [API_ENV.customRPC.toString()]: null,
};

export const ENV_TO_API_3: Record<string, string | null> = {
    [API_ENV.mainNet.toString()]:
        process.env.API_ENDPOINT_MAINNET_FULLNODE_3 || '',
    [API_ENV.testNet.toString()]:
        process.env.API_ENDPOINT_TESTNET_FULLNODE_3 || '',
    [API_ENV.devNet.toString()]:
        process.env.API_ENDPOINT_DEVNET_FULLNODE_3 || '',
    [API_ENV.local.toString()]: process.env.API_ENDPOINT_LOCAL_FULLNODE_3 || '',
    [API_ENV.customRPC.toString()]: null,
};

function getDefaultAPI(env: API_ENV, fallbackNumber?: number) {
    // TODO: use the new, async, Growthbook code to load API endpoints from the server

    // const dynamicApiEnvs = growthbook.getFeatureValue(
    //     'api-endpoints',
    //     {} as Record<string, Record<string, string>>
    // );

    const dynamicApiEnvs = {} as Record<string, string>;

    let mergedApiEnvs = ENV_TO_API;

    if (fallbackNumber === 2) {
        mergedApiEnvs = ENV_TO_API_2;
    } else if (fallbackNumber === 3) {
        mergedApiEnvs = ENV_TO_API_3;
    }

    for (const env of Object.keys(ENV_TO_API)) {
        if (dynamicApiEnvs[env]) {
            mergedApiEnvs[env] = dynamicApiEnvs[env] || ENV_TO_API[env] || '';
        }
    }

    const apiEndpoint = mergedApiEnvs[env];

    if (!apiEndpoint) {
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

    private _apiFullNodeClient?: SuiClient;
    private _signer: WalletSigner | null = null;
    private _apiEnv: API_ENV = DEFAULT_API_ENV;
    private _customUrl: string | null = null;

    public setNewSuiClient(
        apiEnv: API_ENV = DEFAULT_API_ENV,
        fallbackNumber?: number,
        customUrl?: string | null,
        queryClient?: QueryClient
    ) {
        this._apiEnv = apiEnv;
        this.fallbackNumber = fallbackNumber;
        this._customUrl = customUrl ?? null;

        // Make sure that state is cleared when switching networks
        queryClient?.clear();

        const url = customUrl
            ? customUrl
            : getDefaultAPI(apiEnv, this.fallbackNumber);

        this._apiFullNodeClient = new SuiClient({
            url,
        });

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
        this.setNewSuiClient(
            this._apiEnv,
            (this.fallbackNumber ?? 1) + 1,
            this._customUrl
        );
        return true;
    }

    public get faucetUrl() {
        const networkName = this._apiEnv.toLowerCase();
        if (
            networkName === 'testnet' ||
            networkName === 'devnet' ||
            networkName === 'localnet'
        ) {
            return getFaucetHost(networkName);
        } else return '';
    }

    public get instance() {
        if (!this._apiFullNodeClient) {
            this.setNewSuiClient(
                this._apiEnv,
                this.fallbackNumber,
                this._customUrl
            );
        }
        return {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            fullNode: this._customUrl
                ? this._customUrl
                : getDefaultAPI(this._apiEnv, this.fallbackNumber),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            client: this._apiFullNodeClient!,
        };
    }

    public getSignerInstance(
        keypair: Ed25519Keypair,
        force?: boolean
    ): WalletSigner {
        if (!this._apiFullNodeClient) {
            this.setNewSuiClient(
                this._apiEnv,
                this.fallbackNumber,
                this._customUrl
            );
        }

        if (!this._signer || force) {
            this._signer = new BaseSigner(keypair, this.instance.client);
        }
        return this._signer;
    }

    public resetSignerInstance(): void {
        this._signer = null;
    }

    public getEthosSignerInstance(
        address: string,
        accessToken: string
    ): EthosSigner {
        if (!this._apiFullNodeClient) {
            this.setNewSuiClient(
                this._apiEnv,
                this.fallbackNumber,
                this._customUrl
            );
        }
        return new EthosSigner(
            address,
            accessToken,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this._apiFullNodeClient!
        );
    }
}

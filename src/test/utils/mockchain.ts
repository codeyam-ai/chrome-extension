import { renderTemplate } from './json-templates';
import { makeCoinObject } from '_src/test/utils/mockchain-templates/coinObject';
import { makeDryRunTransactionResponse } from '_src/test/utils/mockchain-templates/dryRunTransaction';
import { suiSystemStateObject } from '_src/test/utils/mockchain-templates/sui-system-state';

import type { CoinBalance, DelegatedStake } from '@mysten/sui.js';
import type { MockJsonRpc } from '_src/test/utils/mock-json-rpc';

export const mockCommonCalls = (mockJsonRpc: MockJsonRpc) => {
    mockJsonRpc.mockBlockchainCall(
        { method: 'rpc.discover' },
        { info: { version: '0.20.1' } },
        true
    );

    const coinMetadataResponse = {
        decimals: 9,
        name: 'Sui',
        symbol: 'SUI',
        description: '',
        iconUrl: null,
        id: null,
    };
    mockJsonRpc.mockBlockchainCall(
        { method: 'suix_getCoinMetadata' },
        coinMetadataResponse,
        true
    );
};

export const mockSuiObjects = (
    mockJsonRpc: MockJsonRpc,
    options: {
        address?: string;
        suiBalance?: number;
        nftDetails?: { name: string };
        stakedSui?: { principal: string }[];
        logObjects?: boolean;
    } = {}
) => {
    const address = options.address ?? "0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de" 
    const fullObjects = [];
    const objectInfos = [];
    const coinBalances = [];
    const stakedSui: DelegatedStake[] = [];
    if (options.suiBalance) {
        const objId = '0xfd9cff9fd6befa0e7d6481d0eeae02056b2ca46e';
        const coinObject = makeCoinObject(options.suiBalance, objId);
        const coinObjectInfo = {
            data: {
                objectId: objId,
                version: '0',
                digest: '12Pe8JN96upsApMseeghANkkNMKUWA6Bz4JD5NTWko2q',
                type: '0x2::coin::Coin<0x2::sui::SUI>',
                owner: {
                    AddressOwner: '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                },
                previousTransaction:
                    '2joDzF1sDVAVv9ej7j8197ZwiZ1hX73kSFW48c1nNxv3',
            },
        };
        const coinBalance: CoinBalance = {
            coinType: '0x2::sui::SUI',
            totalBalance: options.suiBalance.toString(),
            coinObjectCount: 1,
            lockedBalance: { number: 0 },
        };
        objectInfos.push(coinObjectInfo);
        fullObjects.push(coinObject);
        coinBalances.push(coinBalance);
    }
    if (options.nftDetails) {
        const renderedNftResult = renderTemplate('nftObject', {
            name: options.nftDetails.name,
        });

        const nftObjectInfo = {
            data: {
                objectId:
                    '0x3c36fe1eca57222e087352959ab0edf83251fe0a5aa8a0ec87c4e3fa1714f367',
                version: '10',
                digest: '3LrFiM2niq5to7XJ466L7b9oVkQtXqTvNhfiLWCNCTTN',
            },
        };
        objectInfos.push(nftObjectInfo);
        fullObjects.push(renderedNftResult);
    }
    if (options.stakedSui) {
        options.stakedSui.forEach((stake, i) => {
            stakedSui.push({
                validatorAddress:
                    '0x0a392298244ca2694098d015b00cf49ae1168118b28d13cb0baafd5884e5559a',
                stakingPool:
                    '0x093136a86b72b6aa1c84e84e72a00ca2260246441976f1ce070b136dbfc6b90f',
                stakes: [
                    {
                        stakedSuiId: `0xd32356af50f7aa6f26b89657c798968eaf5db3d43479ae793a01125e746ee9${i}c`,
                        stakeRequestEpoch: '778',
                        stakeActiveEpoch: '779',
                        principal: stake.principal,
                        status: 'Active',
                        estimatedReward: '2388556',
                    },
                ],
            });
        });
    }

    mockJsonRpc.mockBlockchainCall(
        {
            method: 'suix_getStakes',
        },
        stakedSui,
        true
    );

    mockJsonRpc.mockBlockchainCall(
        { 
            method: 'suix_getOwnedObjects',
            params: [
                address,
            ]
        },
        {
            data: objectInfos,
            nextCursor: {
                objectId:
                    '0xe986888d31f35cf985a28155f4b4dea19fd324838107084107d42f0541be12c9',
            },
            hasNextPage: false,
        },
        true
    );

    mockJsonRpc.mockBlockchainCall(
        {
             method: 'suix_getAllBalances', 
             params: [ address ]
        },
        coinBalances,
        true
    );

    fullObjects.push(suiSystemStateObject);
    fullObjects.forEach((fullObject) => {
        mockJsonRpc.mockBlockchainCall(
            {
                method: 'suix_getObject',
                params: [fullObject.data.objectId],
            },
            fullObject,
            true
        );
    });

    mockJsonRpc.mockBlockchainCall(
        { method: 'sui_multiGetObjects' },
        fullObjects,
        true
    );
};

/**
 * Mocks of common rpc calls
 *
 * Use the returned object to build up one or more mocks
 * you know you need specifically.
 */
export const rpcMocks = (mockJsonRpc: MockJsonRpc) => {
    return {
        sui_getNormalizedMoveFunction: () => {
            mockJsonRpc.mockBlockchainCall(
                { method: 'sui_getNormalizedMoveFunction' },
                renderTemplate('getNormalizedMoveFunction', {}),
                true
            );
        },
        suix_getNormalizedMoveFunction: () => {
            mockJsonRpc.mockBlockchainCall(
                { method: 'sui_getNormalizedMoveFunction' },
                renderTemplate('getNormalizedMoveFunction', {}),
                true
            );
        },
        sui_devInspectTransactionBlock: () => {
            mockJsonRpc.mockBlockchainCall(
                { method: 'sui_devInspectTransactionBlock' },
                renderTemplate('devInspectTransaction', {})
            );
        },
        suix_getReferenceGasPrice: () => {
            mockJsonRpc.mockBlockchainCall(
                { method: 'suix_getReferenceGasPrice', params: [] },
                '1',
                true
            );
        },
        suix_getCoins: () => {
            mockJsonRpc.mockBlockchainCall(
                {
                    method: 'suix_getCoins',
                    params: [
                        '0xff263a941b9650b51207a674d59728f6f34102d366f4df5a59514bc3668602de',
                        '0x2::sui::SUI',
                        null,
                        null,
                    ],
                },
                renderTemplate('getCoins', {}),
                true
            );
        },
        sui_dryRunTransactionBlock: (digest: string) => {
            mockJsonRpc.mockBlockchainCall(
                {
                    method: 'sui_dryRunTransactionBlock',
                    params: [digest],
                },
                makeDryRunTransactionResponse(),
                true
            );
        },
        sui_executeTransactionBlock: (params: (string | string[] | null)[]) => {
            mockJsonRpc.mockBlockchainCall(
                {
                    method: 'sui_executeTransactionBlock',
                    params: params ?? [
                        'AAACAAgAypo7AAAAAAAg7JbTIOl80QFG+VOnnPncBaizXEaz6EKPeF7Drhtvj6YCAgABAQAAAQECAAABAQD/JjqUG5ZQtRIHpnTVlyj280EC02b031pZUUvDZoYC3gH1G/x9mNhvvXXxnRbDdISw8Pc4LrbJv8rS/kqUviyIIgIAAAAAAAAAILQ05FL3B9P9W9lDQSn+qxJ4xlecVIEEGW7AePU4yGwf/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4BAAAAAAAAAAwEAAAAAAAAAA==',
                        [
                            'ALtY0M5OdSte1NquP4pm5dLH9Co58+VeodZp4PZkXfjt/yY6lBuWULUSB6Z01Zco9vNBAtNm9N9aWVFLw2aGAt4=',
                        ],
                        null,
                        null,
                    ],
                },
                renderTemplate('executeTransaction', {})
            );
        },
    };
};

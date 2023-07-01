/* eslint-disable no-console */
import { renderTemplate } from './json-templates';
import { wallet1Address, wallet2Address } from './storage';
import { getObjectIds } from './test-helpers';
import { makeCoinObject } from '_src/test/utils/mockchain-templates/coinObject';
import { makeDryRunTransactionResponse } from '_src/test/utils/mockchain-templates/dryRunTransaction';
import { suiSystemStateObject } from '_src/test/utils/mockchain-templates/sui-system-state';
import { makeCoinTransactionBlock } from '_src/test/utils/mockchain-templates/transactionBlock';

import type { CoinBalance, DelegatedStake } from '@mysten/sui.js';
import type { MockJsonRpc } from '_src/test/utils/mock-json-rpc';

/**
 * Mocks out the basic JsonRPC calls that any blockchain interaction will make.
 */
export const mockCommonCalls = (mockJsonRpc: MockJsonRpc) => {
    mockJsonRpc.mockJsonRpcCall(
        { method: 'rpc.discover' },
        { info: { version: '0.20.1' } },
        true
    );

    const coinMetadataResponse = {
        decimals: 9,
        name: 'Sui',
        symbol: 'SUI',
        description: '',
        iconUrl: 'http://example.com/sui-icon.png',
        id: null,
    };
    mockJsonRpc.mockJsonRpcCall(
        { method: 'suix_getCoinMetadata' },
        coinMetadataResponse,
        true
    );

    mockJsonRpc.mockJsonRpcCall(
        { method: 'sui_getProtocolConfig' },
        renderTemplate('getProtocolConfig', {}),
        true
    );
};

interface CoinTransactionSpec {
    amountInMist: number;
    toAddress: string;
    fromAddress: string;
}

/**
 * Sets the state of the mock blockchain.
 *
 * @param options.coinTransaction - If provided, the blockchain will have a single transaction and associated coin objects.
 *  If a number is provided, it will be used as the amount of SUI transferred in the transaction. If an object is provided,
 *  it will be used to set up a transaction with the given amount of SUI, to the given address, from the given address.
 *
 * @param options.nftDetails - If provided, the blockchain will contain `nftDetails.count` many NFTs (default: `1`), and
 *  will have `nftDetails.name` as the base name. All but the first will append a count for unique names, e.g., `name`,
 *  `name2`, name3
 * @param options.logObjects - If true, this function call will log the internal "fullObjects" list for inspection. This list
 * will ultimately be the state of the mockchain, i.e., what is "on chain".
 */
export const mockBlockchain = (
    mockJsonRpc: MockJsonRpc,
    options: {
        address?: string;
        coinTransaction?: number | CoinTransactionSpec;
        nftDetails?: { name: string; count?: number };
        stakedSui?: { principal: string }[];
        logObjects?: boolean;
    } = {}
) => {
    mockCommonCalls(mockJsonRpc);
    const address = options.address ?? wallet1Address;
    const fullObjects = [];
    const objectInfos = [];
    const coinBalances = [];
    const coinTransactionBlocks = [];
    const stakedSui: DelegatedStake[] = [];
    if (options.coinTransaction) {
        const coinObjectId = '0xfd9cff9fd6befa0e7d6481d0eeae02056b2ca46e';

        const actualCoinTransaction =
            typeof options.coinTransaction === 'number'
                ? {
                      amountInMist: options.coinTransaction,
                      toAddress: wallet1Address,
                      fromAddress: wallet2Address,
                  }
                : options.coinTransaction;
        const coinObject = makeCoinObject(
            actualCoinTransaction.amountInMist,
            coinObjectId
        );
        const coinObjectInfo = {
            data: {
                objectId: coinObjectId,
                version: '0',
                digest: '12Pe8JN96upsApMseeghANkkNMKUWA6Bz4JD5NTWko2q',
                type: '0x2::coin::Coin<0x2::sui::SUI>',
                owner: {
                    AddressOwner: wallet1Address,
                },
                previousTransaction:
                    '2joDzF1sDVAVv9ej7j8197ZwiZ1hX73kSFW48c1nNxv3',
            },
        };
        const coinBalance: CoinBalance = {
            coinType: '0x2::sui::SUI',
            totalBalance: actualCoinTransaction.amountInMist.toString(),
            coinObjectCount: 1,
            lockedBalance: { number: 0 },
        };

        const coinTransactionBlock = makeCoinTransactionBlock(
            actualCoinTransaction.toAddress,
            actualCoinTransaction.fromAddress,
            actualCoinTransaction.amountInMist,
            coinObjectId
        );
        coinTransactionBlocks.push(coinTransactionBlock);
        objectInfos.push(coinObjectInfo);
        fullObjects.push(coinObject);
        coinBalances.push(coinBalance);
    }
    if (options.nftDetails) {
        const buildNft = (name: string, objectId: string) => {
            const renderedNftResult = renderTemplate('nftObject', {
                name,
                objectId,
            });

            const nftObjectInfo = {
                data: {
                    objectId,
                    version: '10',
                    digest: '3LrFiM2niq5to7XJ466L7b9oVkQtXqTvNhfiLWCNCTTN',
                },
            };
            objectInfos.push(nftObjectInfo);
            fullObjects.push(renderedNftResult);
        };

        const name = options.nftDetails.name;
        const count: number = options.nftDetails?.count ?? 1;
        const objectIds = getObjectIds(count);
        for (const objectId of objectIds) {
            const i = objectId.at(-1);
            const nftName = i === '0' ? name : `${name}${i}`;
            buildNft(nftName, objectId);
        }
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

    mockJsonRpc.mockJsonRpcCall(
        {
            method: 'suix_queryTransactionBlocks',
            params: [
                {
                    filter: {
                        ToAddress: wallet1Address,
                    },
                },
            ],
        },
        {
            data: coinTransactionBlocks,
            nextCursor: null,
            hasNextPage: false,
        },
        true
    );

    mockJsonRpc.mockJsonRpcCall(
        {
            method: 'suix_queryTransactionBlocks',
            params: [
                {
                    filter: {
                        FromAddress: wallet1Address,
                    },
                },
            ],
        },
        {
            data: [],
            nextCursor: null,
            hasNextPage: false,
        },
        true
    );

    mockJsonRpc.mockJsonRpcCall(
        {
            method: 'suix_getStakes',
        },
        stakedSui,
        true
    );

    mockJsonRpc.mockJsonRpcCall(
        {
            method: 'suix_getOwnedObjects',
            params: [address],
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

    mockJsonRpc.mockJsonRpcCall(
        {
            method: 'suix_getAllBalances',
            params: [address],
        },
        coinBalances,
        true
    );

    fullObjects.push(suiSystemStateObject);
    fullObjects.forEach((fullObject) => {
        mockJsonRpc.mockJsonRpcCall(
            {
                method: 'suix_getObject',
                params: [fullObject.data.objectId],
            },
            fullObject,
            true
        );
    });

    mockJsonRpc.mockJsonRpcCall(
        { method: 'sui_multiGetObjects' },
        fullObjects,
        true
    );

    if (options.logObjects) {
        console.log('!! mockchain log !! fullObjects !!\n', fullObjects);
    }
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
            mockJsonRpc.mockJsonRpcCall(
                { method: 'sui_getNormalizedMoveFunction' },
                renderTemplate('getNormalizedMoveFunction', {}),
                true
            );
        },
        suix_getNormalizedMoveFunction: () => {
            mockJsonRpc.mockJsonRpcCall(
                { method: 'sui_getNormalizedMoveFunction' },
                renderTemplate('getNormalizedMoveFunction', {}),
                true
            );
        },
        sui_devInspectTransactionBlock: () => {
            mockJsonRpc.mockJsonRpcCall(
                { method: 'sui_devInspectTransactionBlock' },
                renderTemplate('devInspectTransaction', {})
            );
        },
        suix_getReferenceGasPrice: () => {
            mockJsonRpc.mockJsonRpcCall(
                { method: 'suix_getReferenceGasPrice', params: [] },
                '1',
                true
            );
        },
        suix_getCoins: () => {
            mockJsonRpc.mockJsonRpcCall(
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
            mockJsonRpc.mockJsonRpcCall(
                {
                    method: 'sui_dryRunTransactionBlock',
                    params: [digest],
                },
                makeDryRunTransactionResponse(),
                true
            );
        },
        sui_executeTransactionBlock: (params: (string | string[] | null)[]) => {
            mockJsonRpc.mockJsonRpcCall(
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

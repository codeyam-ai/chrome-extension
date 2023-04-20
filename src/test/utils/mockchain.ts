import _ from 'lodash';
import nock from 'nock';
import { v4 as uuidV4 } from 'uuid';

import { renderTemplate } from './json-templates';
import { suiSystemStateObject } from '_src/test/utils/mockchain-templates/sui-system-state';
import { dryRunTransactionResponse } from '_src/test/utils/mockchain-templates/dryRunTransaction';
import { makeCoinObject } from '_src/test/utils/mockchain-templates/coinObject';

interface ExpectedCall {
    method: string;
    params?: unknown[];
    result: unknown;
    numExpectedCalls?: number;
}

interface CallContext {
    expectedCall: ExpectedCall;
    actualCalls: number;
}

export class Mockchain {
    registeredCalls: CallContext[];

    constructor() {
        this.registeredCalls = [];
        nock('http://testNet-fullnode.example.com')
            .persist()
            .post('/')
            .reply(200, (uri: string, requestBody: nock.Body) => {
                return this.matchIncomingRequest(uri, requestBody);
            });
    }

    mockBlockchainCall(
        request: { method: string; params?: unknown[] },
        result: unknown,
        persist?: boolean
    ): CallContext {
        let expectedCalls;
        if (!persist) {
            expectedCalls = 1;
        }
        const expectedCall: ExpectedCall = {
            method: request.method,
            params: request.params,
            result: result,
            numExpectedCalls: expectedCalls,
        };
        const callContext = {
            expectedCall: expectedCall,
            actualCalls: 0,
        };
        this.registeredCalls.push(callContext);
        return callContext;
    }

    mockCommonCalls() {
        this.mockBlockchainCall(
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
        this.mockBlockchainCall(
            { method: 'suix_getCoinMetadata' },
            coinMetadataResponse,
            true
        );
    }

    mockSuiObjects(
        options: {
            suiBalance?: number;
            nftDetails?: { name: string };
            logObjects?: boolean;
        } = {}
    ) {
        const fullObjects = [];
        const objectInfos = [];
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
                        AddressOwner:
                            '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                    },
                    previousTransaction:
                        '2joDzF1sDVAVv9ej7j8197ZwiZ1hX73kSFW48c1nNxv3',
                },
            };
            objectInfos.push(coinObjectInfo);
            fullObjects.push(coinObject);
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

        this.mockBlockchainCall(
            { method: 'suix_getOwnedObjects' },
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

        fullObjects.push(suiSystemStateObject);
        fullObjects.forEach((fullObject) => {
            this.mockBlockchainCall(
                {
                    method: 'suix_getObject',
                    params: [fullObject.data.objectId],
                },
                fullObject,
                true
            );
        });

        this.mockBlockchainCall(
            { method: 'sui_multiGetObjects' },
            fullObjects,
            true
        );
    }

    matchIncomingRequest(uri: string, requestBody: nock.Body) {
        const allJsonRpcResponses: unknown[] = [];

        let isBatch: boolean;
        let allJsonRpcCalls: unknown[];
        if (Array.isArray(requestBody)) {
            allJsonRpcCalls = requestBody;
            isBatch = true;
        } else {
            allJsonRpcCalls = [requestBody];
            isBatch = false;
        }

        allJsonRpcCalls.forEach((jsonRpcCall) => {
            this.registeredCalls.forEach((callContext) => {
                const expectedBody: { method: string; params?: unknown[] } = {
                    method: callContext.expectedCall.method,
                };
                if (callContext.expectedCall.params) {
                    expectedBody.params = callContext.expectedCall.params;
                }
                const matches = _.matches(expectedBody)(jsonRpcCall);
                const numExpectedCalls =
                    callContext.expectedCall.numExpectedCalls;
                const reachedLimit =
                    numExpectedCalls &&
                    callContext.actualCalls === numExpectedCalls;
                if (matches) {
                    if (!reachedLimit) {
                        callContext.actualCalls += 1;
                        allJsonRpcResponses.push(
                            callContext.expectedCall.result
                        );
                    } else {
                        const message = `Found a match for method ${callContext.expectedCall.method} with params ${callContext.expectedCall.params} but request already happened ${numExpectedCalls} times!\n Consider passing persist: true`;
                        // eslint-disable-next-line no-console
                        console.warn(message);
                        throw new Error(message);
                    }
                }
            });
        });

        if (allJsonRpcCalls.length === allJsonRpcResponses.length) {
            if (isBatch) {
                // return an array where each object corresponds to an incoming request
                return allJsonRpcResponses.map((response) => {
                    return {
                        jsonrpc: '2.0',
                        result: response,
                        id: uuidV4(),
                    };
                });
            } else {
                return {
                    jsonrpc: '2.0',
                    result: allJsonRpcResponses[0],
                    id: uuidV4(),
                };
            }
        } else {
            const bodyAsRecord = requestBody as Record<string, unknown>;
            // eslint-disable-next-line no-console
            const message = `Found no match for method ${
                bodyAsRecord.method
            } with params ${JSON.stringify(bodyAsRecord.params, null, 2)}`;
            // eslint-disable-next-line no-console
            console.warn(message);
            throw new Error(message);
        }
    }

    /**
     * Mocks of common rpc calls
     *
     * Use the returned object to build up one or more mocks
     * you know you need specifically.
     */
    rpcMocks() {
        return {
            sui_getNormalizedMoveFunction: () => {
                this.mockBlockchainCall(
                    { method: 'sui_getNormalizedMoveFunction' },
                    renderTemplate('getNormalizedMoveFunction', {}),
                    true
                );
            },
            suix_getNormalizedMoveFunction: () => {
                this.mockBlockchainCall(
                    { method: 'sui_getNormalizedMoveFunction' },
                    renderTemplate('getNormalizedMoveFunction', {}),
                    true
                );
            },
            sui_devInspectTransactionBlock: () => {
                this.mockBlockchainCall(
                    { method: 'sui_devInspectTransactionBlock' },
                    renderTemplate('devInspectTransaction', {})
                );
            },
            suix_getReferenceGasPrice: () => {
                this.mockBlockchainCall(
                    { method: 'suix_getReferenceGasPrice', params: [] },
                    '1',
                    true
                );
            },
            suix_getCoins: () => {
                this.mockBlockchainCall(
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
                this.mockBlockchainCall(
                    {
                        method: 'sui_dryRunTransactionBlock',
                        params: [digest],
                    },
                    dryRunTransactionResponse,
                    true
                );
            },
            sui_executeTransactionBlock: () => {
                this.mockBlockchainCall(
                    {
                        method: 'sui_executeTransactionBlock',
                        params: [
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
    }
}

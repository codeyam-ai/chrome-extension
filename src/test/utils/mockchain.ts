import _ from 'lodash';
import nock from 'nock';
import { v4 as uuidV4 } from 'uuid';

import { renderTemplate } from './json-templates';
import { suiSystemStateObject } from '_src/test/utils/mockchain-templates/sui-system-state';

import type { SuiObjectInfo } from '@mysten/sui.js';

interface ExpectedCall {
    method: string;
    params?: any;
    result: any;
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
        nock('http://devNet-fullnode.example.com')
            .persist()
            .post('/')
            .reply(200, (uri: string, requestBody: nock.Body) => {
                return this.matchIncomingRequest(uri, requestBody);
            });
    }

    mockBlockchainCall(
        request: { method: string; params?: any },
        result: any,
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
            { method: 'sui_getCoinMetadata' },
            coinMetadataResponse,
            true
        );
    }

    mockSuiObjects(
        options: { suiBalance?: number; nftDetails?: { name: string } } = {}
    ) {
        const fullObjects = [];
        const objectInfos = [];
        if (options.suiBalance) {
            const objId = '0xfd9cff9fd6befa0e7d6481d0eeae02056b2ca46e';
            const coinObject = renderTemplate('coinObject', {
                balance: options.suiBalance,
                id: objId,
            });
            const coinObjectInfo: SuiObjectInfo = {
                objectId: objId,
                version: 0,
                digest: '12Pe8JN96upsApMseeghANkkNMKUWA6Bz4JD5NTWko2q',
                type: '0x2::coin::Coin<0x2::sui::SUI>',
                owner: {
                    AddressOwner: '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                },
                previousTransaction:
                    '2joDzF1sDVAVv9ej7j8197ZwiZ1hX73kSFW48c1nNxv3',
            };
            objectInfos.push(coinObjectInfo);
            fullObjects.push(coinObject);
        }
        if (options.nftDetails) {
            const renderedNftResult = renderTemplate('nftObject', {
                name: options.nftDetails.name,
            });

            const objId = '0xc157dc52d54697f53329520499500de0ec6fcf70';
            const nftObjectInfo: SuiObjectInfo = {
                objectId: objId,
                version: 11,
                digest: 'QfLsnpIr0FkDxZ8nRjtZFQHB8WyyMqSb5XrNjRPbhJ4=',
                type: '0x2::devnet_nft::DevNetNFT',
                owner: {
                    AddressOwner: '0x1ce5033e82ae9a48ea743b503d96b49b9c57fe0b',
                },
                previousTransaction:
                    '9eYRTpu476zfPVbXbkCDUKbdpp6yYKnEQXworrzKDdrM',
            };
            objectInfos.push(nftObjectInfo);
            fullObjects.push(renderedNftResult);
        }

        this.mockBlockchainCall(
            { method: 'sui_getObjectsOwnedByAddress' },
            objectInfos,
            true
        );

        fullObjects.push(suiSystemStateObject);
        fullObjects.forEach((fullObject) => {
            this.mockBlockchainCall(
                {
                    method: 'sui_getObject',
                    params: [fullObject.details.reference.objectId],
                },
                fullObject,
                true
            );
        });
    }

    matchIncomingRequest(uri: string, requestBody: nock.Body) {
        const allJsonRpcResponses: any[] = [];

        let isBatch: boolean;
        let allJsonRpcCalls: any[];
        if (Array.isArray(requestBody)) {
            allJsonRpcCalls = requestBody;
            isBatch = true;
        } else {
            allJsonRpcCalls = [requestBody];
            isBatch = false;
        }

        allJsonRpcCalls.forEach((jsonRpcCall) => {
            this.registeredCalls.forEach((callContext) => {
                const expectedBody: any = {
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
                        throw new Error(
                            `Found a match for method ${callContext.expectedCall.method} with params ${callContext.expectedCall.params} but request already happened ${numExpectedCalls} times!\n Consider passing persist: true`
                        );
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
            const bodyAsRecord = requestBody as Record<string, any>;
            throw new Error(
                `Found no match for method ${bodyAsRecord.method} with params ${bodyAsRecord.params}!`
            );
        }
    }
}

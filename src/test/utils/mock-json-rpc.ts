import _ from 'lodash';
import nock from 'nock';
import { v4 as uuidV4 } from 'uuid';

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

export class MockJsonRpc {
    registeredCalls: CallContext[];

    constructor(trace = false) {
        this.registeredCalls = [];
        nock('http://mainNet-fullnode.example.com')
            .persist()
            .post('/')
            .reply(200, (uri: string, requestBody: nock.Body) => {
                return this.matchIncomingRequest(uri, requestBody, trace);
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

    matchIncomingRequest(uri: string, requestBody: nock.Body, trace: boolean) {
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
            const method = _.get(jsonRpcCall, 'method');
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
                        if (trace) {
                            // eslint-disable-next-line no-console
                            console.log(
                                `for ${method} returning ${JSON.stringify(
                                    callContext.expectedCall.result
                                )}`
                            );
                        }
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
}

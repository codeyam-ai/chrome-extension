import { readFileSync } from 'fs';
import _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';

import nock from 'nock';
import { join } from 'path';
import { renderTemplate } from './json-templates';
import { SUI_SYSTEM_STATE_OBJECT_ID } from '_src/ui/app/redux/slices/sui-objects/Coin';

export class Mockchain {
    mockBlockchainCall(
        request: { method: string; params?: any },
        result: any,
        persist?: boolean
    ) {
        let theNock = nock('http://devNet-fullnode.example.com');
        if (persist) {
            theNock = theNock.persist();
        }
        theNock.post('/', _.matches(request)).reply(200, {
            jsonrpc: '2.0',
            result: result,
            id: uuidV4.toString(),
        });
        return theNock;
    }

    mockBlockchainBatchCall(
        requests: { method: string; params?: any }[],
        results: any[],
        persist?: boolean
    ) {
        let theNock = nock('http://devNet-fullnode.example.com');
        if (persist) {
            theNock = theNock.persist();
        }
        const responses = results.map((response) => {
            return {
                jsonrpc: '2.0',
                id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
                result: response,
            };
        });

        theNock.post('/', _.matches(requests)).reply(200, responses);
        return theNock;
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
        options: {
            coinId?: string;
            suiBalance?: number;
            nftDetails?: { name: string };
        } = {}
    ) {
        const renderedObjects = [];
        if (options.suiBalance) {
            const renderedCoinResult = renderTemplate('coinObject', {
                balance: options.suiBalance,
                id: options.coinId,
            });
            renderedObjects.push(renderedCoinResult);
        }
        if (options.nftDetails) {
            const renderedNftResult = renderTemplate('nftObject', {
                name: options.nftDetails.name,
            });
            renderedObjects.push(renderedNftResult);
        }

        const renderedResponses = renderedObjects.map((value) => {
            return {
                jsonrpc: '2.0',
                id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
                result: value,
            };
        });

        this.mockBlockchainCall(
            { method: 'sui_getObjectsOwnedByAddress' },
            [],
            true
        );

        this.mockBlockchainBatchCall(
            [{ method: 'sui_getObject', params: [SUI_SYSTEM_STATE_OBJECT_ID] }],
            renderedObjects
        );
    }
}

import { readFileSync } from 'fs';
import _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';

import nock from 'nock';
import { join } from 'path';
import { renderTemplate } from './json-templates';

export const mockBlockchainCall = function (
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
};

export const mockCommonCalls = function () {
    mockBlockchainCall(
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
    mockBlockchainCall(
        { method: 'sui_getCoinMetadata' },
        coinMetadataResponse,
        true
    );
};

export const mockSuiObjects = function (
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
    // TODO: make this work for both wallets that are in play for the user (see fake-local-storage).

    // TODO: clean this up.  in the case where renderedResponses is an empty array (i.e. fresh wallet with nothing in
    //  it), it doesn't make sense for sui_getObject to return "[]". In that case we wouldn't expect sui_getObject to
    // get called at all.

    nock('http://devNet-fullnode.example.com')
        .persist()
        .post('/', /sui_getObjectsOwnedByAddress/)
        .reply(200, {
            jsonrpc: '2.0',
            result: [],
            id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
        });
    nock('http://devNet-fullnode.example.com')
        .post('/', /sui_getObject/)
        .reply(200, renderedResponses);
};

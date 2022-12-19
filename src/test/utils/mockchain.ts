import { readFileSync } from 'fs';
import Mustache from 'mustache';
import nock from 'nock';
import { join } from 'path';

const suiGetObjectTemplate = readFileSync(
    join(__dirname, 'mockchain-templates/getObject.json.mustache'),
    'utf-8'
);
const suiCoinTemplate = readFileSync(
    join(__dirname, 'mockchain-templates/coinObject.json.mustache'),
    'utf-8'
);
const rpcDiscoverTemplate = readFileSync(
    join(__dirname, 'mockchain-templates/coinObject.json.mustache'),
    'utf-8'
);

const mockSuiObjects = function (options: { suiBalance?: number } = {}) {
    const suiObjectResults = [];
    if (options.suiBalance) {
        const renderedCoinResult = Mustache.render(suiCoinTemplate, {
            balance: options.suiBalance,
        });
        suiObjectResults.push({ object: renderedCoinResult });
    }
    const renderedTemplate = Mustache.render(suiGetObjectTemplate, {
        objects: suiObjectResults,
    });
    nock('http://dev-net-fullnode.example.com')
        .post('/', /sui_getObjectsOwnedByAddress/)
        .reply(200, {
            jsonrpc: '2.0',
            result: [],
            id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
        })
        .post('/', /sui_getObject/)
        .reply(200, renderedTemplate)
        .post('/', /rpc.discover/)
        .reply(200, Mustache.render(rpcDiscoverTemplate, {}))
        .post('/', /sui_getCoinMetadata/)
        .reply(200, {
            jsonrpc: '2.0',
            result: {
                decimals: 9,
                name: 'Sui',
                symbol: 'SUI',
                description: '',
                iconUrl: null,
                id: null,
            },
            id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
        });
};

beforeEach(() => {
    nock.cleanAll();
});

export default mockSuiObjects;

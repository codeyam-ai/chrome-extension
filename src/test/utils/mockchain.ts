import { readFileSync } from 'fs';
import Mustache from 'mustache';
import nock from 'nock';
import { join } from 'path';

const readTemplate = (templateName: string) => {
    return readFileSync(
        join(__dirname, `mockchain-templates/${templateName}.json.mustache`),
        'utf-8'
    );
};

const suiCoinTemplate = readTemplate('coinObject');
const suiNftTemplate = readTemplate('nftObject');

export const mockCommonCalls = function () {
    nock('http://dev-net-fullnode.example.com')
        .persist()
        .post('/', /rpc.discover/)
        .reply(200, {
            jsonrpc: '2.0',
            result: { info: { version: '0.20.1' } },
            id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
        })
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

export const mockSuiObjects = function (
    options: { suiBalance?: number; nftDetails?: { name: string } } = {}
) {
    const renderedObjects = [];
    if (options.suiBalance) {
        const renderedCoinResult = Mustache.render(suiCoinTemplate, {
            balance: options.suiBalance,
        });
        renderedObjects.push(renderedCoinResult);
    }
    if (options.nftDetails) {
        const renderedNftResult = Mustache.render(suiNftTemplate, {
            name: options.nftDetails.name,
        });
        renderedObjects.push(renderedNftResult);
    }
    const finalRenderedTemplate = `[${renderedObjects.join(',')}]`;
    nock('http://dev-net-fullnode.example.com')
        .post('/', /sui_getObjectsOwnedByAddress/)
        .reply(200, {
            jsonrpc: '2.0',
            result: [],
            id: 'fbf9bf0c-a3c9-460a-a999-b7e87096dd1c',
        })
        .post('/', /sui_getObject/)
        .reply(200, finalRenderedTemplate);
};

beforeEach(() => {
    nock.cleanAll();
});

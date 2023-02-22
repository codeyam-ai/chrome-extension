import { readFileSync } from 'fs';
import Mustache from 'mustache';
import nock from 'nock';
import { join } from 'path';

// TODO: this is duplicated from json-templates, DRY up
const readTemplate = (templateName: string) => {
    return readFileSync(
        join(__dirname, `mockchain-templates/${templateName}.json.mustache`),
        'utf-8'
    );
};

const suiCoinTemplate = readTemplate('coinObject');
const suiNftTemplate = readTemplate('nftObject');

export const mockCommonCalls = function () {
    nock('http://devNet-fullnode.example.com')
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
    options: {
        coinId?: string;
        suiBalance?: number;
        nftDetails?: { name: string };
    } = {}
) {
    const renderedObjects = [];
    if (options.suiBalance) {
        const renderedCoinResult = Mustache.render(suiCoinTemplate, {
            balance: options.suiBalance,
            id: options.coinId,
        });
        renderedObjects.push(renderedCoinResult);
    }
    if (options.nftDetails) {
        const renderedNftResult = Mustache.render(suiNftTemplate, {
            name: options.nftDetails.name,
        });
        renderedObjects.push(renderedNftResult);
    }

    const renderedResponses = renderedObjects.map(
        (value) =>
            `{"jsonrpc": "2.0", "id": "fbf9bf0c-a3c9-460a-a999-b7e87096dd1c", "result": ${value}}`
    );
    const finalRenderedTemplate = `[${renderedResponses.join(',')}]`;

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
        .reply(200, finalRenderedTemplate);
};

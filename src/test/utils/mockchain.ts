import { readFileSync } from 'fs';
import _ from 'lodash';
import { v4 as uuidV4 } from 'uuid';

import nock from 'nock';
import { join } from 'path';
import { renderTemplate } from './json-templates';
import { SUI_SYSTEM_STATE_OBJECT_ID } from '_src/ui/app/redux/slices/sui-objects/Coin';
import { SuiObjectInfo } from '@mysten/sui.js';

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
            suiBalance?: number;
            nftDetails?: { name: string };
        } = {}
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

        const expectedIds = objectInfos.map(
            (objectInfo) => objectInfo.objectId
        );
        expectedIds.push(SUI_SYSTEM_STATE_OBJECT_ID);
        const expectedCalls = expectedIds.map((expectedId) => ({
            method: 'sui_getObject',
            params: [expectedId],
        }));
        this.mockBlockchainBatchCall(expectedCalls, fullObjects);
    }
}

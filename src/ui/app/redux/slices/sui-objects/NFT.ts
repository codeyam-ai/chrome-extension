import {
    getObjectFields,
    getObjectType,
    getSuiObjectData,
    SuiObjectData,
    is,
} from '@mysten/sui.js';
import get from 'lodash/get';

import ipfs from '_src/ui/app/helpers/ipfs';

import type {
    SuiObjectResponse,
    JsonRpcProvider,
    SuiMoveObject,
} from '@mysten/sui.js';

export type BagNFT = {
    id: string;
    owner?: string;
    name?: string;
    description?: string;
    url?: string;
};

export class NFT {
    public static isNFT(data: SuiObjectData): boolean {
        if (this.isBagNFT(data)) return true;
        if (
            data.display?.data &&
            typeof data.display.data === 'object' &&
            ('image_url' in data.display.data || 'img_url' in data.display.data)
        ) {
            return true;
        }

        return (
            !!data.content &&
            'fields' in data.content &&
            'url' in data.content.fields &&
            !('ticket_id' in data.content.fields)
        );
    }

    public static isBagNFT(data: SuiObjectData): boolean {
        return (
            !!data.content &&
            'fields' in data.content &&
            'logical_owner' in data.content.fields &&
            'bag' in data.content.fields
        );
    }

    public static async parseBagNFT(
        provider: JsonRpcProvider,
        data: SuiObjectData
    ): Promise<SuiObjectData | BagNFT> {
        if (!this.isBagNFT(data)) return data;

        const id = get(data, 'objectId');
        const bagId = get(data, 'content.fields.bag.fields.id.id');
        const owner = get(data, 'content.fields.logical_owner');

        if (!bagId) return data;

        const { data: bagObjects } = await provider.getDynamicFields({
            parentId: bagId,
        });
        const objectIds = bagObjects.map((bagObject) => bagObject.objectId);
        const objects = await provider.multiGetObjects({
            ids: objectIds,
            options: {
                showContent: true,
                showType: true,
                showDisplay: true,
                showOwner: true,
            },
        });
        return {
            id,
            owner,
            ...parseDomains(objects),
        };
    }
}

export interface WithIds {
    objectIds: string[];
}

type FetchFnParser<RpcResponse, DataModel> = (
    typedData: RpcResponse,
    suiObject: SuiObjectData,
    rpcResponse: SuiObjectResponse
) => DataModel | undefined;

type SuiObjectParser<RpcResponse, DataModel> = {
    parser: FetchFnParser<RpcResponse, DataModel>;
    regex: RegExp;
};

type ID = {
    id: string;
};

type Bag = {
    type: string;
    fields: {
        id: ID;
        size: number;
    };
};

type NftRpcResponse = {
    logical_owner: string;
    bag: Bag;
};

type NftRaw = {
    id: string;
    logicalOwner: string;
    bagId: string;
};

type DomainRpcBase<T> = {
    id: ID;
    name: {
        type: string;
        fields: {
            dummy_field: boolean;
        };
    };
    value: {
        type: string;
        fields: T;
    };
};

type UrlDomainRpcResponse = DomainRpcBase<{
    url: string;
}>;

type DisplayDomainRpcResponse = DomainRpcBase<{
    description: string;
    name: string;
}>;

type NftDomains = {
    url: string;
    name: string;
    description: string;
};

export type Nft = {
    nft: NftRaw;
    fields?: Partial<NftDomains>;
};

const NftRegex =
    /(0x[a-f0-9]{39,40})::nft::Nft<0x[a-f0-9]{39,40}::([a-zA-Z]{1,})::([a-zA-Z]{1,})>/;
const UrlDomainRegex =
    /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::UrlDomain>, (0x[a-f0-9]{39,40})::display::UrlDomain>/;
const DisplayDomainRegex =
    /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::DisplayDomain>, (0x[a-f0-9]{39,40})::display::DisplayDomain>/;

export const NftParser: SuiObjectParser<NftRpcResponse, NftRaw> = {
    parser: (data, suiData, rpcResponse) => {
        if (
            typeof rpcResponse.data === 'object' &&
            'owner' in rpcResponse.data
        ) {
            const { owner } = rpcResponse.data;

            const matches = (suiData.content as SuiMoveObject).type.match(
                NftRegex
            );
            if (!matches) {
                return undefined;
            }
            const packageObjectId = matches[1];
            const packageModule = matches[2];
            const packageModuleClassName = matches[3];

            return {
                owner,
                type: suiData.content?.dataType,
                id: rpcResponse.data?.objectId,
                packageObjectId,
                packageModule,
                packageModuleClassName,
                rawResponse: rpcResponse,
                logicalOwner: data.logical_owner,
                bagId: data.bag.fields.id.id,
            };
        }
        return undefined;
    },
    regex: NftRegex,
};

const isTypeMatchRegex = (d: SuiObjectResponse, regex: RegExp) => {
    const { data } = d;
    if (is(data, SuiObjectData)) {
        const { content } = data;
        if (content && 'type' in content) {
            return content.type.match(regex);
        }
    }
    return false;
};

export const parseDomains = (domains: SuiObjectResponse[]) => {
    const response: Partial<NftDomains> = {};
    const urlDomain = domains.find((d) => isTypeMatchRegex(d, UrlDomainRegex));
    const displayDomain = domains.find((d) =>
        isTypeMatchRegex(d, DisplayDomainRegex)
    );

    if (urlDomain && getObjectFields(urlDomain)) {
        const url = (getObjectFields(urlDomain) as UrlDomainRpcResponse).value
            .fields.url;
        response.url = ipfs(url);
    }
    if (displayDomain && getObjectFields(displayDomain)) {
        response.description = (
            getObjectFields(displayDomain) as DisplayDomainRpcResponse
        ).value.fields.description;
        response.name = (
            getObjectFields(displayDomain) as DisplayDomainRpcResponse
        ).value.fields.name;
    }

    return response;
};

export class NftClient {
    private provider: JsonRpcProvider;

    constructor(provider: JsonRpcProvider) {
        this.provider = provider;
    }

    parseObjects = async (objects: SuiObjectResponse[]): Promise<NftRaw[]> => {
        const parsedObjects = objects
            .map((object) => {
                if (getObjectType(object)?.match(NftParser.regex)) {
                    const data = getSuiObjectData(object);
                    if (data) {
                        return NftParser.parser(
                            getObjectFields(object) as NftRpcResponse,
                            data,
                            object
                        );
                    }
                }
                return undefined;
            })
            .filter((object): object is NftRaw => !!object);

        return parsedObjects;
    };

    fetchAndParseObjectsById = async (ids: string[]): Promise<NftRaw[]> => {
        if (ids.length === 0) {
            return new Array<NftRaw>();
        }
        const objects = await this.provider.multiGetObjects({
            ids,
            options: {
                showContent: true,
                showType: true,
                showDisplay: true,
                showOwner: true,
            },
        });
        return this.parseObjects(objects);
    };

    getBagContent = async (bagId: string) => {
        const bagObjects = await this.provider.getDynamicFields({
            parentId: bagId,
        });
        const objectIds = bagObjects.data.map(
            (bagObject) => bagObject.objectId
        );
        return this.provider.multiGetObjects({
            ids: objectIds,
            options: {
                showContent: true,
                showType: true,
                showDisplay: true,
                showOwner: true,
            },
        });
    };

    getNftsById = async (params: WithIds): Promise<Nft[]> => {
        const nfts = await this.fetchAndParseObjectsById(params.objectIds);
        const bags = await Promise.all(
            nfts.map(async (nft) => {
                const content = await this.getBagContent(nft.bagId);
                return {
                    nftId: nft.id,
                    content: parseDomains(content),
                };
            })
        );
        const bagsByNftId = new Map(bags.map((b) => [b.nftId, b]));

        return nfts.map((nft) => {
            const fields = bagsByNftId.get(nft.id);
            return {
                nft,
                fields: fields?.content,
            };
        });
    };
}

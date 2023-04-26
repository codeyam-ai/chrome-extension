import aPass from '_images/dapps/logos/aPass.png';
import addressBook from '_images/dapps/logos/address-book.png';
import aftermath from '_images/dapps/logos/aftermath.png';
import araya from '_images/dapps/logos/araya.png';
import myAssets from '_images/dapps/logos/assets.png';
import bayswap from '_images/dapps/logos/bayswap.png';
import blueMove from '_images/dapps/logos/blue-move.png';
import capyai from '_images/dapps/logos/capyai.png';
import capyart from '_images/dapps/logos/capyart.png';
import cetus from '_images/dapps/logos/cetus.png';
import clutchy from '_images/dapps/logos/clutchy.jpg';
import collectibles from '_images/dapps/logos/collectibles.png';
import customize from '_images/dapps/logos/customize.png';
import explorer from '_images/dapps/logos/explorer.png';
import finalStardust from '_images/dapps/logos/final-stardust.png';
import gotbeef from '_images/dapps/logos/gotbeef.png';
import interestProtocol from '_images/dapps/logos/interest-protocol.png';
import keepsake from '_images/dapps/logos/keepsake.png';
import kriya from '_images/dapps/logos/kriya.png';
import { default as movex } from '_images/dapps/logos/movex.png';
import polymediachat from '_images/dapps/logos/polymediachat.png';
import staking from '_images/dapps/logos/staking.png';
import sui8192 from '_images/dapps/logos/sui-8192.png';
import suiCheckers from '_images/dapps/logos/sui-checkers.png';
import suiChess from '_images/dapps/logos/sui-chess.png';
import suins from '_images/dapps/logos/suins.png';
import tokens from '_images/dapps/logos/tokens.png';
import turbos from '_images/dapps/logos/turbos.png';
import typus from '_images/dapps/logos/typus.png';
import aPassScreenshot1 from '_images/dapps/screenshots/aPass-1.jpg';
import aPassScreenshot2 from '_images/dapps/screenshots/aPass-2.jpg';
import addressScreenshot1 from '_images/dapps/screenshots/address-1.png';
import assetsScreenshot1 from '_images/dapps/screenshots/assets-1.png';
import assetsScreenshot2 from '_images/dapps/screenshots/assets-2.png';
import bayswapScreenshot1 from '_images/dapps/screenshots/bayswap-1.png';
import bayswapScreenshot2 from '_images/dapps/screenshots/bayswap-2.png';
import finalStardustScreenshot1 from '_images/dapps/screenshots/final-stardust-1.jpg';
import finalStardustScreenshot2 from '_images/dapps/screenshots/final-stardust-2.jpg';
import gotbeefscreenshot1 from '_images/dapps/screenshots/gotbeef-1.png';
import gotbeefscreenshot2 from '_images/dapps/screenshots/gotbeef-2.png';
import interestProtocolScreenshot1 from '_images/dapps/screenshots/interest-protocol-1.png';
import interestProtocolScreenshot2 from '_images/dapps/screenshots/interest-protocol-2.png';
import interestProtocolScreenshot3 from '_images/dapps/screenshots/interest-protocol-3.png';
import keepsakeScreenshot1 from '_images/dapps/screenshots/keepsake-1.jpg';
import keepsakeScreenshot2 from '_images/dapps/screenshots/keepsake-2.jpg';
import keepsakeScreenshot3 from '_images/dapps/screenshots/keepsake-3.jpg';
import movexScreenshot1 from '_images/dapps/screenshots/movex-1.png';
import movexScreenshot2 from '_images/dapps/screenshots/movex-2.png';
import polymediascreenshot1 from '_images/dapps/screenshots/polymedia-1.png';
import polymediascreenshot2 from '_images/dapps/screenshots/polymedia-2.png';
import sui8192screenshot1 from '_images/dapps/screenshots/sui8192-1.png';
import sui8192screenshot2 from '_images/dapps/screenshots/sui8192-2.png';
import typusScreenshot1 from '_images/dapps/screenshots/typus-1.png';
import typusScreenshot2 from '_images/dapps/screenshots/typus-2.png';

import type { DappData } from 'src/types/DappData';
// import { NetworkName } from 'src/enums/network';
// import { TagName } from 'src/types/Tag';
export enum NetworkName {
    DEVNET = 'devnet',
    TESTNET = 'testnet',
}
export enum TagName {
    ALL = 'All',
    FAVORITES = 'Favorites',
    MARKETPLACE = 'Marketplace',
    FINANCE = 'Finance',
    GAMES = 'Games',
    NFTS = 'NFTs',
    TOOLS = 'Tools',
    SOCIAL = 'Social',
}

export interface Tag {
    name: TagName;
    color: string;
}

export const ADDRESS_BOOK_ID = '85f70cfc-fb4c-408c-b78a-f0757589b999';
export const MY_ASSETS_ID = '580b2639-0e50-4042-a5af-edbb6a9dfca2';
export const TOKENS_ID = '580b2639-0e50-4042-a5af-edbb6a9dfca2';
export const COLLECTIBLES_ID = '580b2639-0e50-4042-a5af-edbb6a9dfca2';
export const EXPLORER_ID = 'e6539937-7cad-4a15-bc31-49d963e392ff';

export const CUSTOMIZE_ID = '5bbe5c3d-88a2-4537-92a5-20b6021e2ea3';
export const STAKING_ID = 'c97b5592-ae1f-4dd4-a903-050a97c4d84a';

const dappsMap: Map<string, DappData> = new Map([
    [
        CUSTOMIZE_ID,
        {
            id: '5bbe5c3d-88a2-4537-92a5-20b6021e2ea3',
            image: customize,
            title: 'Customize',
            description: 'NOT YET IMPLEMENTED IN EXPLORER',
            urls: {
                CUSTOM_RPC: 'customize',
                [NetworkName.DEVNET]: 'customize',
                [NetworkName.TESTNET]: 'customize',
            },
            tags: [TagName.TOOLS],
            isLocal: true,
        } as DappData,
    ],
    [
        ADDRESS_BOOK_ID,
        {
            id: ADDRESS_BOOK_ID,
            image: addressBook,
            title: 'Address Book',
            description:
                'Manage all of the addresses you frequently interact with. Easily send coins and assets to an address.',
            urls: {
                CUSTOM_RPC: 'address-book',
                [NetworkName.DEVNET]: 'address-book',
                [NetworkName.TESTNET]: 'address-book',
            },
            tags: [TagName.TOOLS],
            images: [addressScreenshot1],
            isLocal: true,
        } as DappData,
    ],
    [
        STAKING_ID,
        {
            id: STAKING_ID,
            image: staking,
            title: 'Staking',
            description: 'Stake your SUI assets and earn rewards.',
            urls: {
                [NetworkName.DEVNET]: 'staking',
                [NetworkName.TESTNET]: 'staking',
            },
            tags: [TagName.TOOLS],
            images: [addressScreenshot1],
            isLocal: true,
        } as DappData,
    ],
    [
        MY_ASSETS_ID,
        {
            id: MY_ASSETS_ID,
            image: myAssets,
            title: 'My Assets',
            description:
                'Manage all of the assets you own. Access relevant dapps for each asset or bulk send a number of assets.',
            urls: {
                [NetworkName.DEVNET]: '/dapps/assets',
                [NetworkName.TESTNET]: '/dapps/assets',
            },
            tags: [TagName.TOOLS],
            images: [assetsScreenshot1, assetsScreenshot2],
        } as DappData,
    ],
    [
        TOKENS_ID,
        {
            id: TOKENS_ID,
            image: tokens,
            title: 'Tokens',
            description: 'Manage all of your tokens, view history, etc.',
            urls: {
                [NetworkName.DEVNET]: '/dashboard/tokens',
                [NetworkName.TESTNET]: '/dashboard/tokens',
            },
            tags: [],
        } as DappData,
    ],
    [
        COLLECTIBLES_ID,
        {
            id: COLLECTIBLES_ID,
            image: collectibles,
            title: 'Collectibles',
            description: 'Show case your favorite collectibles.',
            urls: {
                [NetworkName.DEVNET]: '/dashboard/collectibles',
                [NetworkName.TESTNET]: '/dashboard/collectibles',
            },
            tags: [],
        } as DappData,
    ],
    [
        EXPLORER_ID,
        {
            id: EXPLORER_ID,
            image: explorer,
            title: 'Block Explorer',
            description: 'View transactions on the Sui blockchain.',
            urls: {
                [NetworkName.DEVNET]: 'https://explorer.sui.io',
                [NetworkName.TESTNET]: 'https://explorer.sui.io',
            },
            tags: [],
        } as DappData,
    ],
    [
        '7f7bd5f0-cda7-461e-814f-4919e5e7b2aa',
        {
            id: '7f7bd5f0-cda7-461e-814f-4919e5e7b2aa',
            image: capyai,
            title: 'Capy.AI',
            description:
                'Win SUI by creating the best background for your CAPY with AI!',
            urls: {
                [NetworkName.TESTNET]: 'https://capy.ai/',
            },
            tags: [TagName.NFTS],
        } as DappData,
    ],
    [
        '0cce5967-cc9e-45f8-ab0a-eabfcd9f7761',
        {
            id: '0cce5967-cc9e-45f8-ab0a-eabfcd9f7761',
            image: sui8192,
            title: 'Sui 8192',
            description:
                'The fastest fully on-chain game this side of the Mississippi. Compete for the high score!',
            urls: {
                [NetworkName.DEVNET]: 'https://ethoswallet.github.io/Sui8192',
                [NetworkName.TESTNET]: 'https://ethoswallet.github.io/Sui8192',
            },
            images: [sui8192screenshot1, sui8192screenshot2],
            tags: [TagName.GAMES],
        } as DappData,
    ],
    [
        '3d396f2b-ebd0-4ad4-97b1-d63eb37ac48b',
        {
            id: '3d396f2b-ebd0-4ad4-97b1-d63eb37ac48b',
            image: capyart,
            title: 'SuiFrens',
            description:
                'Join SuiFrens on their adventures and experience the world on a bright and optimistic note.',
            urls: {
                [NetworkName.TESTNET]: 'https://testnet.suifrens.com/',
            },
            tags: [TagName.NFTS],
        } as DappData,
    ],
    [
        '3eecdc57-cfa7-400d-b116-199ec2f47a88',
        {
            id: '3eecdc57-cfa7-400d-b116-199ec2f47a88',
            image: suins,
            title: 'SuiNS',
            description:
                'Replace your wallet address with a SuiNS profile that you own.',
            urls: {
                [NetworkName.DEVNET]: 'https://www.suins.io/',
            },
            tags: [TagName.TOOLS],
        } as DappData,
    ],
    [
        '55f6fa71-d593-4832-a24c-e72569e27c5d',
        {
            id: '55f6fa71-d593-4832-a24c-e72569e27c5d',
            image: suiChess,
            title: 'Sui Chess',
            description:
                'Who will make the first strike? Play this fully on-chain chess experience.',
            urls: {
                // [NetworkName.DEVNET]: 'https://bit.ly/ethos-chess',
            },
            tags: [TagName.GAMES],
        } as DappData,
    ],
    [
        '0ededd65-ca5c-4b1d-a437-53425f5d4211',
        {
            id: '0ededd65-ca5c-4b1d-a437-53425f5d4211',
            image: suiCheckers,
            title: 'Sui Checkers',
            description:
                'A great, fully on-chain, casual game to play against your friends.',
            urls: {
                // [NetworkName.DEVNET]: 'https://bit.ly/ethos-checkers',
            },
            tags: [TagName.GAMES],
        } as DappData,
    ],
    [
        '7f49b442-5339-4da0-81b4-f305225fbfc1',
        {
            id: '7f49b442-5339-4da0-81b4-f305225fbfc1',
            image: polymediachat,
            title: 'Polymedia Chat',
            description:
                'Unstoppable chats, fully on-chain. Join or create a chat room and invite your friends!',
            urls: {
                [NetworkName.DEVNET]:
                    'https://chat.polymedia.app/@sui-fans?network=devnet',
                [NetworkName.TESTNET]:
                    'https://chat.polymedia.app/@sui-fans?network=testnet',
            },
            images: [polymediascreenshot1, polymediascreenshot2],
            tags: [TagName.SOCIAL],
        } as DappData,
    ],
    [
        '0dffe5d6-47ab-4328-97e7-14414b64f0e4',
        {
            id: '0dffe5d6-47ab-4328-97e7-14414b64f0e4',
            image: gotbeef,
            title: 'Got Beef',
            description:
                'The easiest and safest way to make casual bets with friends in crypto.',
            urls: {
                [NetworkName.DEVNET]: 'https://gotbeef.app/?network=devnet',
                [NetworkName.TESTNET]: 'https://gotbeef.app/?network=testnet',
            },
            images: [gotbeefscreenshot1, gotbeefscreenshot2],
            tags: [TagName.SOCIAL],
        } as DappData,
    ],
    [
        '724cdd8d-9689-4688-9004-34c75813b2da',
        {
            id: '724cdd8d-9689-4688-9004-34c75813b2da',
            image: keepsake,
            title: 'Keepsake',
            description:
                'Keepsake is a re-imagined gaming NFT marketplace focused on a strong emphasis on NFT utility and discoverability of digital assets through web3 gaming on Sui blockchain.',
            urls: {
                [NetworkName.DEVNET]: 'https://keepsake.gg/',
                [NetworkName.TESTNET]: 'https://beta.keepsake.gg/',
            },
            images: [
                keepsakeScreenshot1,
                keepsakeScreenshot2,
                keepsakeScreenshot3,
            ],
            tags: [TagName.MARKETPLACE, TagName.GAMES, TagName.NFTS],
        } as DappData,
    ],
    [
        '9c77ae4e-ff6a-4f99-982e-6750d27a19a1',
        {
            id: '9c77ae4e-ff6a-4f99-982e-6750d27a19a1',
            image: aftermath,
            title: 'Aftermath',
            description:
                "One-stop DeFi hub built on Sui, backed by Mysten Labs. We're bringing the CEX experience onchain.",
            urls: {
                [NetworkName.DEVNET]: 'https://devnet.aftermath.finance',
                [NetworkName.TESTNET]: 'https://testnet.aftermath.finance',
            },
            tags: [TagName.FINANCE, TagName.NFTS],
        } as DappData,
    ],
    [
        'fc2a59bc-a5ca-4ea0-bfd9-928209086f85',
        {
            id: 'fc2a59bc-a5ca-4ea0-bfd9-928209086f85',
            image: blueMove,
            title: 'Blue Move',
            description: 'NFT Marketplace',
            urls: {
                [NetworkName.DEVNET]: 'https://sui.bluemove.net/',
            },
            tags: [TagName.MARKETPLACE],
        } as DappData,
    ],
    [
        '717c4e3f-474d-4c68-9a94-a45556be5920',
        {
            id: '717c4e3f-474d-4c68-9a94-a45556be5920',
            image: turbos,
            title: 'Turbos',
            description: 'Perpetuals Exchange',
            urls: {
                // [NetworkName.DEVNET]: 'https://turbos.finance/',
            },
            tags: [TagName.FINANCE],
        } as DappData,
    ],
    [
        'e15d733b-d62b-41f4-a3cf-6bbd256881f2',
        {
            id: 'e15d733b-d62b-41f4-a3cf-6bbd256881f2',
            image: kriya,
            title: 'KriyaDEX',
            description: 'Decentralized Exchange',
            urls: {
                [NetworkName.DEVNET]: 'https://www.kriya.finance/',
            },
            tags: [TagName.FINANCE],
        } as DappData,
    ],
    [
        '39d3a866-033c-43ac-906d-d7417c10ccfb',
        {
            id: '39d3a866-033c-43ac-906d-d7417c10ccfb',
            image: clutchy,
            title: 'Clutchy',
            description: 'NFT Marketplace',
            urls: {
                [NetworkName.DEVNET]: 'https://clutchy.io/',
            },
            tags: [TagName.MARKETPLACE],
        } as DappData,
    ],
    [
        '78dac2d4-2a35-4fbd-a9c4-d1edd6d93229',
        {
            id: '78dac2d4-2a35-4fbd-a9c4-d1edd6d93229',
            image: araya,
            title: 'Araya Finance',
            description: 'DeFi Protocol',
            urls: {
                [NetworkName.DEVNET]: 'https://www.arayafi.org/',
            },
            tags: [TagName.FINANCE],
        } as DappData,
    ],
    [
        '5995f110-be28-4c09-b258-b888375763fb',
        {
            id: '5995f110-be28-4c09-b258-b888375763fb',
            image: cetus,
            title: 'Cetus',
            description:
                'Cetus is a pioneer DEX and concentrated liquidity protocol focusing on Move-based ecosystems like Aptos and Sui.',
            urls: {
                [NetworkName.TESTNET]: 'https://app.cetus.zone',
            },
            tags: [TagName.FINANCE],
        } as DappData,
    ],
    [
        'c2f2e385-baec-4ccc-85c2-4dfc428bb457',
        {
            id: 'c2f2e385-baec-4ccc-85c2-4dfc428bb457',
            image: bayswap,
            title: 'BaySwap',
            description:
                'Trade your Stable & Uncorrelated crypto assets. Yield Farming!',
            urls: {
                [NetworkName.DEVNET]: 'https://app.bayswap.io/',
                [NetworkName.TESTNET]: 'https://app.bayswap.io/',
            },
            images: [bayswapScreenshot1, bayswapScreenshot2],
            tags: [TagName.FINANCE, TagName.TOOLS],
        } as DappData,
    ],
    [
        'ddd6d9cd-0849-40ec-ac6a-7bff10f60372',
        {
            id: 'ddd6d9cd-0849-40ec-ac6a-7bff10f60372',
            image: typus,
            title: 'Typus Finance',
            description:
                'Typus is a real yield infrastructure that integrates swap, lending, and derivatives building on top of the Sui ecosystem.',
            urls: {
                [NetworkName.TESTNET]:
                    'https://testnet.typus.finance/vault/coveredcall/',
            },
            images: [typusScreenshot1, typusScreenshot2],
            tags: [TagName.FINANCE],
        } as DappData,
    ],
    [
        'ddd6d9cd-0849-40ec-ac6a-7bff10f60372',
        {
            id: 'ddd6d9cd-0849-40ec-ac6a-7bff10f60372',
            image: typus,
            title: 'Typus Finance',
            description:
                'Typus is a real yield infrastructure that integrates swap, lending, and derivatives building on top of the Sui ecosystem.',
            urls: {
                [NetworkName.TESTNET]:
                    'https://testnet.typus.finance/vault/coveredcall/',
            },
            images: [typusScreenshot1, typusScreenshot2],
            tags: [TagName.FINANCE],
        } as DappData,
    ],
    [
        'e385b15b-9bf7-4cf1-8dd3-1faf50917540',
        {
            id: 'e385b15b-9bf7-4cf1-8dd3-1faf50917540',
            image: interestProtocol,
            title: 'Interest Protocol',
            description:
                'Interest Protocol is a DeFi Platform that allows you to Swap, Lend & Borrow.',
            urls: {
                [NetworkName.DEVNET]:
                    'https://sui.interestprotocol.com/en-US/dapp/dex',
                [NetworkName.TESTNET]:
                    'https://sui.interestprotocol.com/en-US/dapp/dex',
            },
            images: [
                interestProtocolScreenshot1,
                interestProtocolScreenshot2,
                interestProtocolScreenshot3,
            ],
            tags: [TagName.FINANCE],
        } as DappData,
    ],
    [
        '3197c7ca-4721-4f8b-a718-350dcd571119',
        {
            id: '3197c7ca-4721-4f8b-a718-350dcd571119',
            image: aPass,
            title: 'APass',
            description:
                'APass is a membership-based credit scoring center integrating DID, task growth, market, GameFi, social, and AI. We try to create the first blockchain credit system for users.',
            urls: {
                [NetworkName.DEVNET]: 'https://sui.apass.network',
                [NetworkName.TESTNET]: 'https://sui.apass.network',
            },
            images: [aPassScreenshot1, aPassScreenshot2],
            tags: [TagName.GAMES, TagName.NFTS],
        } as DappData,
    ],
    [
        'b5a40a98-1a3a-40a8-a4d2-c1ea31c60d97',
        {
            id: 'b5a40a98-1a3a-40a8-a4d2-c1ea31c60d97',
            image: finalStardust,
            title: 'Final Stardust: Cosmic Nexus',
            description:
                'Final Stardust is a media franchise in the making, with its first installment being "Final Stardust: Cosmic Nexus", a digital collectible card game inspired by big Japanese/Anime TCG games.',
            urls: {},
            images: [finalStardustScreenshot1, finalStardustScreenshot2],
            tags: [TagName.GAMES, TagName.NFTS],
        } as DappData,
    ],
    [
        '5bb54920-6855-466b-811b-5c766f482d98',
        {
            id: '5bb54920-6855-466b-811b-5c766f482d98',
            image: movex,
            title: 'Movex',
            description:
                'MovEX,  #1 Hyper Defi Platform built to provide the best trading and liquidity provision experience for users and project developers on Sui. We serve our users throughout the lifecycle of a token from initial liquidity offering service to trading on AMM swap and DeepBook, the central limit order book on Sui. MovEX built DeepBook, the central limit order book as a public good for whole Sui ecosystem and now DeepBook is part of Sui framework and serves as the foundational liquidity layer on Sui.',
            urls: {},
            images: [movexScreenshot1, movexScreenshot2],
            tags: [TagName.FINANCE],
        } as DappData,
    ],
]);
export default dappsMap;

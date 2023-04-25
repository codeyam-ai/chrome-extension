/* eslint-disable no-unused-vars */
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

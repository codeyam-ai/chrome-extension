import type { TagName } from './Tag';

export type DappData = {
    id: string;
    image: string;
    title: string;
    description: string;
    urls: Record<string, string>;
    images?: string[];
    tags: TagName[];
    isLocal?: boolean;
};

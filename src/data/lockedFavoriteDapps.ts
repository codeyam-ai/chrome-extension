import dappsMap, {
    ADDRESS_BOOK_ID,
    COLLECTIBLES_ID,
    CUSTOMIZE_ID,
} from './dappsMap';

import type { DappData } from '_src/types/DappData';

export const LOCKED_FAVORITES_KEYS = [CUSTOMIZE_ID, ADDRESS_BOOK_ID];
export const EXPLORER_ONLY_KEYS = [COLLECTIBLES_ID];

export const LOCKED_FAVORITE_DAPPS: DappData[] = Array.from(
    LOCKED_FAVORITES_KEYS.map((key) => dappsMap.get(key))
).filter((item) => item !== undefined) as DappData[];

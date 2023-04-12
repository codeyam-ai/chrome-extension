import type { BasePayload } from '_payloads';
import type { Favorite } from '_src/types/AccountCustomization';

export interface GetFavoritesResponse extends BasePayload {
    type: 'get-favorites-response';
    favorites: Favorite[];
}

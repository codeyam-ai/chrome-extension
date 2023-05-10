import type { BasePayload } from '_payloads';

export interface GetFavoritesResponse extends BasePayload {
    type: 'get-favorites-response';
    favorites: string[];
}

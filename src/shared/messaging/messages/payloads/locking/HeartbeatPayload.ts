import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';

export interface HeartbeatPayload extends BasePayload {
    type: 'heartbeat';
}

export function isHeartbeatPayload(
    payload: Payload
): payload is HeartbeatPayload {
    return isBasePayload(payload) && payload.type === 'heartbeat';
}

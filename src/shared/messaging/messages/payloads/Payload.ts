import type { BasePayload } from './BasePayload';
import type { ErrorPayload } from './ErrorPayload';

export type Payload = BasePayload | ErrorPayload;

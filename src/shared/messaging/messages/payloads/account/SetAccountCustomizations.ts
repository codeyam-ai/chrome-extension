import { isBasePayload } from '_payloads';

import type { BasePayload, Payload } from '_payloads';
import type { AccountCustomizationWithAddress } from '_src/types/AccountCustomization';

export interface SetAccountCustomizations extends BasePayload {
    type: 'set-account-customizations';
    accountCustomizations: AccountCustomizationWithAddress[];
}

export function isSetAccountCustomizations(
    payload: Payload
): payload is SetAccountCustomizations {
    return (
        isBasePayload(payload) && payload.type === 'set-account-customizations'
    );
}

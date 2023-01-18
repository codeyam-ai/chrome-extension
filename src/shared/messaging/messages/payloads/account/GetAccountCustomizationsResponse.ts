import type { BasePayload } from '_payloads';
import type { AccountCustomization } from '_src/types/AccountCustomization';

export interface GetAccountCustomizationsResponse extends BasePayload {
    type: 'get-account-customizations-response';
    accountCustomizations: AccountCustomization[];
}

import type { BasePayload } from '_payloads';
import type { AccountCustomizationWithAddress } from '_src/types/AccountCustomization';

export interface GetAccountCustomizationsResponse extends BasePayload {
    type: 'get-account-customizations-response';
    accountCustomizations: AccountCustomizationWithAddress[];
}

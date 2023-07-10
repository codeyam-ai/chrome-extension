import { explorerApiCall } from '_src/shared/utils/customizationsSync/ethosPlatformApiCall';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

const saveCustomizations = async (
    jwt: string,
    accountCustomization: AccountInfo
): Promise<any> => {
    const requestBody: Record<string, string> = {
        data: JSON.stringify(accountCustomization),
    };
    const res = await explorerApiCall(
        'v1/user/profile',
        'PUT',
        jwt,
        requestBody
    );
    return res;
};

export default saveCustomizations;

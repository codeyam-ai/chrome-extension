import { explorerApiCall } from '_src/shared/utils/customizationsSync/ethosPlatformApiCall';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

const getCustomizations = async (
    jwt: string
): Promise<AccountInfo | undefined> => {
    const { json, status } = await explorerApiCall(
        'v1/user/profile',
        'GET',
        jwt
    );

    if (status !== 200 && !json) {
        return undefined;
    }

    const customizations = json.data as AccountInfo;
    return customizations;
};

export default getCustomizations;

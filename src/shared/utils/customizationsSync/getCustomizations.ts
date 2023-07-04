import { explorerApiCall } from '_src/shared/utils/customizationsSync/ethosPlatformApiCall';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

const getCustomizations = async (jwt: string): Promise<AccountInfo> => {
    const res = await explorerApiCall('v1/user/profile', 'GET', jwt);
    const customizations = res.json.data as AccountInfo;
    return customizations;
};

export default getCustomizations;

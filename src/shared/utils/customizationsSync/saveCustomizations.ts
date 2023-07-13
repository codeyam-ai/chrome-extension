import { explorerApiCall } from '_src/shared/utils/customizationsSync/ethosPlatformApiCall';

const saveCustomizations = async (
    jwt: string,
    encryptedAccountCustomization: string
): Promise<any> => {
    const requestBody: Record<string, string> = {
        data: encryptedAccountCustomization,
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

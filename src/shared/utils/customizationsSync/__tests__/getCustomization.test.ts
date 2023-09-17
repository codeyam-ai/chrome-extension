import { decryptAccountCustomization } from '_src/shared/utils/customizationsSync/accountCustomizationEncryption';
import { explorerApiCall } from '_src/shared/utils/customizationsSync/ethosPlatformApiCall';
import getCustomization from '_src/shared/utils/customizationsSync/getCustomization';

jest.mock('_src/shared/utils/customizationsSync/ethosPlatformApiCall', () => ({
  explorerApiCall: jest.fn()
}));

jest.mock('_src/shared/utils/customizationsSync/accountCustomizationEncryption', () => ({
  decryptAccountCustomization: jest.fn()
}));

beforeEach(() => {
  (explorerApiCall as jest.Mock).mockClear();
  (decryptAccountCustomization as jest.Mock).mockClear(); 
});

describe('getCustomization', () => {
  test('returns decrypted account customization when explorerApiCall returns status 200 and json object', async () => {
    const jwt = 'test-jwt';
    const privateKey = 'test-private-key';
    const mockJson = { data: 'test-data' };
    const mockDecryptedAccountCustomization = { accountInfo: 'test-account-info' };
    (explorerApiCall as jest.Mock).mockResolvedValue({ json: mockJson, status: 200 });
    (decryptAccountCustomization as jest.Mock).mockReturnValue(mockDecryptedAccountCustomization);
    const result = await getCustomization(jwt, privateKey);
    expect(result).toEqual(mockDecryptedAccountCustomization);
    expect(explorerApiCall).toHaveBeenCalledWith('v1/user/profile', 'GET', jwt);
    expect(decryptAccountCustomization).toHaveBeenCalledWith(mockJson.data, privateKey);
  });

  test('returns undefined when explorerApiCall returns status other than 200', async () => {
    const jwt = 'test-jwt';
    const privateKey = 'test-private-key';
    (explorerApiCall as jest.Mock).mockResolvedValue({ status: 404 });
    const result = await getCustomization(jwt, privateKey);
    expect(result).toBeUndefined();
    expect(explorerApiCall).toHaveBeenCalledWith('v1/user/profile', 'GET', jwt);
    expect(decryptAccountCustomization).not.toHaveBeenCalled();
  });
});

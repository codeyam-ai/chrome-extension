import Browser from 'webextension-polyfill';

import FeatureGating from '../FeatureGating';
import NetworkEnv, { type NetworkEnvType } from '../NetworkEnv';
import { API_ENV } from '_app/ApiProvider';

jest.mock('../FeatureGating', () => ({
    getGrowthBook: jest.fn()
}));

describe('NetworkEnv', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getActiveNetwork', () => {
    it('should return the default network if the current network is not available', async () => {
      Browser.storage.local.get = jest.fn().mockResolvedValue({
        sui_Env: API_ENV.testNet,
        sui_Env_RPC: null
      });

      const result = await NetworkEnv.getActiveNetwork();
      expect(result.env).not.toBe(API_ENV.mainNet);
    });

    it('should return the current network if it is available', async () => {
      Browser.storage.local.get = jest.fn().mockResolvedValue({
        sui_Env: API_ENV.testNet,
        sui_Env_RPC: null
      });

      const result = await NetworkEnv.getActiveNetwork();
      expect(result.env).toBe(API_ENV.testNet);
    });
  });

  describe('setActiveNetwork', () => {
    it('should throw an error if the new network is not available', async () => {
      expect.assertions(1);
      const network: NetworkEnvType = { env: API_ENV.mainNet, customRpcUrl: null };

      (FeatureGating.getGrowthBook as jest.Mock).mockResolvedValue({
        isOn: jest.fn(() => false)
      });

      try {
        await NetworkEnv.setActiveNetwork(network);
      } catch (e) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(e).toBeTruthy();
      }
    });

    it('should update the network if the new network is available', async () => {
      const network: NetworkEnvType = { env: API_ENV.testNet, customRpcUrl: null };
      Browser.storage.local.get = jest.fn().mockResolvedValueOnce({});
      Browser.storage.local.set = jest.fn();

      await NetworkEnv.setActiveNetwork(network);
      expect(Browser.storage.local.set).toHaveBeenCalled();
    });
  });
});
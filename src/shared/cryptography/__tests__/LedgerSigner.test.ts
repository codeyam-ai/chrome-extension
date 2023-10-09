import { Ed25519PublicKey } from '@mysten/sui.js/keypairs/ed25519';

import { LedgerSigner } from '../LedgerSigner';

import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { SuiClient } from '@mysten/sui.js/client';
import * as cryptography from '@mysten/sui.js/cryptography';

jest.mock('@mysten/sui.js/keypairs/ed25519', () => {
  return {
    Ed25519PublicKey: jest.fn().mockImplementation(() => {
      const mockInstance = {
        toSuiAddress: jest.fn().mockReturnValue('mockSuiAddress'),
        toBytes: jest.fn().mockReturnValue('mockBytes')
      };
      Object.setPrototypeOf(mockInstance, Ed25519PublicKey.prototype);
      return mockInstance;
    }),
  };
});

jest.mock('../WalletSigner');

// Create mock instances
const mockSuiLedgerClient = {
  getPublicKey: jest.fn().mockResolvedValue({ publicKey: 'mockPublicKey' }),
  signTransaction: jest.fn().mockResolvedValue({ signature: 'mockSignature' }),
};
const mockSuiClient = {};

describe('LedgerSigner', () => {
  let ledgerSigner: LedgerSigner;

  beforeEach(() => {
    jest.spyOn(cryptography, 'toSerializedSignature').mockReturnValue('mockSerializedSignature');

    ledgerSigner = new LedgerSigner(
      async () => mockSuiLedgerClient as unknown as SuiLedgerClient,
      'derivationPath',
      mockSuiClient as unknown as SuiClient
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get address', async () => {
    const address = await ledgerSigner.getAddress();
    expect(mockSuiLedgerClient.getPublicKey).toHaveBeenCalledWith('derivationPath');
    expect(address).toBe('mockSuiAddress');
  });

  it('should get public key', async () => {
    const publicKey = await ledgerSigner.getPublicKey();
    expect(mockSuiLedgerClient.getPublicKey).toHaveBeenCalledWith('derivationPath');
    expect(publicKey).toBeInstanceOf(Ed25519PublicKey);
  });

  it('should sign data', async () => {
    const data = new Uint8Array([1, 2, 3]);
    const signature = await ledgerSigner.signData(data);
    expect(mockSuiLedgerClient.signTransaction).toHaveBeenCalledWith('derivationPath', data);
    expect(signature).toBe('mockSerializedSignature');
  });

  it('should connect to a new client', () => {
    const newLedgerSigner = ledgerSigner.connect(mockSuiClient as unknown as SuiClient);
    expect(newLedgerSigner).toBeInstanceOf(LedgerSigner);
  });
});

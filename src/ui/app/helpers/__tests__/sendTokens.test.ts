import * as getSignerModule from '../getSigner';
import sendTokens from '../sendTokens';

import type { AccountInfo } from '../../KeypairVault';
import type { SuiMoveObject } from '@mysten/sui.js/client';
import type { WalletSigner } from '_src/shared/cryptography/WalletSigner';

jest.mock('@mysten/sui.js/transactions', () => ({
    TransactionBlock: jest.fn().mockImplementation(() => {
        return {
            object: () => {
                return {};
            },
            pure: () => {
                return {};
            },
            splitCoins: () => {
                return {};
            },
            transferObjects: () => {
                return {};
            },
        };
    }),
}));

jest.mock('@mysten/sui.js/utils', () => ({
    SUI_TYPE_ARG: 'mocked_SUI_TYPE_ARG',
}));

jest.mock('../../redux/slices/sui-objects/Coin', () => ({
    Coin: {
        getID: jest.fn(),
    },
}));

describe('sendTokens', () => {
    const signAndExecuteTransactionBlock = jest.fn().mockReturnValue({});
    const mockSigner = {
        signAndExecuteTransactionBlock,
    } as unknown as WalletSigner;

    beforeEach(() => {
        jest.spyOn(getSignerModule, 'getSigner').mockReturnValue(
            Promise.resolve(mockSigner)
        );
        jest.clearAllMocks();
    });

    it('should handle token sending correctly when getSigner returns a signer', async () => {
        const mockConnectToLedger = jest.fn();
        const mockAllCoins: SuiMoveObject[] = [
            {
                dataType: 'moveObject',
                fields: {},
                hasPublicTransfer: true,
                type: 'mockType',
            },
        ];
        const mockPassphrase = 'passphrase';
        const mockAccountInfos: AccountInfo[] = [];
        const mockAddress = 'address';
        const mockAuthentication = 'authentication';
        const mockZkData = null;
        const mockActiveAccountIndex = 0;
        const mockTokenTypeArg = 'tokenTypeArg';
        const mockAmount = BigInt(100);
        const mockRecipientAddress = 'recipientAddress';

        const result = await sendTokens({
            connectToLedger: mockConnectToLedger,
            allCoins: mockAllCoins,
            passphrase: mockPassphrase,
            accountInfos: mockAccountInfos,
            address: mockAddress,
            authentication: mockAuthentication,
            zkData: mockZkData,
            activeAccountIndex: mockActiveAccountIndex,
            tokenTypeArg: mockTokenTypeArg,
            amount: mockAmount,
            recipientAddress: mockRecipientAddress,
        });

        expect(getSignerModule.getSigner).toHaveBeenCalled();
        expect(mockSigner.signAndExecuteTransactionBlock).toHaveBeenCalled();
        expect(result).toBeDefined();
    });

    it('should return null when getSigner returns undefined', async () => {
        jest.spyOn(getSignerModule, 'getSigner').mockReturnValueOnce(
            Promise.resolve(null)
        );

        const result = await sendTokens({
            connectToLedger: jest.fn(),
            allCoins: [
                {
                    dataType: 'moveObject',
                    fields: {},
                    hasPublicTransfer: true,
                    type: 'mockType',
                },
            ],
            passphrase: 'passphrase',
            accountInfos: [],
            address: 'address',
            authentication: 'authentication',
            zkData: null,
            activeAccountIndex: 0,
            tokenTypeArg: 'tokenTypeArg',
            amount: BigInt(100),
            recipientAddress: 'recipientAddress',
        });

        expect(result).toBeUndefined();
    });

    it('should handle token sending correctly when tokenTypeArg is not SUI_TYPE_ARG', async () => {
        const mockTokenTypeArg = 'not_SUI_TYPE_ARG';

        const result = await sendTokens({
            connectToLedger: jest.fn(),
            allCoins: [
                {
                    dataType: 'moveObject',
                    fields: {},
                    hasPublicTransfer: true,
                    type: 'mockType',
                },
            ],
            passphrase: 'passphrase',
            accountInfos: [],
            address: 'address',
            authentication: 'authentication',
            zkData: null,
            activeAccountIndex: 0,
            tokenTypeArg: mockTokenTypeArg,
            amount: BigInt(100),
            recipientAddress: 'recipientAddress',
        });

        expect(getSignerModule.getSigner).toHaveBeenCalled();
        expect(mockSigner.signAndExecuteTransactionBlock).toHaveBeenCalled();
        expect(result).toBeDefined();
    });
});

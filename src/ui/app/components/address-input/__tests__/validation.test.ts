import { isValidSuiAddress } from '@mysten/sui.js/utils';

import { SUI_ADDRESS_VALIDATION } from '../validation';

jest.mock('@mysten/sui.js/utils', () => ({
    ...jest.requireActual('@mysten/sui.js/utils'),
    isValidSuiAddress: jest.fn(() => true),
}));

describe('Address Input Validation', () => {
    const mockIsValidSuiAddress = isValidSuiAddress as unknown as jest.Mock;
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Should validate a correct address', async () => {
        mockIsValidSuiAddress.mockReturnValue(true);
        await expect(
            SUI_ADDRESS_VALIDATION.validate('0x123456789abcdef')
        ).resolves.not.toThrow();
    });

    it('Should not validate an incorrect address', async () => {
        mockIsValidSuiAddress.mockReturnValue(false);
        await expect(
            SUI_ADDRESS_VALIDATION.validate('incorrect')
        ).rejects.toMatchObject({
            message: 'Invalid address. Please check again.',
        });
    });

    it('Should not validate an empty value', async () => {
        await expect(SUI_ADDRESS_VALIDATION.validate('')).rejects.toMatchObject(
            { message: "Recipient's address or SuiNS Name is a required field" }
        );
    });

    it('Should trim the input value', async () => {
        mockIsValidSuiAddress.mockReturnValue(true);
        await expect(
            SUI_ADDRESS_VALIDATION.validate(' 0x123456789abcdef ')
        ).resolves.not.toThrow();
    });
});

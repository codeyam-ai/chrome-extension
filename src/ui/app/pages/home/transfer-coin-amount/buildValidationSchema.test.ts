import { buildValidationSchema } from './buildValidationSchema';

describe('buildValidationSchema', () => {
    it('validates against alphabet characters', async () => {
        const input = {
            coin: {
                type: '0x2::sui::SUI',
                balance: BigInt(4000000000),
                symbol: 'SUI',
                decimals: 9,
            },
            gas: {
                aggregateBalance: BigInt(4000000000),
                decimals: 9,
                budget: 500,
            },
            locale: 'en',
        };
        const validationSchema = buildValidationSchema(input);
        await expect(
            validationSchema.validate({ amount: 'abc' })
        ).rejects.toThrow('value provided is not valid');
    });

    it('works for period-decimal-separator langs like english', async () => {
        const input = {
            coin: {
                type: '0x2::sui::SUI',
                balance: BigInt(4000000000),
                symbol: 'SUI',
                decimals: 9,
            },
            gas: {
                aggregateBalance: BigInt(4000000000),
                decimals: 9,
                budget: 500,
            },
            locale: 'en',
        };
        const validationSchema = buildValidationSchema(input);
        const actual = await validationSchema.validate({ amount: '1' });
        expect(actual.amount.toString()).toEqual('1');
    });

    it('works for comma-decimal-separator langs like german', async () => {
        const input = {
            coin: {
                type: '0x2::sui::SUI',
                balance: BigInt(4000000000),
                symbol: 'SUI',
                decimals: 9,
            },
            gas: {
                aggregateBalance: BigInt(4000000000),
                decimals: 9,
                budget: 500,
            },
            locale: 'de',
        };
        const validationSchema = buildValidationSchema(input);
        const actual = await validationSchema.validate({ amount: '0,1' });

        // this is the expectation that the _javascript_ number, stringified, is
        // valid, so 0.1, not 0,1. Whether display is i18n or not is an
        // independent issue
        expect(actual.amount.toString()).toEqual('0.1');
    });
});

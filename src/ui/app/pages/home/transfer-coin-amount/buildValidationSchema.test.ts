import {
    type BuildValidationSchema,
    buildValidationSchema,
} from './buildValidationSchema';

describe('buildValidationSchema', () => {
    it('works for period-decimal-separator languages, like english', async () => {
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
        };
        const validationSchema = buildValidationSchema(input);
        const actual = await validationSchema.validate({ amount: '1' });
        expect(actual.amount.toString()).toEqual('1');
    });

    it('works for comma-decimal-separator languages, like german', async () => {
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
        };
        const validationSchema = buildValidationSchema(input);
        const actual = await validationSchema.validate({ amount: '0,1' });
        expect(actual.amount.toString()).toEqual('0,1');
    });
});

import * as format from './format';

describe('format.formatBalance', () => {
    it('formats appropriately for values less than 1', () => {
        const decimals = 0;
        expect(format.coinBalance(0.1234, decimals)).toBe('0.1234');
    });

    test('formats balances greater than 1', () => {
        const decimals = 0;
        expect(format.coinBalance(1, decimals)).toBe('1');
        expect(format.coinBalance(123, decimals)).toBe('123');
        expect(format.coinBalance(12_345, decimals)).toBe('12.34K');
        expect(format.coinBalance(12_345_678, decimals)).toBe('12.34M');
        expect(format.coinBalance(12_345_678_910, decimals)).toBe('12.34B');
        expect(format.coinBalance(12_345_678_910_112, decimals)).toBe(
            '12,345.67B'
        );
    });

    test('formats numbers greate than 1 and with decimals by rounded down to two significant digits', () => {
        expect(format.coinBalance(1234.567, 0)).toBe('1,234.56');
    });
});

describe('format.dollars', () => {
    test('formats dollars', () => {
        expect(format.dollars(12_345.67, 2)).toBe('$12,345.67');
    });
});

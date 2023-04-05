import * as parse from './parse';

describe('parse.numberString', () => {
    it('parses period-decimal-separator langs', () => {
        const assertions: [string, number][] = [
            ['0.1', 0.1],
            ['1,234.567', 1234.567],
        ];

        for (const assertion of assertions) {
            const [numberString, number] = assertion;
            const bigNumber = parse.numberString({
                locale: 'en-US',
                numberString,
            });
            expect(bigNumber.toNumber()).toBe(number);
        }
    });

    it('parses comma-decimal-separator langs', () => {
        const assertions: [string, number][] = [
            ['0,1', 0.1],
            ['1.234,567', 1234.567],
        ];

        for (const assertion of assertions) {
            const [numberString, number] = assertion;
            const bigNumber = parse.numberString({
                locale: 'de',
                numberString,
            });
            expect(bigNumber.toNumber()).toBe(number);
        }
    });
});

import { NumberParser } from '@internationalized/number';
import BigNumber from 'bignumber.js';

export function numberString({
    numberString,
    locale,
}: {
    numberString: string;
    locale: string;
}): BigNumber {
    const parser = new NumberParser(locale);
    const n = parser.parse(numberString);
    return new BigNumber(n);
}

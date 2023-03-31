import { NumberParser } from '@internationalized/number';
import BigNumber from 'bignumber.js';

export function numberString({
    numberString,
    language,
}: {
    numberString: string;
    language: string;
}): BigNumber {
    const parser = new NumberParser(language);
    const n = parser.parse(numberString);
    return new BigNumber(n);
}

import type BigNumber from 'bignumber.js';

const mistToSui = (
    mist: number | bigint | BigNumber | undefined,
    decimalPlaces: number
): string => {
    const convertedValue = parseFloat(`${mist || 0}`) * 0.000000001;
    const threshold = parseFloat(
        Math.pow(10, -decimalPlaces).toFixed(decimalPlaces)
    );

    if (convertedValue < threshold) {
        return `<${threshold}`;
    }

    return convertedValue.toFixed(decimalPlaces).toString();
};

export default mistToSui;

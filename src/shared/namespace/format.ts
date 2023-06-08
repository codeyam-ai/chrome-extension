import BigNumber from 'bignumber.js';

/**
 * Formats a coin balance based on our standard coin display logic.
 * If the balance is less than 1, it will be displayed in its full decimal form.
 * For values greater than 1, it will be truncated to 3 decimal places.
 */
export function coinBalance(
    balance: bigint | number | string,
    decimals: number,
    formatDecimals?: number
) {
    let postfix = '';
    let bn = new BigNumber(balance.toString()).shiftedBy(-1 * decimals);

    if (bn.gte(1_000_000_000)) {
        bn = bn.shiftedBy(-9);
        postfix = 'B';
    } else if (bn.gte(1_000_000)) {
        bn = bn.shiftedBy(-6);
        postfix = 'M';
    } else if (bn.gte(10_000)) {
        bn = bn.shiftedBy(-3);
        postfix = 'K';
    }

    if (bn.gte(1)) {
        bn = bn.decimalPlaces(2, BigNumber.ROUND_DOWN);
    }

    return bn.toFormat(formatDecimals) + postfix;
}

export function dollars(
    balance: bigint | number | string,
    decimals: number,
    conversion?: number
) {
    let amtToFormat;

    const coinAmt = new BigNumber(balance.toString())
        .shiftedBy(-decimals)
        .toNumber();

    const dollarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    if (conversion) {
        amtToFormat = coinAmt * conversion;
    } else {
        amtToFormat = coinAmt * 100;
    }

    if (dollarFormatter.format(amtToFormat) === '$0.00') {
        return '< $0.01';
    } else {
        return dollarFormatter.format(amtToFormat);
    }
}

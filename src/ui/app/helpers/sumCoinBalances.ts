export const sumCoinBalances = (obj: { [key: string]: bigint }): bigint => {
    let sum = BigInt(0);
    for (const key in obj) {
        sum += obj[key];
    }
    return sum;
};

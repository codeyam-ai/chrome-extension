export const sumCoinBalances = (obj: {
    [key: string]: bigint;
}): bigint | undefined => {
    if (Object.keys(obj).length === 0) return;
    let sum = BigInt(0);
    for (const key in obj) {
        sum += obj[key];
    }
    return sum;
};

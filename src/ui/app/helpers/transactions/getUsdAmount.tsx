const getUsdAmount = (amt: number): string | number => {
    const dollarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return Math.abs(amt) <= 0.0001 ? '< 1¢' : dollarFormatter.format(amt * 100);
};

export default getUsdAmount;

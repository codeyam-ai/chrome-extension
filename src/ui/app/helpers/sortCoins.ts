const sortCoins = (coins: object) => {
    // Convert the object into an array of key-value pairs
    const coinEntries = Object.entries(coins);

    // Sort the array based on the specified condition
    coinEntries.sort((a, b) => {
        const aKeyParts = a[0].split('::');
        const bKeyParts = b[0].split('::');

        const aToken = aKeyParts[1];
        const bToken = bKeyParts[1];

        // Always put 'sui' as the first item
        if (aToken === 'sui') return -1;
        if (bToken === 'sui') return 1;

        // Sort the rest alphabetically
        return aToken.localeCompare(bToken);
    });

    // Convert the sorted array back into an object
    const sortedCoins = Object.fromEntries(coinEntries);
    return sortedCoins;
};

export default sortCoins;

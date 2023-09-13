export const queryCryptoToFiat = () => {
    return fetch(`https://explorer.ethoswallet.xyz/api/v1/coin/convert`)
        .then((response) => response.json())
        .then((data) => {
            const amount = data.conversionRate;
            return amount;
        })
        .catch((error) => {
            throw error;
        });
};

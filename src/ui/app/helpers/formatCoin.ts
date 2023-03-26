import { Coin, type JsonRpcProvider } from '@mysten/sui.js';

import { formatBalance } from '../hooks/useFormatCoin';

export interface FormattedCoin {
    formattedBalance?: string;
    coinSymbol: string;
    dollars?: string;
    coinName: string;
    coinIcon: string | null;
}

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
});

const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export const getFormattedBalance = (
    balance?: bigint | number | string,
    decimals?: number
): string | undefined => {
    if (!balance) {
        return undefined;
    }
    if (!decimals) {
        return numberFormatter.format(balance as bigint);
    } else {
        return formatBalance(balance, decimals);
    }
};

export const getDollars = (
    balance?: bigint | number | string
): string | undefined => {
    if (!balance) {
        return undefined;
    }
    return dollarFormatter.format(parseFloat(formatBalance(balance, 7)));
};

const formatCoin = async (
    provider: JsonRpcProvider,
    balance?: bigint | number | string,
    coinType?: string | null
): Promise<FormattedCoin> => {
    const symbol = coinType ? Coin.getCoinSymbol(coinType) : '';

    let metadataSymbol: string | null = null;
    let decimals: number | undefined;
    let iconUrl: string | null = null;
    let name: string | null = null;

    try {
        ({
            symbol: metadataSymbol,
            decimals,
            iconUrl,
            name,
        } = await provider.getCoinMetadata({ coinType: coinType || '' }));
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('error getting coin metadata :>> ', error);
    }

    const formattedBalance = getFormattedBalance(balance, decimals);

    const dollars = getDollars(balance);

    return {
        formattedBalance,
        coinSymbol: metadataSymbol || symbol,
        dollars,
        coinName: name || symbol,
        coinIcon: iconUrl,
    };
};

export default formatCoin;

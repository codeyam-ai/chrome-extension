import { Coin, type JsonRpcProvider } from '@mysten/sui.js';

import { formatBalance } from './formatBalance';
import ns from '_shared/namespace';

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
    const dollars = balance ? ns.format.dollars(balance, decimals || 9) : '';

    return {
        formattedBalance,
        coinSymbol: metadataSymbol || symbol,
        dollars,
        coinName: name || symbol,
        coinIcon: iconUrl,
    };
};

export default formatCoin;

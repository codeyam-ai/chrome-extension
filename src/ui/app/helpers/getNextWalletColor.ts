import defaultColors from '_src/shared/defaultColorOptions';

const getNextWalletColor = (nextAccountIndex: number): string => {
    return defaultColors[nextAccountIndex % defaultColors.length];
};

export default getNextWalletColor;

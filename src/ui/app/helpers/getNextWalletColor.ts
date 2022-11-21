import defaultColors from '_src/shared/defaultColorOptions';

const getNextWalletColor = (nextAccountIndex: number): string => {
    console.log('nextAccountIndex :>> ', nextAccountIndex);
    console.log('defaultColors.length :>> ', defaultColors.length);
    console.log(
        'nextAccountIndex % defaultColors.length :>> ',
        nextAccountIndex % defaultColors.length
    );
    return defaultColors[nextAccountIndex % defaultColors.length];
};

export default getNextWalletColor;

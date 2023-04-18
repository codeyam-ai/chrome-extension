import type BigNumber from 'bignumber.js';

const getErrorDisplaySuiForMist = (
    mist: number | BigNumber | undefined
): string => {
    const sui = parseFloat(`${mist || 0}`) * 0.000000001;
    const rounded = Math.round(sui * 1000) / 1000;
    return Number(rounded).toString();
};

export default getErrorDisplaySuiForMist;

import mistToSui from './mistToSui';

import type BigNumber from 'bignumber.js';

const getErrorDisplaySuiForMist = (
    mist: number | BigNumber | undefined
): string => {
    const sui = mistToSui(mist);
    const number = parseFloat(sui);
    const rounded = Math.round(number * 1000) / 1000;
    return Number(rounded).toString();
};

export default getErrorDisplaySuiForMist;

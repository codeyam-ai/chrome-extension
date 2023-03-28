import {
    getTxAction,
    getTxOtherAddressDisplay,
    getTxPreposition,
    getTxType,
} from './';
import getCommands from './getCommands';
import getDisplayImage from './getDisplayImage';
import {
    getFormattedGasFee,
    getGasFee,
    getSuiObj,
    getSuiTransferAmount,
} from './getSuiTransferAmount';
import convertUnixTimeToLocalTime from '../convertUnixTimeToLocalTime';
import { getDollars } from '../formatCoin';
import truncateMiddle from '../truncate-middle';
import getIsSender from './getIsSender';

import type { FormattedTransaction } from './types';
import getUsdAmount from './getUsdAmount';

const getHumanReadable = (ownerAddr: string, tx: FormattedTransaction) => {
    const timeDisplay = convertUnixTimeToLocalTime(tx.timestampMs || 0);
    const txType = getTxType(tx);
    const txStatus = tx.effects?.status.status;
    const isSender = getIsSender(ownerAddr, tx);
    const txAction = getTxAction(isSender, tx);
    const txAmount = getSuiTransferAmount(ownerAddr, tx);
    const totalGasCost = getGasFee(tx);
    const gasFeeInSui = getFormattedGasFee(totalGasCost);
    const gasFeeInUsd = getDollars(totalGasCost);
    const txCommands = getCommands(tx);
    const displayImage = getDisplayImage(tx);

    const amt = txAmount ? parseFloat(txAmount.replace(/,/g, '')) : undefined;
    const txUsdAmount = amt ? getUsdAmount(amt) : undefined;

    const preposition = getTxPreposition(txType, txAction);
    const otherAddress = getTxOtherAddressDisplay(
        txType,
        txAction,
        tx.from || '',
        tx.to
    );

    const otherAddressStr = truncateMiddle(otherAddress || '', 4);

    return {
        timeDisplay,
        txType,
        txAction,
        txAmount,
        txStatus,
        txUsdAmount,
        gasFeeInSui,
        gasFeeInUsd,
        txCommands,
        preposition,
        isSender,
        otherAddress,
        otherAddressStr,
        displayImage,
    };
};

export default getHumanReadable;

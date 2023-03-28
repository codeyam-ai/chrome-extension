import truncateMiddle from '../truncate-middle';
import convertUnixTimeToLocalTime from '../convertUnixTimeToLocalTime';
import {
    getTxAction,
    getTxOtherAddressDisplay,
    getTxPreposition,
    getTxType,
} from './';
import { FormattedTransaction } from './types';
import { getDollars } from '../formatCoin';
import getCommands from './getCommands';
import getDisplayImage from './getDisplayImage';
import {
    getFormattedGasFee,
    getGasFee,
    getSuiObj,
    getSuiTransferAmount,
} from './getSuiTransferAmount';

const getHumanReadable = (ownerAddr: string, tx: FormattedTransaction) => {
    const suiObj = getSuiObj(ownerAddr, tx);
    const timeDisplay = convertUnixTimeToLocalTime(tx.timestampMs || 0);
    const txType = getTxType(tx);
    const txStatus = tx.effects?.status.status;
    const txAction = getTxAction(tx);
    const txAmount = getSuiTransferAmount(ownerAddr, tx);
    const totalGasCost = getGasFee(tx);
    const gasFeeInSui = getFormattedGasFee(totalGasCost);
    const gasFeeInUsd = getDollars(totalGasCost);
    const txCommands = getCommands(tx);
    const displayImage = getDisplayImage(tx);
    const txUsdAmount = getDollars(suiObj?.amount)
        ? getDollars(suiObj?.amount)
        : '$0.00';

    const preposition = getTxPreposition(txType, txAction);
    const otherAddress = getTxOtherAddressDisplay(
        txType,
        txAction,
        tx.from,
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
        otherAddress,
        otherAddressStr,
        displayImage,
    };
};

export default getHumanReadable;

import {
    getTxAction,
    getTxOtherAddressDisplay,
    getTxPreposition,
    getTxType,
} from './';
import getDisplayImage from './getDisplayImage';
import getIsSender from './getIsSender';
import {
    getFormattedGasFee,
    getGasFee,
    getSuiTransferAmount,
} from './getSuiTransferAmount';
import getToFromAddress from './getToFromAddress';
import getTxHeader from './getTxHeader';
import getUsdAmount from './getUsdAmount';
import convertUnixTimeToLocalTime from '../convertUnixTimeToLocalTime';
import truncateMiddle from '../truncate-middle';
import ns from '_shared/namespace';

import type { HumanReadableDetails } from './types';
import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

const getHumanReadable = (
    ownerAddr: string,
    tx: SuiTransactionBlockResponse
): HumanReadableDetails => {
    const timeDisplay = convertUnixTimeToLocalTime(
        Number(tx.timestampMs || '0')
    );
    const txType = getTxType(tx);
    const txStatus = tx.effects?.status.status;
    const isSender = getIsSender(ownerAddr, tx);
    const txAction = getTxAction(ownerAddr, tx);
    const txAmount = getSuiTransferAmount(ownerAddr, tx);
    const totalGasCost = getGasFee(tx);
    const gasFeeInSui = getFormattedGasFee(totalGasCost);
    const gasFeeInUsd = ns.format.dollars(totalGasCost, 9);
    const txCommands = getTxHeader(tx, txType);
    const displayImage = getDisplayImage(tx);
    const amt = txAmount ? parseFloat(txAmount.replace(/,/g, '')) : undefined;
    const txUsdAmount = amt ? getUsdAmount(amt) : undefined;
    const addresses = getToFromAddress(txAction, tx);
    const preposition = getTxPreposition(txType, txAction);
    const otherAddress = getTxOtherAddressDisplay(
        txType,
        txAction,
        'test-address',
        'to-test-address'
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
        addresses,
    };
};

export default getHumanReadable;

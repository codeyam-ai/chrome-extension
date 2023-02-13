import truncateMiddle from '../truncate-middle';
import ipfs from '../ipfs';
import {
    getTxAction,
    getTxOtherAddressDisplay,
    getTxPreposition,
    getTxSubject,
    getTxType,
    getTxVerb,
} from '.';

import { FormattedTxResultState } from '../../pages/home/transactions/FormattedTxResultState';
import convertUnixTimeToLocalTime from '../convertUnixTimeToLocalTime';

const getHumanReadable = (tx: FormattedTxResultState) => {
    const timeDisplay = convertUnixTimeToLocalTime(tx.timestampMs || 0);
    const txType = getTxType(tx);
    const txAction = getTxAction(tx);
    const verb = getTxVerb(txAction);
    const subject = getTxSubject(
        txType,
        tx.objSymbol,
        tx.formatted?.formattedBalance,
        tx.name,
        tx.callModuleName,
        tx.callFunctionName
    );
    const preposition = getTxPreposition(txType, txAction);
    const otherAddress = getTxOtherAddressDisplay(
        txType,
        txAction,
        tx.from,
        tx.to
    );

    const nftImageUri = tx.url ? ipfs(tx.url) : undefined;

    const otherAddressStr = truncateMiddle(otherAddress || '', 4);

    return {
        timeDisplay,
        txType,
        txAction,
        verb,
        subject,
        preposition,
        otherAddress,
        nftImageUri,
        otherAddressStr,
    };
};

export default getHumanReadable;

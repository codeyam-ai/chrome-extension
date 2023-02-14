import {
    ArrowsRightLeftIcon,
    CodeBracketSquareIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    FireIcon,
    SparklesIcon,
} from '@heroicons/react/24/solid';
import { useMemo, useState } from 'react';

import { ActivityRow } from './ActivityRow';
import { Coin } from '../../../redux/slices/sui-objects/Coin';
import SuiIcon from '../../svg/SuiIcon';
import { formatDate } from '_helpers';
import ipfs from '_src/ui/app/helpers/ipfs';
import { useFormatCoin, useMiddleEllipsis } from '_src/ui/app/hooks';
import UnknownToken from '_src/ui/app/pages/home/tokens/UnknownToken';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import type { TxResultState } from '_src/ui/app/redux/slices/txresults';
import { getHumanReadable } from '_src/ui/app/helpers/transactions';
import { type FormattedCoin } from '_src/ui/app/pages/home/transactions/FormattedCoin';

interface txnType extends TxResultState {
    formatted: FormattedCoin;
}

interface TransactionRowProps {
    txn: txnType;
}

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

interface SharedTypes {
    txFailed: boolean;
    hasAmount: boolean;
    amount?: number;
    coinType: string;
    type: string;
    txDirText: string;
    link: string;
    date: string;
}

const TransactionRow = ({ txn }: TransactionRowProps) => {
    const {
        txType,
        txAction,
        nftImageUri,
        otherAddress,
        otherAddressStr,
        preposition,
        subject,
        timeDisplay,
        verb,
    } = getHumanReadable(txn);

    console.log('txn: ', txn);

    const drilldownLink = `/transactions/receipt?${new URLSearchParams({
        txdigest: txn?.txId,
        symbol: 'SUI',
        isFunc: txType === 'func' ? 'yes' : 'no',
    }).toString()}`;

    console.log(
        'CHECK: ',
        txType,
        txAction,
        nftImageUri,
        otherAddress,
        otherAddressStr,
        preposition,
        subject,
        timeDisplay,
        verb
    );

    if (!txn.formatted) return <></>;

    return (
        <ActivityRow
            failed={false}
            typeIcon={<CodeBracketSquareIcon width={20} height={20} />}
            type={txType}
            date={timeDisplay}
            icon={<CodeBracketSquareIcon width={20} height={20} />}
            link={drilldownLink}
            header={'test'}
            subheader={'test'}
            formattedAmount={
                txn.formatted.formattedBalance
                    ? txn.formatted.formattedBalance
                    : '0'
            }
            symbol={txn.formatted.coinSymbol ? txn.formatted.coinSymbol : 'SUI'}
            dollars={txn.formatted.dollars ? txn.formatted.dollars : '0'}
        />
    );
};

export default TransactionRow;

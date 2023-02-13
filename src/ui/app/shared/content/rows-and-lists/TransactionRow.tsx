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

interface TransactionRowProps {
    txn: TxResultState;
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

interface RowDataTypes extends SharedTypes {
    header?: string;
    typeIcon: JSX.Element;
    icon: JSX.Element;
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

    console.log('txn: ', txn);

    return (
        <ActivityRow
            failed={false}
            typeIcon={<CodeBracketSquareIcon />}
            type={txType}
            date={timeDisplay}
            icon={<SuiIcon width={0} height={0} />}
            link={drilldownLink}
            header={'test'}
            subheader={'test'}
            formattedAmount={'amt'}
            symbol={'symbol'}
            dollars={'dollars'}
        />
    );
};

export default TransactionRow;

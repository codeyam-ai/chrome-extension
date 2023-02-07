// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from 'classnames';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import ipfs from '../../helpers/ipfs';
import { GAS_TYPE_ARG } from '../../redux/slices/sui-objects/Coin';
import Divider from '../../shared/Divider';
import Icon, { SuiIcons } from '_components/icon';
import { formatDate } from '_helpers';
import { useFormatCoin, useMiddleEllipsis } from '_hooks';

import type { TxResultState } from '_redux/slices/txresults';

import st from './TransactionsCard.module.scss';

const TRUNCATE_MAX_LENGTH = 8;
const TRUNCATE_PREFIX_LENGTH = 4;

function TransactionCard({ txn }: { txn: TxResultState }) {
    const toAddrStr = useMiddleEllipsis(
        txn.to || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );
    const fromAddrStr = useMiddleEllipsis(
        txn.from || '',
        TRUNCATE_MAX_LENGTH,
        TRUNCATE_PREFIX_LENGTH
    );

    const transferStatus = txn.status === 'success' ? 'Checkmark' : 'Close';

    //TODO update the logic to account for other transfer type
    const TxIcon = txn.isSender ? SuiIcons.ArrowLeft : SuiIcons.Buy;
    const iconClassName = txn.isSender
        ? cl(st.arrowActionIcon, st.angledArrow)
        : cl(st.arrowActionIcon, st.buyIcon);

    const date = txn?.timestampMs
        ? formatDate(txn.timestampMs, [
              'weekday',
              'month',
              'day',
              // 'hour',
              // 'minute',
          ])
        : false;

    const [formattedAmount] = useFormatCoin(
        txn.amount,
        txn.coinType || GAS_TYPE_ARG
    );

    return (
        <Link
            to={`/receipt?${new URLSearchParams({
                txdigest: txn.txId,
            }).toString()}`}
            className={st.txCard}
        >
            <div className={st.card} key={txn.txId}>
                <div className={st.cardIcon}>
                    <Icon icon={TxIcon} className={iconClassName} />
                </div>
                <div className={st.cardContent}>
                    <div className={st.txResult}>
                        <div className="dark:text-white">{txn.kind}</div>
                        {date && (
                            <div className="text-xs dark:text-gray-400">
                                {date}
                            </div>
                        )}
                    </div>
                    <div className={st.txResult}>
                        <div className={st.txTypeName}>
                            {txn.kind !== 'Call' && txn.isSender
                                ? 'To'
                                : 'From'}
                        </div>
                        <div className={cl(st.txValue, st.txAddress)}>
                            {txn.kind !== 'Call' && txn.isSender
                                ? toAddrStr
                                : fromAddrStr}
                            <span
                                className={cl(
                                    st[txn.status.toLowerCase()],
                                    st.txstatus
                                )}
                            >
                                <Icon icon={SuiIcons[transferStatus]} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className={st.txTransferred}>
                    {txn.amount && (
                        <>
                            <div className="text-right dark:text-white">
                                {formattedAmount} SUI
                            </div>
                            <div className={st.txFiatValue}></div>
                        </>
                    )}
                    {txn.url && (
                        <div className={st.txImage}>
                            <img src={ipfs(txn.url)} alt="NFT" />
                        </div>
                    )}
                </div>
            </div>
            <Divider />
        </Link>
    );
}

export default memo(TransactionCard);

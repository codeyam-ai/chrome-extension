import { QueueListIcon } from '@heroicons/react/24/solid';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { type FormattedTxResultState } from './FormattedTxResultState';
import { useAppDispatch, useAppSelector } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';
import Loading from '_src/ui/app/components/loading';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/button';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';
import formatCoin, { type FormattedCoin } from '_src/ui/app/helpers/formatCoin';

import { type TxResultState } from '_redux/slices/txresults';
import { type SuiTransactionResponse } from '@mysten/sui.js';
import deduplicate from '_src/ui/app/helpers/deduplicate';
import { getTxType } from '_src/ui/app/helpers/transactions';

export interface txnType extends TxResultState {
    formatted: FormattedCoin;
}

const TransactionsPage = () => {
    const address = useAppSelector(({ account }) => account.address);
    const [items, setItems] = useState<FormattedTxResultState[]>([]);
    const [initLoad, setInitLoad] = useState(true);
    const dispatch = useAppDispatch();
    const txPerPage = 5;
    const [nextPage, setNextPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [txEffs, setTxEffs] = useState<
        SuiTransactionResponse[] | undefined
    >();
    const totalNumTxs = txEffs?.length;
    const [activeTransactions, setActiveTransactions] = useState<
        txnType[] | undefined
    >();
    const [filter, setFilter] = useState<string | undefined>();
    const [filteredTxEffs, setFilteredTxEffs] = useState<
        SuiTransactionResponse[] | undefined
    >();

    const [error, setError] = useState<string | undefined>();

    const txByAddress: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );

    useEffect(() => {
        setItems([]);

        const getTxs = async () => {
            try {
                const transactionIds: string[] =
                    await api.instance.fullNode.getTransactionsForAddress(
                        address as string,
                        true
                    );

                const _txEffs =
                    await api.instance.fullNode.getTransactionWithEffectsBatch(
                        deduplicate(transactionIds)
                    );

                if (address && _txEffs) {
                    setTxEffs(_txEffs);
                }
            } catch (e) {
                setError(`${e}`);
            }
        };

        if (initLoad) {
            getTxs();
        }
    }, [address]);

    useEffect(() => {
        setFilteredTxEffs(undefined);

        if (!txEffs || !filter) return;

        const filteredTxEffs = txEffs.filter((txEff) => {
            if (!txEff.effects.events) return false;
            return !!txEff.effects.events.find(
                (event) =>
                    'coinBalanceChange' in event &&
                    event.coinBalanceChange.changeType !== 'Gas' &&
                    event.coinBalanceChange.coinType === filter
            );
        });

        setFilteredTxEffs(filteredTxEffs);
    }, [txEffs, filter]);

    const loadItems = useCallback(async () => {
        const effs = filteredTxEffs || txEffs;

        if (!effs) return;

        setLoading(true);
        setNextPage(nextPage + 1);

        const start = (nextPage - 1) * txPerPage;
        const end = start + txPerPage;
        const filtEffs = effs.slice(start, end);

        dispatch(getTransactionsByAddress(filtEffs));
    }, [dispatch, txEffs]);

    useEffect(() => {
        const getFormattedTransactions = async () => {
            const formattedTransactions: txnType[] = await Promise.all(
                txByAddress?.map(async (tx: any) => {
                    // TODO: fix type error for any
                    const txType = getTxType(tx);
                    if (txType === 'nft' || txType === 'func') {
                        return tx;
                    }
                    const {
                        formattedBalance,
                        coinSymbol,
                        dollars,
                        coinName,
                        coinIcon,
                    } = await formatCoin(
                        api.instance.fullNode,
                        tx.amount,
                        tx.objType
                    );
                    return {
                        ...tx,
                        formatted: {
                            formattedBalance,
                            coinSymbol,
                            dollars,
                            coinName,
                            coinIcon,
                        },
                    };
                })
            );
            if (formattedTransactions) {
                setActiveTransactions(formattedTransactions);
            }
        };

        getFormattedTransactions();
    }, [txByAddress]);

    const loadMore = useCallback(() => {
        loadItems();
    }, [loadItems]);

    useEffect(() => {
        if (initLoad && txEffs && txEffs.length > 0) {
            loadItems();
            setInitLoad(false);
        }
    }, [initLoad, loadItems, txEffs]);

    return (
        <React.Fragment>
            <Loading loading={initLoad} big={true}>
                {activeTransactions && activeTransactions.length > 0 && (
                    <div className={'flex flex-col h-full'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={activeTransactions} />
                        {items.length !== totalNumTxs && (
                            <div
                                className={
                                    'w-full flex flex-row items-center justify-center'
                                }
                            >
                                <Button
                                    mode={'secondary'}
                                    className={'mb-6'}
                                    onClick={loadMore}
                                >
                                    {loading ? (
                                        <LoadingIndicator />
                                    ) : (
                                        'Load More'
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {!loading && items.length === 0 && (
                    <EmptyPageState
                        iconWithNoClasses={
                            <Icon displayIcon={<QueueListIcon />} />
                        }
                        title="No transactions yet"
                        subtitle="Set up DevNet SUI tokens to send coins."
                        linkText="Get SUI"
                        linkUrl="/tokens"
                        internal={true}
                    />
                )}
            </Loading>
        </React.Fragment>
    );
};

export default memo(TransactionsPage);

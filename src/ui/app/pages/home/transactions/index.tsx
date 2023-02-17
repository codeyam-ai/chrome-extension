import { QueueListIcon } from '@heroicons/react/24/solid';
import { type SuiTransactionResponse } from '@mysten/sui.js';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '_hooks';
import { getTransactionsByAddress } from '_redux/slices/txresults';
import { type TxResultState } from '_redux/slices/txresults';
import Loading from '_src/ui/app/components/loading';
import deduplicate from '_src/ui/app/helpers/deduplicate';
import formatCoin from '_src/ui/app/helpers/formatCoin';
import { getTxType } from '_src/ui/app/helpers/transactions';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/button';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import Alert from '_src/ui/app/shared/feedback/Alert';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

const TransactionsPage = () => {
    const address = useAppSelector(({ account }) => account.address);
    const [initLoad, setInitLoad] = useState(true);
    const dispatch = useAppDispatch();
    const txPerPage = 5;
    const [nextPage, setNextPage] = useState(1);
    const [txEffs, setTxEffs] = useState<
        SuiTransactionResponse[] | undefined
    >();
    const totalNumTxs = txEffs?.length;
    const [activeTransactions, setActiveTransactions] = useState<
        TxResultState[] | undefined
    >();

    const [error, setError] = useState<string | undefined>();

    const txByAddress: TxResultState[] = useAppSelector(
        ({ txresults }) => txresults.latestTx
    );

    useEffect(() => {
        setActiveTransactions([]);

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
    }, [address, initLoad]);

    const loadItems = useCallback(async () => {
        if (!txEffs) return;

        setNextPage(nextPage + 1);

        const start = (nextPage - 1) * txPerPage;
        const end = start + txPerPage;
        const filtEffs = txEffs.slice(start, end);

        dispatch(getTransactionsByAddress(filtEffs));
    }, [setNextPage, dispatch, txEffs, nextPage]);

    useEffect(() => {
        const getFormattedTransactions = async () => {
            const formattedTransactions: TxResultState[] = await Promise.all(
                txByAddress?.map(async (tx) => {
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

            if (activeTransactions && formattedTransactions) {
                const allTxs = [
                    ...activeTransactions,
                    ...formattedTransactions,
                ];
                setActiveTransactions(allTxs);
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

    if (error) {
        return (
            <div className="pb-4">
                <Alert
                    title={'We could not retrieve your transactions'}
                    subtitle={error}
                    borderRadius={16}
                />
            </div>
        );
    }

    return (
        <React.Fragment>
            <Loading loading={initLoad || !activeTransactions} big={true}>
                {activeTransactions && activeTransactions.length > 0 && (
                    <div className={'flex flex-col h-full'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={activeTransactions} />
                        {activeTransactions.length !== totalNumTxs && (
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
                                    Load More
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {!initLoad &&
                    activeTransactions &&
                    activeTransactions.length === 0 && (
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

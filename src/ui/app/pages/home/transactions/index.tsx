import { QueueListIcon } from '@heroicons/react/24/solid';
import { type SuiTransactionResponse } from '@mysten/sui.js';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { useAppSelector } from '_hooks';
// import { getFullTransactionDetails } from '_redux/slices/txresults';
// import { type TxResultState } from '_redux/slices/txresults';
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
    const [currentPage, setCurrentPage] = useState(0);
    const [loadingTxns, setLoadingTxns] = useState(true);
    const [moreTxnsAvailable, setMoreTxnsAvailable] = useState(true);
    const [suiTxns, setSuiTxns] = useState<SuiTransactionResponse[]>([]);
    const [formattedTxns, setFormattedTxns] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>();

    const txPerPage = 5;

    // fetch all transactions from the blockchain
    useEffect(() => {
        async function fetchSuiTransactions() {
            if (!address) {
                return;
            }

            try {
                const [txnIds, fromTxnIds] = await Promise.all([
                    api.instance.fullNode.queryTransactions({
                        filter: {
                            ToAddress: address,
                        },
                    }),
                    api.instance.fullNode.queryTransactions({
                        filter: {
                            FromAddress: address,
                        },
                    }),
                ]);
                // TODO: replace this with queryTransactions
                // It seems to be expensive to fetch all transaction data at once though
                const resp = await api.instance.fullNode.multiGetTransactions({
                    digests: deduplicate(
                        [...txnIds.data, ...fromTxnIds.data].map(
                            (x) => x.digest
                        )
                    ),
                    options: {
                        showInput: true,
                        showEffects: true,
                        showEvents: true,
                    },
                });

                const sortedTransactions = resp.sort(
                    // timestamp could be null, so we need to handle
                    (a, b) => (b.timestampMs || 0) - (a.timestampMs || 0)
                );

                console.log(sortedTransactions);
                setSuiTxns(sortedTransactions);
                if (sortedTransactions.length === 0) {
                    setLoadingTxns(false);
                }
            } catch (e) {
                setError(`${e}`);
            }
        }
        fetchSuiTransactions();
    }, [address]);

    // determine if more transactions are available
    // useEffect(() => {
    //     if (suiTxns.length > 0 && formattedTxns.length === suiTxns.length) {
    //         setMoreTxnsAvailable(false);
    //     }
    // }, [suiTxns, formattedTxns]);

    // load a page of "formatted transactions"
    useEffect(() => {
        if (!address) {
            return;
        }

        const loadFormattedTransactionsForCurrentPage = async () => {
            const start = currentPage * txPerPage;
            const end = start + txPerPage;
            const transactionsToFormat = suiTxns.slice(start, end);

            const formattedTxs = [];
            for (const transactionToFormat of transactionsToFormat) {
                const x = await api.instance.fullNode.getTransaction({
                    digest: transactionToFormat.digest,
                    options: {
                        showEffects: true,
                        showEvents: true,
                        showInput: true,
                        showObjectChanges: true,
                    },
                });
                console.log('X', x);
            }

            setFormattedTxns(transactionsToFormat);
            // const fullTransactionDetails = await getFullTransactionDetails(
            //     transactionsToFormat,
            //     address,
            //     api
            // );
            // const newFormattedTransactions: TxResultState[] = await Promise.all(
            //     fullTransactionDetails?.map(async (tx) => {
            //         // TODO: fix type error for any
            //         const txType = getTxType(tx);
            //         if (txType === 'nft' || txType === 'func') {
            //             return tx;
            //         }
            //         const {
            //             formattedBalance,
            //             coinSymbol,
            //             dollars,
            //             coinName,
            //             coinIcon,
            //         } = await formatCoin(
            //             api.instance.fullNode,
            //             tx.amount,
            //             tx.objType
            //         );
            //         return {
            //             ...tx,
            //             formatted: {
            //                 formattedBalance,
            //                 coinSymbol,
            //                 dollars,
            //                 coinName,
            //                 coinIcon,
            //             },
            //         };
            //     })
            // );

            // if (newFormattedTransactions) {
            //     setFormattedTxns((prev) => [
            //         ...(prev || []),
            //         ...newFormattedTransactions,
            //     ]);
            // }
        };
        if (suiTxns.length > 0) {
            loadFormattedTransactionsForCurrentPage().then(() => {
                setLoadingTxns(false);
            });
        }
    }, [address, currentPage, suiTxns]);

    const incrementPage = useCallback(() => {
        setCurrentPage(currentPage + 1);
    }, [currentPage]);

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
            <Loading loading={loadingTxns} big={true}>
                {formattedTxns && formattedTxns.length > 0 && (
                    <div className={'flex flex-col h-full'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={formattedTxns} />
                    </div>
                )}
                {/*        {moreTxnsAvailable && (*/}
                {/*            <div*/}
                {/*                className={*/}
                {/*                    'w-full flex flex-row items-center justify-center'*/}
                {/*                }*/}
                {/*            >*/}
                {/*                <Button*/}
                {/*                    mode={'secondary'}*/}
                {/*                    className={'mb-6'}*/}
                {/*                    onClick={incrementPage}*/}
                {/*                >*/}
                {/*                    Load More*/}
                {/*                </Button>*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}
                {/*)}*/}

                {/*{formattedTxns && formattedTxns.length === 0 && (*/}
                {/*    <EmptyPageState*/}
                {/*        iconWithNoClasses={*/}
                {/*            <Icon displayIcon={<QueueListIcon />} />*/}
                {/*        }*/}
                {/*        title="No transactions yet"*/}
                {/*        subtitle="Set up DevNet SUI tokens to send coins."*/}
                {/*        linkText="Get SUI"*/}
                {/*        linkUrl="/tokens"*/}
                {/*        internal={true}*/}
                {/*    />*/}
                {/*)}*/}
            </Loading>
        </React.Fragment>
    );
};

export default memo(TransactionsPage);

import { QueueListIcon } from '@heroicons/react/24/solid';
import React, { memo, useEffect, useState } from 'react';

import { useAppSelector } from '_hooks';
import Loading from '_src/ui/app/components/loading';
import { useQueryTransactionsByAddress } from '_src/ui/app/hooks/useQueryTransactionsByAddress';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import TextPageTitle from '_src/ui/app/shared/headers/page-headers/TextPageTitle';
import { Icon } from '_src/ui/app/shared/icons/Icon';
import EmptyPageState from '_src/ui/app/shared/layouts/EmptyPageState';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

const TransactionsPage = () => {
    const address = useAppSelector(({ account }) => account.address);
    const [formattedTxns, setFormattedTxns] = useState<FormattedTransaction[]>(
        []
    );

    const { isLoading: loadingTxns, data: suiTxns } =
        useQueryTransactionsByAddress(address);

    // load a page of "formatted transactions"
    useEffect(() => {
        if (!address) {
            return;
        }

        const loadFormattedTransactionsForCurrentPage = async () => {
            if (!suiTxns) return;

            setFormattedTxns(suiTxns);
            /*const fullTransactionDetails = await getFullTransactionDetails(
                transactionsToFormat,
                address,
                api
            );
            const newFormattedTransactions: TxResultState[] = await Promise.all(
                fullTransactionDetails?.map(async (tx) => {
                    //TODO: fix type error for any

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

            if (newFormattedTransactions) {
                setFormattedTxns((prev) => [
                    ...(prev || []),
                    ...newFormattedTransactions,
                ]);
            }*/
        };

        loadFormattedTransactionsForCurrentPage();
    }, [address, suiTxns]);

    /*const incrementPage = useCallback(() => {
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
    }*/

    return (
        <React.Fragment>
            <Loading loading={loadingTxns} big={true}>
                {formattedTxns && formattedTxns.length > 0 && (
                    <div className={'flex flex-col'}>
                        <TextPageTitle title="Activity" />
                        <TransactionRows transactions={formattedTxns} />
                    </div>
                )}
                {/*<div>
                    {moreTxnsAvailable && (
                        <div
                            className={
                                'w-full flex flex-row items-center justify-center'
                            }
                        >
                            <Button
                                mode={'secondary'}
                                className={'mb-6'}
                                onClick={incrementPage}
                            >
                                Load More
                            </Button>
                        </div>
                    )}
                        </div>*/}

                {formattedTxns && formattedTxns.length === 0 && (
                    <EmptyPageState
                        iconWithNoClasses={
                            <Icon displayIcon={<QueueListIcon />} />
                        }
                        title="No transactions yet"
                        subtitle="Set up SUI tokens to send coins."
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

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Loading from '_src/ui/app/components/loading';
import { useAppSelector } from '_src/ui/app/hooks';
import { queryTransactionsByAddress } from '_src/ui/app/hooks/useQueryTransactionsByAddress';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

interface ContactTransactionsProps {
    contactAddress: string;
}

const ContactTransactions: React.FC<ContactTransactionsProps> = ({
    contactAddress,
}) => {
    const [loading, setLoading] = useState(true);
    const userAddress = useAppSelector(({ account }) => account.address);
    const [formattedTxns, setFormattedTxns] = useState<FormattedTransaction[]>(
        []
    );

    const txnsBetweenUserAndContact = useMemo(() => {
        return formattedTxns.filter((txn) => {
            console.log(
                'txn.humanReadable.addresses?.to :>> ',
                txn.humanReadable.addresses?.to
            );
            console.log('contactAddress :>> ', contactAddress);
            console.log(
                'txn.humanReadable.addresses?.to === contactAddress :>> ',
                txn.humanReadable.addresses?.to === contactAddress
            );
            console.log('=========');

            return txn.humanReadable.addresses?.to === contactAddress;
        });
    }, [formattedTxns, contactAddress]);

    const fetchTransactions = async () => {
        const response = await queryTransactionsByAddress(userAddress || '');
        return response;
    };

    const {
        isFetching: loadingTxns,
        data: suiTxns,
        // error: txErr,
    } = useQuery(['contact-transactions'], fetchTransactions, {
        enabled: !!userAddress,
        staleTime: 0,
        cacheTime: 0,
        refetchInterval: 3000,
    });

    const loadPage = useCallback(async () => {
        if (!suiTxns) return;

        setFormattedTxns((prev) => [...prev, ...suiTxns.blocks]);
    }, [suiTxns]);

    // load a page of "formatted transactions"
    useEffect(() => {
        if (!userAddress) {
            return;
        }

        loadPage();
    }, [suiTxns, userAddress, loadPage]);

    useEffect(() => {
        // The first time the transactions are loaded, set loading to false.
        // All subsequent times, do not show loading indicator
        if (!loadingTxns) {
            setLoading(false);
        }
    }, [loadingTxns]);

    return (
        <div className="flex w-full h-full items-center place-content-center">
            <Loading loading={loading} big>
                {txnsBetweenUserAndContact.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        <Subheader isTextColorMedium>Transactions</Subheader>
                        <TransactionRows
                            transactions={txnsBetweenUserAndContact}
                        />
                    </div>
                ) : (
                    <div className="h-full mb-8">
                        <Subheader isTextColorMedium>
                            No Transactions Yet
                        </Subheader>
                    </div>
                )}
            </Loading>
        </div>
    );
};

export default ContactTransactions;

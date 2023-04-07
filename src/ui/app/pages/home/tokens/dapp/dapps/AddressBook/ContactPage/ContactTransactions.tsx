import { useCallback, useEffect, useMemo, useState } from 'react';

import Loading from '_src/ui/app/components/loading';
import { useAppSelector } from '_src/ui/app/hooks';
import { queryTransactionsByAddress } from '_src/ui/app/hooks/useQueryTransactionsByAddress';
import TransactionRows from '_src/ui/app/shared/content/rows-and-lists/TransactionRows';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import { useQuery } from '@tanstack/react-query';
import type { FormattedTransaction } from '_src/ui/app/helpers/transactions/types';

interface ContactTransactionsProps {
    contactAddress: string;
}

const ContactTransactions: React.FC<ContactTransactionsProps> = ({
    contactAddress,
}) => {
    const userAddress = useAppSelector(({ account }) => account.address);
    const [formattedTxns, setFormattedTxns] = useState<FormattedTransaction[]>(
        []
    );

    const txnsBetweenUserAndContact = useMemo(() => {
        return formattedTxns.filter((txn) => {
            return txn.humanReadable.addresses?.to === contactAddress;
        });
    }, [formattedTxns, contactAddress]);

    const fetchTransactions = async () => {
        const response = await queryTransactionsByAddress(
            userAddress || '',
            null,
            null,
            null
        );
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

    return (
        <Loading loading={loadingTxns} big>
            <div className="flex flex-col w-full h-full pt-8 gap-6 text-left bg-ethos-pale-purple dark:bg-ethos-dark-background-secondary border-t border-ethos-light-purple dark:border-ethos-dark-text-stroke">
                <Subheader isTextColorMedium className="px-6">
                    Transactions
                </Subheader>
                {formattedTxns.length > 0 ? (
                    <TransactionRows transactions={txnsBetweenUserAndContact} />
                ) : (
                    <div>None</div>
                )}
            </div>
        </Loading>
    );
};

export default ContactTransactions;

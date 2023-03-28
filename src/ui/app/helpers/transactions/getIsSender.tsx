import type { FormattedTransaction } from './types';

const getIsSender = (address: string, txn: FormattedTransaction): boolean => {
    const senderAddress = txn?.transactionBlock?.data.sender;

    return address === senderAddress;
};

export default getIsSender;

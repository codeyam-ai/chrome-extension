import safeAddress from '../safeAddress';

import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

const getIsSender = (
    address: string,
    txn: SuiTransactionBlockResponse
): boolean => {
    const senderAddress = txn?.transaction?.data.sender;

    return safeAddress(address) === safeAddress(senderAddress);
};

export default getIsSender;

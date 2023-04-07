import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

export type toFrom = {
    to: string | undefined;
    from: string | undefined;
};

const getToFromAddress = (
    txAction: string,
    tx: SuiTransactionBlockResponse
): toFrom | undefined => {
    const txnDetails = tx?.transaction?.data?.transaction;
    const isSend = txAction === 'send';
    const isReceive = txAction === 'receive';

    if (isSend || isReceive) {
        if (txnDetails && 'inputs' in txnDetails) {
            const inputAddr = txnDetails?.inputs.find((input) => {
                if ('valueType' in input) {
                    return input.valueType === 'address';
                } else {
                    return false;
                }
            });

            if (
                inputAddr &&
                'value' in inputAddr &&
                typeof inputAddr.value === 'string'
            ) {
                return {
                    to: inputAddr.value,
                    from: tx?.transaction?.data.sender,
                };
            }
        }
    }
};

export default getToFromAddress;

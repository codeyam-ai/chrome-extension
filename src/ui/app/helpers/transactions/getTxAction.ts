import type { FormattedTransaction } from './types';

export type TxAction = string;

const getTxAction = (
    isSender: boolean,
    txn: FormattedTransaction
): TxAction => {
    let type = 'Unknown Action';

    const txDetails = txn?.transactionBlock?.data?.transaction;
    if (!txDetails) return type;

    if (txDetails && 'transactions' in txDetails) {
        txDetails.transactions.forEach((command) => {
            // get command object key
            const commandObj = command as any;
            const commandKey = Object.keys(commandObj)[0];

            // Set type based on obj key or movecall obj contents
            if (commandKey === 'TransferObjects') {
                console.log('is sender: ', isSender);
                if (isSender) {
                    type = 'send';
                } else {
                    type = 'receive';
                }
            } else if (commandKey === 'MoveCall') {
                const call = commandObj['MoveCall'];
                const func = call.function.toLowerCase();

                switch (func) {
                    case 'mint':
                        type = 'mint';
                        break;
                    case 'clone':
                        type = 'clone';
                        break;
                    case 'modify':
                        type = 'modify';
                        break;
                    case 'burn':
                        type = 'burn';
                        break;
                    default:
                        break;
                }
            }
        });
    }

    return type;
};

export default getTxAction;

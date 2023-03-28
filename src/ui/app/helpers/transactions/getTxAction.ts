import type { FormattedTransaction } from './types';

export type TxAction = string;

const getTxAction = (
    isSender: boolean,
    txn: FormattedTransaction
): TxAction => {
    let type = 'default';

    const txDetails = txn?.transactionBlock?.data?.transaction;
    if (!txDetails) return type;

    let commands;
    if ('transactions' in txDetails) {
        commands = txDetails.transactions;
    } else if ('commands' in txDetails) {
        commands = txDetails.commands as any[];
    }
    if (txDetails && commands) {
        commands.forEach((command) => {
            // get command object key
            const commandObj = command as any;
            const commandKey = Object.keys(commandObj)[0];

            // Set type based on obj key or movecall obj contents
            if (commandKey === 'TransferObjects') {
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

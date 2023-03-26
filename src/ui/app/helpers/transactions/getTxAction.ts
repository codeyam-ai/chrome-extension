import { FormattedTransaction } from './types';

export type TxAction = string;

const getTxAction = (txn: FormattedTransaction): TxAction => {
    let type = 'function';

    if ('commands' in txn.transaction.data.transaction) {
        const totalCommands = txn.transaction.data.transaction.commands.length;

        if (totalCommands > 1) {
            // If there's more than one command it's a 'batch' transaction
            // the ProgrammableTransaction type containing multiple commands
            type = 'batch';
        } else {
            txn.transaction.data.transaction.commands.forEach((command) => {
                // get command object key
                const commandObj = command as any;
                const commandKey = Object.keys(commandObj)[0];
                const call = commandObj['MoveCall'];
                const func = call.function.toLowerCase();

                // Set type based on obj key or movecall obj contents
                if (commandKey === 'TransferObjects') {
                    type = 'transfer';
                } else if (txn.isSender && !func) {
                    type = 'send';
                } else if (!txn.isSender && !func) {
                    type = 'receive';
                    // } else if (txn.kind === 'TransferObject') {
                    //     type = 'transfer';
                } else if (commandKey === 'MoveCall') {
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
                            type = 'function';
                            break;
                    }
                }
            });
        }
    }

    return type;
};

export default getTxAction;

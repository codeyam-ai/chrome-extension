import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

export type TxAction = string;

const getTxAction = (
    ownerAddr: string,
    txn: SuiTransactionBlockResponse
): TxAction => {
    let type = 'default';

    const txDetails = txn?.transaction?.data;

    if (!txDetails || !('inputs' in txDetails.transaction)) return type;

    const addressInput = txDetails.transaction.inputs.find((input) => {
        if ('valueType' in input) {
            return input.valueType === 'address';
        } else {
            return false;
        }
    });

    const isSender =
        addressInput &&
        'value' in addressInput &&
        addressInput?.value !== ownerAddr;

    let commands;

    if ('transactions' in txDetails.transaction) {
        commands = txDetails.transaction.transactions;
    }

    if (txDetails && commands) {
        commands.forEach((command) => {
            // get command object key
            const commandObj = command;
            const commandKey = Object.keys(commandObj)[0];

            // Set type based on obj key or movecall obj contents
            if (commandKey === 'TransferObjects') {
                if (isSender) {
                    type = 'send';
                } else {
                    type = 'receive';
                }
            } else if (commandKey === 'MoveCall' && 'MoveCall' in commandObj) {
                const call = commandObj['MoveCall'];
                const func = call.function.toLowerCase();

                if (func.includes('mint')) {
                    type = 'mint';
                }
                if (func.includes('clone')) {
                    type = 'clone';
                }
                if (func.includes('modify')) {
                    type = 'modify';
                }
                if (func.includes('burn')) {
                    type = 'burn';
                }
            }
        });
    }

    return type;
};

export default getTxAction;

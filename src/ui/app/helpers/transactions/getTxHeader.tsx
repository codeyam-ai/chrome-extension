import _ from 'lodash';

import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

export type TxType = string;

const getTxHeader = (
    txn: SuiTransactionBlockResponse,
    type: string
): string | null => {
    let response = null;

    const transaction = txn?.transaction?.data?.transaction;
    if (!!transaction && 'transactions' in transaction) {
        const totalCommands = transaction.transactions.length;
        let commandStr =
            txn.effects?.status.status === 'failure' ? `'Failed: ` : ``;

        const appendCommandStr = (val: string, idx: number, comma: string) => {
            commandStr += `${val}${comma} `;
        };

        transaction.transactions.forEach((command, idx) => {
            const commandObj = command;
            const commandKey = Object.keys(commandObj)[0];
            const comma = idx + 1 < totalCommands ? ',' : '';

            switch (commandKey) {
                case 'TransferObjects':
                    appendCommandStr(`Transfer ${_.toUpper(type)}`, idx, comma);
                    break;
                case 'MergeCoins':
                    appendCommandStr('Merge Coins', idx, comma);
                    break;
                case 'Publish':
                    appendCommandStr('Publish Contract', idx, comma);
                    break;
                case 'MakeMoveVec':
                    appendCommandStr('Make Move', idx, comma);
                    break;
                case 'MoveCall': {
                    if ('MoveCall' in commandObj) {
                        const call = commandObj['MoveCall'];
                        const mod = _.startCase(call.module);

                        commandStr += `${mod}${comma} `;
                    }
                    break;
                }
                default:
                    break;
            }
        });

        response = commandStr;
    }

    return response;
};

export default getTxHeader;

import _ from 'lodash';

import type { FormattedTransaction } from './types';

export type TxType = string;

const getCommands = (txn: FormattedTransaction): string | null => {
    let response = null;

    if (!txn?.transaction?.data?.transaction) return response;

    if ('commands' in txn.transaction.data.transaction) {
        const totalCommands = txn.transaction.data.transaction.commands.length;
        let commandStr =
            txn.effects?.status.status === 'failure' ? `'Failed: ` : ``;

        const appendCommandStr = (val: string, idx: number, comma: string) => {
            commandStr += `${val}${comma} `;
        };

        const primaryObjName = txn?.objectChanges?.[0]
            ? _.startCase(
                  txn.objectChanges[0].objectType.split('::')[1].toLowerCase()
              )
            : 'Unknown Object';

        txn.transaction.data.transaction.commands.forEach((command, idx) => {
            const commandObj = command as any;
            const commandKey = Object.keys(commandObj)[0];
            const comma = idx + 1 < totalCommands ? ',' : '';

            switch (commandKey) {
                case 'TransferObjects':
                    appendCommandStr(`Transfer ${primaryObjName}`, idx, comma);
                    break;
                case 'SplitCoins':
                    appendCommandStr('Split Coin', idx, comma);
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
                    const call = commandObj['MoveCall'];
                    const mod = _.startCase(call.module);
                    const func = _.startCase(call.function);

                    commandStr += `${mod} (${func})${comma} `;
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

export default getCommands;

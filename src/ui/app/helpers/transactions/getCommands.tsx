import _ from 'lodash';
import { FormattedTransaction } from './types';

export type TxType = string;

const getCommands = (txn: FormattedTransaction): string | null => {
    let response = null;

    if ('commands' in txn.transaction.data.transaction) {
        const totalCommands = txn.transaction.data.transaction.commands.length;
        let commandStr =
            txn.effects?.status.status === 'failure' ? `'Failed: ` : ``;

        const appendCommandStr = (val: string, idx: number, comma: string) => {
            commandStr += `${val}${comma} `;
        };

        const primaryObjName = _.startCase(
            txn.objectChanges[0].objectType.split('::')[1].toLowerCase()
        );

        txn.transaction.data.transaction.commands.forEach((command, idx) => {
            const commandObj = command as any;
            const commandKey = Object.keys(commandObj)[0];
            const comma = idx + 1 < totalCommands ? ',' : '';

            switch (commandKey) {
                case 'TransferObjects':
                    appendCommandStr(`Transfer ${primaryObjName}`, idx, comma);
                    break;
                case 'SplitCoin':
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
                case 'MoveCall':
                    const call = commandObj['MoveCall'];
                    const module = _.startCase(call.module);
                    const func = _.startCase(call.function);

                    commandStr += `${module} (${func})${comma} `;
                    break;
                default:
                    break;
            }
        });

        response = commandStr;
    }

    return response;
};

export default getCommands;

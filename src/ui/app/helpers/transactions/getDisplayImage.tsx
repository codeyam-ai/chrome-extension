import { SUI_TYPE_ARG } from '@mysten/sui.js';

import getIcon from './getIcon';
import useDisplayDatas from '../../hooks/useDisplayDatas';
import { useFormatCoin } from '../../hooks/useFormatCoin';
import SuiIcon from '../../shared/svg/SuiIcon';
import ActionIcon from '../../shared/transactions/ActionIcon';

import type { AnalyzedTransaction } from './analyzeTransactions';
import type { TxAction } from './getTxAction';
import type { ReactNode } from 'react';

export type TxType = string;

const CoinIcon = ({
    coinType,
    txAction,
}: {
    coinType: string;
    txAction: TxAction;
}) => {
    const [, symbol, , coinName, iconUrl] = useFormatCoin('0', coinType);

    if (iconUrl) {
        return (
            <img
                src={iconUrl}
                alt={coinName ?? symbol}
                width={42}
                height={42}
                className="rounded-full"
            />
        );
    } else if (coinType === SUI_TYPE_ARG) {
        return (
            <ActionIcon>
                <SuiIcon width={18} height={18} />
            </ActionIcon>
        );
    }

    return <ActionIcon>{getIcon(txAction)}</ActionIcon>;
};

const ObjectIcon = ({
    objectIds,
    txAction,
}: {
    objectIds: string[];
    txAction: TxAction;
}) => {
    const displayDatas = useDisplayDatas(objectIds);
    const { imageUrl, name } = Object.values(displayDatas)[0] ?? {};

    if (imageUrl) {
        return (
            <img
                src={imageUrl}
                alt={name}
                width={42}
                height={42}
                className="rounded-lg aspect-square"
            />
        );
    }

    return <ActionIcon>{getIcon(txAction)}</ActionIcon>;
};

const getDisplayImage = (
    analyzedTransaction: AnalyzedTransaction,
    txAction: TxAction
): ReactNode | null => {
    if (analyzedTransaction.important.faucet) {
        return (
            <div className="bg-blue-600 flex items-center justify-center rounded-full w-[41px] h-[41px]">
                <SuiIcon height={18} width={18} />
            </div>
        );
    }

    if (analyzedTransaction.important.sending) {
        const { coinType, objectId } = analyzedTransaction.important.sending[0];
        if (coinType) {
            return <CoinIcon coinType={coinType} txAction={txAction} />;
        } else if (objectId) {
            return <ObjectIcon objectIds={[objectId]} txAction={txAction} />;
        }
    }

    if (analyzedTransaction.important.moveCalls) {
        const { possibleDisplayObjectIds } =
            analyzedTransaction.important.moveCalls[0];
        if (possibleDisplayObjectIds && possibleDisplayObjectIds.length > 0) {
            return (
                <ObjectIcon
                    objectIds={possibleDisplayObjectIds}
                    txAction={txAction}
                />
            );
        }
    }

    return null;
};

export default getDisplayImage;

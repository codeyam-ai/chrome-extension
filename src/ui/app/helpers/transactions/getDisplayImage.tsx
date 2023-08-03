import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { useValidatorsWithApy } from '../../hooks/staking/useValidatorsWithApy';
import useDisplayDatas from '../../hooks/useDisplayDatas';
import { useFormatCoin } from '../../hooks/useFormatCoin';
import Sui from '../../pages/home/home/Sui';
import ActionIcon from '../../shared/transactions/ActionIcon';
import { getIcon } from '_src/ui/app/helpers/transactions';

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
                data-testid="coin-icon"
                src={iconUrl}
                alt={coinName ?? symbol}
                width={42}
                height={42}
                className="rounded-full"
            />
        );
    } else if (coinType === SUI_TYPE_ARG) {
        return (
            <ActionIcon isSui paddingOverride={'p-0'}>
                <Sui />
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

const StakingIcon = ({ address }: { address: string }) => {
    const { data: validators } = useValidatorsWithApy();
    const validator = validators?.[address ?? ''];

    if (validator && validator.imageUrl) {
        return (
            <img
                src={validator.imageUrl}
                alt={validator.name}
                className="h-10 w-10 rounded-full"
            />
        );
    }

    return <ActionIcon>{getIcon('staking')}</ActionIcon>;
};

const getDisplayImage = (
    analyzedTransaction: AnalyzedTransaction,
    txAction: TxAction
): ReactNode | null => {
    if (analyzedTransaction.important.faucet) {
        return <Sui />;
    }

    if (analyzedTransaction.important.staking) {
        const { validatorAddress } = analyzedTransaction.important.staking[0];
        return <StakingIcon address={validatorAddress} />;
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

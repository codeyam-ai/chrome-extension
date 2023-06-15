import BigNumber from 'bignumber.js';

import AssetPreviews from './AssetPreviews';
import CardRow from './CardRow';
import { useDependencies } from '_shared/utils/dependenciesContext';
import addressOwner from '_src/ui/app/helpers/transactions/addressOwner';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';

import type { BalanceReduction, BalanceAddition } from '../lib/analyzeChanges';
import type { SuiAddress, SuiObjectChange } from '@mysten/sui.js';

export const Costs = ({
    balanceReductions,
}: {
    balanceReductions: BalanceReduction[];
}) => {
    return (
        <CardRow>
            <Body>Cost{balanceReductions.length > 0 ? 's' : ''}</Body>
            {balanceReductions.length === 0 ? (
                <Body isSemibold>Free</Body>
            ) : (
                <div className="flex flex-col gap-1 items-end">
                    {balanceReductions.map((balanceReduction, index) => (
                        <Amount
                            key={`gain-${index}`}
                            balanceChange={balanceReduction}
                            positive={false}
                        />
                    ))}
                </div>
            )}
        </CardRow>
    );
};

export const Gains = ({
    balanceAdditions,
}: {
    balanceAdditions: BalanceAddition[];
}) => {
    if (balanceAdditions.length === 0) return <></>;

    return (
        <CardRow>
            <Body>Gain{balanceAdditions.length > 0 ? 's' : ''}</Body>
            <div className="flex flex-col gap-1 items-end">
                {balanceAdditions.map((balanceAddition, index) => (
                    <Amount
                        key={`gain-${index}`}
                        balanceChange={balanceAddition}
                        positive={true}
                    />
                ))}
            </div>
        </CardRow>
    );
};

export const Sending = ({
    owner,
    transfers,
}: {
    owner: SuiAddress;
    transfers: SuiObjectChange[];
}) => {
    const sending = transfers.filter(
        (transfer) => transfer.type === 'mutated' && transfer.sender === owner
    );

    if (sending.length === 0) return <></>;

    return (
        <CardRow>
            <Body>Sent</Body>
            <AssetPreviews
                objectIds={sending.map((transfer) =>
                    transfer.type === 'mutated' ? transfer.objectId : ''
                )}
            />
        </CardRow>
    );
};

export const Receiving = ({
    owner,
    transfers,
}: {
    owner: SuiAddress;
    transfers: SuiObjectChange[];
}) => {
    const receiving = transfers.filter(
        (transfer) =>
            transfer.type === 'mutated' &&
            addressOwner(transfer.owner) === owner
    );
    if (receiving.length === 0) return <></>;

    return (
        <CardRow>
            <Body>Receiving</Body>
            <AssetPreviews
                objectIds={receiving.map((transfer) =>
                    transfer.type === 'mutated' ? transfer.objectId : ''
                )}
            />
        </CardRow>
    );
};

export const Mints = ({ mints }: { mints: SuiObjectChange[] }) => {
    if (mints.length === 0) return <></>;

    return (
        <CardRow>
            <Body>Gain{mints.length > 0 ? 's' : ''}</Body>
            <div className="flex flex-col gap-1 items-end">
                {mints.map((mint) => (
                    <div
                        key={`mint-${mint.type === 'created' && mint.objectId}`}
                    >
                        {mint.type === 'created' &&
                            truncateMiddle(mint.objectId)}
                    </div>
                ))}
            </div>
        </CardRow>
    );
};

const Amount = ({
    balanceChange,
    positive,
}: {
    balanceChange: BalanceReduction | BalanceAddition;
    positive: boolean;
}) => {
    const bnAmount = new BigNumber(balanceChange.amount);
    const [formatted, symbol, dollars] = useFormatCoin(
        bnAmount.abs().toString(),
        balanceChange.type
    );

    const { featureFlags } = useDependencies();
    return featureFlags.showUsd ? (
        <div className="flex flex-col items-end text-right">
            <Body className="text-size-ethos-small">
                {formatted} {symbol}
            </Body>
            <div
                className={`flex items-center gap-1 text-base ${
                    positive ? 'text-green-700' : ''
                }`}
            >
                <Body isSemibold className={'font-light'}>
                    {dollars}
                </Body>
                <Body className="font-light">USD</Body>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-end text-right">
            <div
                className={`flex items-center gap-1 text-base ${
                    positive ? 'text-green-700' : ''
                }`}
            >
                <Body isSemibold>
                    {formatted} {symbol}
                </Body>
            </div>
        </div>
    );
};

export default Amount;

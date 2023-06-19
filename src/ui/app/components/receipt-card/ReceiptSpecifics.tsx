import capitalize from '../../helpers/capitalize';
import addressOwner from '../../helpers/transactions/addressOwner';
import truncateMiddle from '../../helpers/truncate-middle';
import { useFormatCoin } from '../../hooks';
import useDisplayDatas from '../../hooks/useDisplayDatas';
import useWalletOrContact from '../../hooks/useWalletOrContact';
import WalletColorAndEmojiCircle from '../../shared/WalletColorAndEmojiCircle';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';
import CopyBody from '../../shared/typography/CopyBody';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';
import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

type ObjectChangeInfo = {
    type: string;
    packageId?: string;
    objectId?: string;
    objectType?: string;
    sender?: string;
    ownerAddress?: string;
};

const ObjectChange = ({ change }: { change: ObjectChangeInfo }) => {
    const wallet = useWalletOrContact(
        change.ownerAddress ?? change.sender ?? ''
    );
    const id = change.objectId ?? change.packageId ?? '';
    const name = change.packageId ? 'Package' : change.objectType ?? '';
    const displayDatas = useDisplayDatas(
        change.objectId ? [change.objectId] : []
    );

    return (
        <div className="flex justify-between items-center w-full">
            <div>
                {wallet && (
                    <div className="flex items-center gap-1">
                        <WalletColorAndEmojiCircle
                            {...wallet}
                            circleSizeClasses={'w-5 h-5'}
                        />
                        <Body isTextColorMedium>{wallet.name}</Body>
                    </div>
                )}
                {!wallet && (change.ownerAddress ?? change.sender) && (
                    <CopyBody txt={change.ownerAddress ?? change.sender ?? ''}>
                        {truncateMiddle(change.ownerAddress ?? change.sender)}
                    </CopyBody>
                )}
            </div>
            <div className="flex justify-end items-center gap-1">
                <div className="flex flex-col items-end">
                    <CopyBody txt={name}>{truncateMiddle(name)}</CopyBody>
                    <CopyBody txt={id} isTextColorMedium className="!text-xs">
                        {truncateMiddle(id)}
                    </CopyBody>
                </div>
                {displayDatas && displayDatas[id] && (
                    <img
                        src={displayDatas[id].imageUrl}
                        alt={`${displayDatas[id].name}`}
                        className="w-8 h-8 rounded-md"
                    />
                )}
            </div>
        </div>
    );
};

const ObjectChanges = ({
    objectChanges,
}: {
    objectChanges: SuiTransactionBlockResponse['objectChanges'];
}) => {
    if (!objectChanges) return <></>;

    const groupedChanges = objectChanges.reduce((acc, change) => {
        if (!change) return acc;
        if (!acc[change.type]) acc[change.type] = [];

        acc[change.type].push({
            ...change,
            ownerAddress:
                'owner' in change ? addressOwner(change.owner) : undefined,
        });
        return acc;
    }, {} as Record<string, ObjectChangeInfo[]>);

    return (
        <div className="flex flex-col gap-3 items-start w-full">
            <BodyLarge isSemibold>Asset Changes</BodyLarge>
            {Object.keys(groupedChanges).map((changeType) => (
                <div
                    key={`object-change-${changeType}`}
                    className="flex flex-col gap-3 items-start w-full"
                >
                    <Body isSemibold>{capitalize(changeType)}</Body>
                    {groupedChanges[changeType].map((change, index) => (
                        <ObjectChange
                            key={`object-change-${changeType}-${index}`}
                            change={change}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

const BalanceChange = ({
    balanceChanges,
}: {
    balanceChanges: SuiTransactionBlockResponse['balanceChanges'];
}) => {
    const balanceChange = balanceChanges?.[0];
    const ownerAddress = addressOwner(balanceChange?.owner);
    const ownerWallet = useWalletOrContact(ownerAddress || '');
    const [formattedAmount, symbol, dollars] = useFormatCoin(
        balanceChange?.amount || 0,
        balanceChange?.coinType || ''
    );

    return (
        <div className="flex justify-between items-center w-full">
            {ownerWallet ? (
                <div className="flex items-center gap-1">
                    <WalletColorAndEmojiCircle
                        {...ownerWallet}
                        circleSizeClasses={'w-5 h-5'}
                    />
                    <Body isTextColorMedium>{ownerWallet.name}</Body>
                </div>
            ) : (
                <CopyBody txt={ownerAddress || ''} isTextColorMedium>
                    {truncateMiddle(ownerAddress)}
                </CopyBody>
            )}
            <Body>
                {formattedAmount} {symbol}{' '}
                {symbol.toLowerCase() === 'sui' && `≈ ${dollars} USD`}
            </Body>
        </div>
    );
};

const BalanceChanges = ({
    balanceChanges,
}: {
    balanceChanges: SuiTransactionBlockResponse['balanceChanges'];
}) => {
    if (!balanceChanges) return <></>;

    return (
        <div className="flex flex-col gap-3 items-start w-full">
            <BodyLarge isSemibold>Balance Changes</BodyLarge>
            {balanceChanges.map((change, index) => (
                <BalanceChange
                    key={`balance-change-${index}`}
                    balanceChanges={[change]}
                />
            ))}
        </div>
    );
};

const ReceiptSpecifics = (analyzedTransaction: AnalyzedTransaction) => {
    return (
        <div className="flex flex-col gap-6 items-start">
            <ObjectChanges
                objectChanges={analyzedTransaction.original.objectChanges}
            />
            <BalanceChanges
                balanceChanges={analyzedTransaction.original.balanceChanges}
            />
        </div>
    );
};

export default ReceiptSpecifics;

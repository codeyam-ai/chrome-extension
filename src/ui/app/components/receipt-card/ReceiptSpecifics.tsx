import addressOwner from '../../helpers/transactions/addressOwner';
import { useFormatCoin } from '../../hooks';
import useWalletOrContact from '../../hooks/useWalletOrContact';
import WalletColorAndEmojiCircle from '../../shared/WalletColorAndEmojiCircle';
import Body from '../../shared/typography/Body';
import BodyLarge from '../../shared/typography/BodyLarge';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';
import type { SuiTransactionBlockResponse } from '@mysten/sui.js';

const BalanceChange = ({
    balanceChanges,
}: {
    balanceChanges: SuiTransactionBlockResponse['balanceChanges'];
}) => {
    const balanceChange = balanceChanges?.[0];
    const ownerAddress = addressOwner(balanceChange?.owner);
    const ownerWallet = useWalletOrContact(ownerAddress || '');
    const [formattedAmount, symbol] = useFormatCoin(
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
                <Body isTextColorMedium>{ownerAddress}</Body>
            )}
            <Body>
                {formattedAmount} {symbol}
            </Body>
        </div>
    );
};

const ReceiptSpecifics = (analyzedTransaction: AnalyzedTransaction) => {
    return (
        <div className="flex flex-col gap-3 items-start">
            {analyzedTransaction.original.balanceChanges && (
                <>
                    <BodyLarge isSemibold>Balance Changes</BodyLarge>
                    {analyzedTransaction.original.balanceChanges.map(
                        (change, index) => (
                            <BalanceChange
                                key={`balance-change-${index}`}
                                balanceChanges={[change]}
                            />
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default ReceiptSpecifics;

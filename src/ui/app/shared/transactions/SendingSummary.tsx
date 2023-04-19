import truncateMiddle from '../../helpers/truncate-middle';
import useWalletOrContact from '../../hooks/useWalletOrContact';
import WalletColorAndEmojiCircle from '../WalletColorAndEmojiCircle';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import CopyBody from '../typography/CopyBody';

import type { SendTransactionInfo } from '../../helpers/transactions/sendTransactionAnalysis';

const SendingSummary = ({
    sendingTransactionInfo,
}: {
    sendingTransactionInfo: SendTransactionInfo;
}) => {
    const { isSender, sender, recipient } = sendingTransactionInfo;
    const otherAddress = isSender ? recipient : sender;

    const otherAddressWallet = useWalletOrContact(otherAddress);

    return (
        <div className="flex flex-col items-start justify-between">
            <div>
                <BodyLarge isSemibold>
                    {isSender ? 'Sent' : 'Received'}{' '}
                    {sendingTransactionInfo.objectId ? 'NFT' : 'Tokens'}
                </BodyLarge>
            </div>
            <div className="flex items-center gap-1">
                <Body>{isSender ? 'To' : 'From'}:</Body>
                {otherAddressWallet ? (
                    <div className="flex gap-1 items-center">
                        <WalletColorAndEmojiCircle
                            {...otherAddressWallet}
                            circleSizeClasses="h-5 w-5"
                            emojiSizeInPx={12}
                        />
                        <Body>{otherAddressWallet.name}</Body>
                    </div>
                ) : (
                    <CopyBody txt={otherAddress}>
                        {truncateMiddle(otherAddress)}
                    </CopyBody>
                )}
            </div>
        </div>
    );
};

export default SendingSummary;

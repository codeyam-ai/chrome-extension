import truncateMiddle from '../../helpers/truncate-middle';
import truncateString from '../../helpers/truncate-string';
import { useFormatCoin } from '../../hooks';
import useWalletOrContact from '../../hooks/useWalletOrContact';
import WalletColorAndEmojiCircle from '../WalletColorAndEmojiCircle';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import CopyBody from '../typography/CopyBody';

import type { SendTransactionInfo } from '../../helpers/transactions/sendTransactionAnalysis';

const SendingSummary = ({
    sendingTransactionInfo,
    timeDisplay,
}: {
    sendingTransactionInfo: SendTransactionInfo;
    timeDisplay: string;
}) => {
    const { isSender, sender, recipient, coinAmount, coinType } =
        sendingTransactionInfo;
    const otherAddress = isSender ? recipient : sender;

    const [formattedCoinAmount, formattedCoinType, , coinName] = useFormatCoin(
        coinAmount,
        coinType
    );

    const otherAddressWallet = useWalletOrContact(otherAddress);

    return (
        <div className="w-full flex justify-between">
            <div className="flex flex-col items-start place-content-center">
                <div>
                    <BodyLarge isSemibold>
                        {isSender ? 'Sent' : 'Received'}{' '}
                        {sendingTransactionInfo.objectId ? 'NFT' : coinName}
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
            <div className="flex flex-col items-end">
                <BodyLarge isSemibold>
                    {`${isSender ? '-' : '+'} ${truncateString(
                        formattedCoinAmount,
                        12
                    )}
                    ${formattedCoinType}`}
                </BodyLarge>
                <Body isTextColorMedium>{timeDisplay}</Body>
            </div>
        </div>
    );
};

export default SendingSummary;

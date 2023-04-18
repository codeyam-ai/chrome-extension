import { SuiAddress } from '@mysten/sui.js';
import SuiIcon from 'src/components/icons/SuiIcon/SuiIcon';
import Body from 'src/components/typography/body/Body';
import BodyLarge from 'src/components/typography/bodyLarge/BodyLarge';
import Copyable from 'src/components/utility/Copyable/Copyable';
import truncateMiddle from 'src/lib/format/truncateMiddle';
import { useFormatCoin } from 'src/lib/format/useFormatCoin';
import { SendTransactionInfo } from 'src/lib/transactions/sendTransactionAnalysis';

export type CoinSendingDetailHighlightArgs = {
    isSender: boolean;
    coinAmount: BigInt;
    coinType: string;
};

export type NFTSendingDetailHighlightArgs = {
    isSender: boolean;
    objectId: SuiAddress;
    objectType: string;
};

const CoinSendingDetailHighlight = ({
    isSender,
    coinAmount,
    coinType,
}: CoinSendingDetailHighlightArgs) => {
    const [formattedAmount, symbol] = useFormatCoin(
        coinAmount.toString(),
        coinType
    );

    return (
        <div className="flex gap-2 items-center">
            {isSender ? (
                <BodyLarge className="!text-ethos-light-red !dark:text-ethos-dark-red">
                    - {formattedAmount} {symbol}
                </BodyLarge>
            ) : (
                <BodyLarge className="!text-ethos-light-green !dark:text-ethos-dark-green">
                    + {formattedAmount} {symbol}
                </BodyLarge>
            )}
            <SuiIcon width={18} />
        </div>
    );
};

const NFTSendingDetailHighlight = ({
    isSender,
    objectId,
    objectType,
}: NFTSendingDetailHighlightArgs) => {
    const [, , structName] = objectType.split('::');

    return (
        <div className="flex flex-col gap-1 items-end">
            {isSender ? (
                <BodyLarge className="!text-ethos-light-red !dark:text-ethos-dark-red">
                    -1 {structName}
                </BodyLarge>
            ) : (
                <BodyLarge className="!text-ethos-light-green !dark:text-ethos-dark-green">
                    +1 {structName}
                </BodyLarge>
            )}
            <Copyable copyText={objectId}>
                <Body isTextColorMedium>{truncateMiddle(objectId)}</Body>
            </Copyable>
        </div>
    );
};

const SendingDetailHighlight = ({
    sendingInfo,
}: {
    sendingInfo: SendTransactionInfo;
}) => {
    const { isSender, coinAmount, coinType, objectId, objectType } =
        sendingInfo;

    if (coinAmount && coinType) {
        return (
            <CoinSendingDetailHighlight
                isSender={isSender}
                coinAmount={coinAmount}
                coinType={coinType}
            />
        );
    } else if (objectId && objectType) {
        return (
            <NFTSendingDetailHighlight
                isSender={isSender}
                objectId={objectId}
                objectType={objectType}
            />
        );
    }

    return <></>;
};

export default SendingDetailHighlight;

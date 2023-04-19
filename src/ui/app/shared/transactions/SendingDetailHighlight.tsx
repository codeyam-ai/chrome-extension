import truncateMiddle from '../../helpers/truncate-middle';
import { useFormatCoin } from '../../hooks';
import SuiIcon from '../svg/SuiIcon';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import CopyBody from '../typography/CopyBody';

import type { SendTransactionInfo } from '../../helpers/transactions/sendTransactionAnalysis';
import type { SuiAddress } from '@mysten/sui.js';

export type CoinSendingDetailHighlightArgs = {
    isSender: boolean;
    coinAmount: bigint;
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
            <SuiIcon height={18} width={18} />
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
            <CopyBody txt={objectId}>
                <Body isTextColorMedium>{truncateMiddle(objectId)}</Body>
            </CopyBody>
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

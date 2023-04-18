import truncateMiddle from '../../helpers/truncate-middle';
import Body from '../typography/Body';
import CopyBody from '../typography/CopyBody';

import type { SendTransactionInfo } from '../../helpers/transactions/sendTransactionAnalysis';

const SendingSummary = ({
    sendingTransactionInfo,
    small,
}: {
    sendingTransactionInfo: SendTransactionInfo;
    small?: boolean;
}) => {
    const { isSender, sender, recipient } = sendingTransactionInfo;
    const otherAddress = isSender ? recipient : sender;

    return (
        <Body className={`hidden lg:flex gap-2 ${small ? '!text-xs' : ''}`}>
            {isSender ? 'Sent to' : 'Received from'}:
            <CopyBody txt={sendingTransactionInfo.recipient}>
                {truncateMiddle(otherAddress, small ? 5 : 15)}
            </CopyBody>
        </Body>
    );
};

export default SendingSummary;

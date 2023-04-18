import Body from 'src/components/typography/body/Body';
import Copyable from 'src/components/utility/Copyable/Copyable';
import truncateMiddle from 'src/lib/format/truncateMiddle';
import { SendTransactionInfo } from 'src/lib/transactions/sendTransactionAnalysis';

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
            <Copyable copyText={sendingTransactionInfo.recipient}>
                {truncateMiddle(otherAddress, small ? 5 : 15)}
            </Copyable>
        </Body>
    );
};

export default SendingSummary;

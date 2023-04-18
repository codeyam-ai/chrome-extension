import Body from 'src/components/typography/body/Body';
import Copyable from 'src/components/utility/Copyable/Copyable';
import truncateMiddle from 'src/lib/format/truncateMiddle';
import { StakingTransactionInfo } from 'src/lib/transactions/stakingTransactionAnalysis';

const StakingSummary = ({
    stakingTransactionInfo,
    small,
}: {
    stakingTransactionInfo: StakingTransactionInfo;
    small?: boolean;
}) => {
    return (
        <Body className={`flex gap-2 ${small ? '!text-xs' : ''}`}>
            Staked to:
            <Copyable copyText={stakingTransactionInfo.validator}>
                {truncateMiddle(stakingTransactionInfo.validator, 15)}
            </Copyable>
        </Body>
    );
};

export default StakingSummary;

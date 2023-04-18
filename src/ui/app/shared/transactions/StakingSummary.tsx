import truncateMiddle from '../../helpers/truncate-middle';
import Body from '../typography/Body';
import CopyBody from '../typography/CopyBody';

import type { StakingTransactionInfo } from '../../helpers/transactions/stakingTransactionAnalysis';

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
            <CopyBody txt={stakingTransactionInfo.validator}>
                {truncateMiddle(stakingTransactionInfo.validator, 15)}
            </CopyBody>
        </Body>
    );
};

export default StakingSummary;

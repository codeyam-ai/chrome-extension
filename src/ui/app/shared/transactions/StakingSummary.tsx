import truncateMiddle from '../../helpers/truncate-middle';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
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
        <div className="flex flex-col justify-between items-start">
            <BodyLarge isSemibold>Staked Sui</BodyLarge>
            <div className="flex items-center gap-1 !text-xs">
                <Body isTextColorMedium>To:</Body>
                <CopyBody
                    isTextColorMedium
                    txt={stakingTransactionInfo.validator}
                    className="!text-xs"
                >
                    {truncateMiddle(stakingTransactionInfo.validator)}
                </CopyBody>
            </div>
        </div>
    );
};

export default StakingSummary;

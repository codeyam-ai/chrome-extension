import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { useFormatCoin } from '../../hooks';
import SuiIcon from '../svg/SuiIcon';
import BodyLarge from '../typography/BodyLarge';

import type { StakingTransactionInfo } from '../../helpers/transactions/stakingTransactionAnalysis';

const StakingDetailHighlight = ({
    stakingInfo,
}: {
    stakingInfo: StakingTransactionInfo;
}) => {
    const { amount } = stakingInfo;

    const [formattedAmount, symbol] = useFormatCoin(
        amount.toString(),
        SUI_TYPE_ARG
    );

    return (
        <div className="flex gap-2 items-center">
            <BodyLarge className="!text-ethos-light-green !dark:text-ethos-dark-green">
                {formattedAmount} {symbol}
            </BodyLarge>
            <SuiIcon height={18} width={18} />
        </div>
    );
};

export default StakingDetailHighlight;

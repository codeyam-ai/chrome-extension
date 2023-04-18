import { SUI_TYPE_ARG } from '@mysten/sui.js';
import SuiIcon from 'src/components/icons/SuiIcon/SuiIcon';
import BodyLarge from 'src/components/typography/bodyLarge/BodyLarge';
import { useFormatCoin } from 'src/lib/format/useFormatCoin';
import { StakingTransactionInfo } from 'src/lib/transactions/stakingTransactionAnalysis';

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
            <SuiIcon width={18} />
        </div>
    );
};

export default StakingDetailHighlight;

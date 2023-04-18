import { SUI_TYPE_ARG } from '@mysten/sui.js';
import SuiIcon from 'src/components/icons/SuiIcon/SuiIcon';
import BodyLarge from 'src/components/typography/bodyLarge/BodyLarge';
import { useFormatCoin } from 'src/lib/format/useFormatCoin';
import { FaucetTransactionInfo } from 'src/lib/transactions/faucetTransactionAnalysis';

const FaucetDetailHighlight = ({
    faucetInfo,
}: {
    faucetInfo: FaucetTransactionInfo;
}) => {
    const { amount } = faucetInfo;
    const [formattedAmount, symbol] = useFormatCoin(
        amount.toString(),
        SUI_TYPE_ARG
    );

    return (
        <div className="flex gap-2 items-center">
            <BodyLarge className="!text-ethos-light-green !dark:text-ethos-dark-green">
                +{formattedAmount} {symbol}
            </BodyLarge>
            <SuiIcon width={18} />
        </div>
    );
};

export default FaucetDetailHighlight;

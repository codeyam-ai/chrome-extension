import { SUI_TYPE_ARG } from '@mysten/sui.js';

import { useFormatCoin } from '../../hooks';
import SuiIcon from '../svg/SuiIcon';
import BodyLarge from '../typography/BodyLarge';

import type { FaucetTransactionInfo } from '../../helpers/transactions/faucetTransactionAnalysis';

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
            <SuiIcon height={18} width={18} />
        </div>
    );
};

export default FaucetDetailHighlight;

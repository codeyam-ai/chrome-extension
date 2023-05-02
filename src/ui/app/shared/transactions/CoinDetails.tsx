import classNames from 'classnames';

import truncateString from '../../helpers/truncate-string';
import SuiIcon from '../svg/SuiIcon';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import { useTheme } from '_src/shared/utils/themeContext';

import type { TxAction } from '../../helpers/transactions/getTxAction';

interface CoinDetailsProps {
    txAction: TxAction;
    balanceFormatted: string;
    symbol: string;
    usdAmount: string;
}

const CoinDetails = ({
    balanceFormatted,
    symbol,
    usdAmount,
}: CoinDetailsProps) => {
    const send = parseFloat(balanceFormatted) < 0;
    const { resolvedTheme } = useTheme();

    return (
        <div className="flex flex-col justify-end text-right">
            <Body isTextColorMedium>{usdAmount}</Body>
            <div className="flex gap-2">
                <BodyLarge isSemibold className="flex gap-2 items-center">
                    <span
                        className={classNames(
                            send
                                ? 'text-ethos-light-red dark:text-ethos-dark-red'
                                : 'text-ethos-light-green dark:text-ethos-dark-green'
                        )}
                    >
                        {!send && '+'} {truncateString(balanceFormatted, 9)}{' '}
                        {symbol}
                    </span>
                    <SuiIcon
                        height={16}
                        width={16}
                        color={resolvedTheme === 'dark' ? 'white' : 'black'}
                    />
                </BodyLarge>
            </div>
        </div>
    );
};

export default CoinDetails;

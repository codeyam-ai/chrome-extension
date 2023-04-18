/* eslint-disable @next/next/no-img-element */
import SuiIcon from 'src/components/icons/SuiIcon/SuiIcon';
import Body from 'src/components/typography/body/Body';
import BodyLarge from 'src/components/typography/bodyLarge/BodyLarge';
import truncateString from 'src/lib/format/truncateString';
import { getTheme } from 'src/lib/helpers/getTheme';
import classNames from 'src/lib/styles/classNames';
import { TxAction } from 'src/lib/transactions/getTxAction';

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
    const theme = getTheme();

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
                        width={16}
                        color={theme === 'dark' ? 'white' : 'black'}
                    />
                </BodyLarge>
            </div>
        </div>
    );
};

export default CoinDetails;

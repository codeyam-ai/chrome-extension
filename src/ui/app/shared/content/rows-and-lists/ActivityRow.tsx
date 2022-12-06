import { Link } from 'react-router-dom';

import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';
import { useFormatCoin } from '_src/ui/app/hooks';
import { GAS_TYPE_ARG } from '_src/ui/app/redux/slices/sui-objects/Coin';

type ActivityRowProps = {
    icon: JSX.Element;
    link: string;
    header: JSX.Element | string;
    subheader: string;
    txAmount?: number;
    amountSubtext?: string;
    coinType?: string;
};

export const ActivityRow = ({
    icon,
    link,
    header,
    subheader,
    txAmount,
    coinType,
    amountSubtext,
}: ActivityRowProps) => {
    const [formattedAmount] = useFormatCoin(
        txAmount,
        coinType || GAS_TYPE_ARG
    );

    return (
        <Link to={link} className="flex flex-row justify-between py-3">
            <div className={'flex flex-row items-center gap-3'}>
                <div>{icon}</div>
                <span className="flex flex-col text-left">
                    <BodyLarge>{header}</BodyLarge>
                    <Body isTextColorMedium>{subheader}</Body>
                </span>
            </div>
            <span className="flex flex-row justify-between">
                {txAmount && (
                    <div className={'text-right'}>
                        <BodyLarge isSemibold>{formattedAmount}</BodyLarge>
                        <Body isTextColorMedium>{amountSubtext}</Body>
                    </div>
                )}
            </span>
        </Link>
    );
};

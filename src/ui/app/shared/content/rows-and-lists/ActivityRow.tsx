import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';
import { useFormatCoin } from '_src/ui/app/hooks';

type ActivityRowProps = {
    failed: boolean;
    icon: JSX.Element;
    typeIcon: JSX.Element;
    type: string;
    link: string;
    header?: string;
    subheader: string;
    txAmount?: number;
    amountSubtext?: string;
    coinType?: string;
    date: string;
};

export const ActivityRow = ({
    failed,
    icon,
    typeIcon,
    date,
    type,
    link,
    header,
    subheader,
    txAmount,
    coinType,
}: ActivityRowProps) => {
    const [formattedAmount, symbol, dollars] = useFormatCoin(
        txAmount,
        coinType || '0x2::sui::SUI'
    );

    return (
        <Link to={link} className="flex flex-col">
            <div
                className={
                    'flex flex-row justify-between mb-[18px] items-center'
                }
            >
                {failed ? (
                    <Body isTextColorMedium className={'flex flex-row gap-3'}>
                        <XMarkIcon width={20} height={20} color={'grey'} />{' '}
                        Failed
                    </Body>
                ) : (
                    <Body isTextColorMedium className={'flex flex-row gap-3'}>
                        {typeIcon} {type}
                    </Body>
                )}
                <Body isTextColorMedium>{date}</Body>
            </div>
            <div className={'flex flex-row justify-between mb-9 items-center'}>
                <div className={'flex flex-row items-center gap-3'}>
                    <div>{icon}</div>
                    <span className="flex flex-col text-left">
                        <BodyLarge isSemibold>{header}</BodyLarge>
                        <Body isTextColorMedium>{subheader}</Body>
                    </span>
                </div>
                <div className="flex flex-row justify-between">
                    {txAmount && (
                        <div className={'text-right'}>
                            <BodyLarge isSemibold>
                                {formattedAmount} {symbol}
                            </BodyLarge>
                            <Body
                                isTextColorMedium
                                className={
                                    'inline p-[3px] bg-white bg-opacity-[0.08] rounded-sm'
                                }
                            >
                                {dollars}
                            </Body>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

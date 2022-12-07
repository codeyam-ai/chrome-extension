import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';
import { useFormatCoin } from '_src/ui/app/hooks';
import { GAS_TYPE_ARG } from '_src/ui/app/redux/slices/sui-objects/Coin';

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
        coinType || GAS_TYPE_ARG
    );

    return (
        <Link to={link} className="flex flex-col">
            <div className={'flex flex-row justify-between mb-4 items-center'}>
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
                            <BodyLarge
                                isSemibold
                                className={
                                    type === 'Send'
                                        ? 'text-[#CE3838]'
                                        : 'text-[#238044]'
                                }
                            >
                                {type === 'Send'
                                    ? `-${formattedAmount}`
                                    : `+${formattedAmount}`}{' '}
                                {symbol}
                            </BodyLarge>
                            <Body
                                isTextColorMedium
                                className={
                                    'inline p-[3px] bg-[#f5f5f5] rounded-[4px]'
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

import { XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';
import truncateString from '_src/ui/app/helpers/truncate-string';

type ActivityRowProps = {
    failed: boolean;
    icon: JSX.Element;
    typeIcon: JSX.Element;
    type: string;
    link: string;
    header?: string;
    subheader: string;
    formattedAmount?: string;
    symbol?: string;
    dollars?: string;
    amountSubtext?: string;
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
    formattedAmount,
    symbol,
    dollars,
}: ActivityRowProps) => {
    const displayFormattedAmount = truncateString(formattedAmount || '', 6);
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
                        {typeIcon} {_.capitalize(type)}
                    </Body>
                )}
                <Body isTextColorMedium>{date}</Body>
            </div>
            <div className={'flex flex-row justify-between mb-9 items-center'}>
                <div className={'flex flex-row items-center gap-3'}>
                    <div>{icon}</div>
                    <span className="flex flex-col text-left">
                        <BodyLarge isSemibold>
                            {truncateString(header || '', 16)}
                        </BodyLarge>
                        <Body isTextColorMedium>{subheader}</Body>
                    </span>
                </div>
                <div className="flex flex-row justify-between">
                    {formattedAmount && (
                        <div className={'text-right'}>
                            <BodyLarge
                                isSemibold
                                className={
                                    type === 'send'
                                        ? 'text-[#CE3838]'
                                        : 'text-[#238044]'
                                }
                            >
                                {type === 'send'
                                    ? `-${displayFormattedAmount}`
                                    : `+${displayFormattedAmount}`}{' '}
                                {symbol}
                            </BodyLarge>
                            <Body
                                isTextColorMedium
                                className={
                                    'inline p-[3px] bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary rounded-[4px]'
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

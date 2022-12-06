import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

import BodyLarge from '../../typography/BodyLarge';
import EthosLink from '../../typography/EthosLink';

type LinkWithIconProps = {
    type: 'external' | 'internal' | 'none';
    to?: string;
    text: string;
};

const LinkWithIcon = ({ type, to, text }: LinkWithIconProps) => {
    return (
        <div className={'flex flex-row justify-between'}>
            <BodyLarge>
                <EthosLink type={type} to={to}>
                    {text}
                </EthosLink>
            </BodyLarge>
            <div
                className={
                    'text-ethos-light-text-medium dark:text-ethos-dark-text-medium'
                }
            >
                <ArrowUpRightIcon width={16} height={16} />
            </div>
        </div>
    );
};

export default LinkWithIcon;

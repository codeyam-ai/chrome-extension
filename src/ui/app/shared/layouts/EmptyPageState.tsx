import Body from '../typography/Body';
import EthosLink from '../typography/EthosLink';
import Subheader from '../typography/Subheader';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { LinkType } from '_src/enums/LinkType';
import { TextColor } from '_src/enums/Typography';

import type { ReactNode } from 'react';

interface EmptyPageStateProps {
    iconWithNoClasses: ReactNode;
    title: string;
    subtitle: string;
    linkText: string;
    linkUrl: string;
}

const EmptyPageState = ({
    iconWithNoClasses,
    title,
    subtitle,
    linkText,
    linkUrl,
}: EmptyPageStateProps) => {
    return (
        <div className="flex flex-col gap-2 pt-6 px-6">
            <div className="mx-auto">{iconWithNoClasses}</div>
            <Subheader as="h3">{title}</Subheader>
            <Body textColor={TextColor.Medium}>{subtitle}</Body>
            <Body>
                <EthosLink to={linkUrl} type={LinkType.External}>
                    <span>{linkText}</span>
                    <ArrowRightIcon
                        width={20}
                        height={20}
                        style={{
                            display: 'inline',
                            padding: '5px',
                        }}
                    />
                </EthosLink>
            </Body>
        </div>
    );
};

export default EmptyPageState;

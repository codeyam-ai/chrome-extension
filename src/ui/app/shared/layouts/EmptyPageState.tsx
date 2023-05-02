import Body from '../typography/Body';
import EthosLink from '../typography/EthosLink';
import Subheader from '../typography/Subheader';
import { LinkType } from '_src/enums/LinkType';

import type { ReactNode } from 'react';

interface EmptyPageStateProps {
    iconWithNoClasses: ReactNode;
    title: string;
    subtitle: string;
    linkText?: string;
    linkUrl?: string;
    internal?: boolean;
    onClick?: () => void;
}

const EmptyPageState = ({
    iconWithNoClasses,
    title,
    subtitle,
    linkText,
    linkUrl,
    internal,
    onClick,
}: EmptyPageStateProps) => {
    return (
        <div className="flex flex-col gap-2 pt-8 px-6">
            <span className="mx-auto h-16 w-16 text-ethos-light-text-medium dark:text-ethos-dark-text-medium">
                {iconWithNoClasses}
            </span>
            <Subheader as="h3">{title}</Subheader>
            <Body isTextColorMedium>{subtitle}</Body>
            <Body>
                <EthosLink
                    onClick={onClick}
                    to={linkUrl}
                    type={internal ? LinkType.Internal : LinkType.External}
                >
                    {linkText}
                </EthosLink>
            </Body>
        </div>
    );
};

export default EmptyPageState;

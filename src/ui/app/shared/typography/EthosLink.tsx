import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { LinkType } from '_src/enums/LinkType';

/*
    The EthosLink component should be used within an existing Typography component
    so its non-color font styles (other than weight) are inherited.
*/

export interface EthosLinkProps {
    type: LinkType;
    to?: string;
    onClick?: () => void;
    children: ReactNode;
}

const EthosLink = ({ to, type, onClick, children }: EthosLinkProps) => {
    const linkClasses =
        'font-weight-ethos-semibold-body text-ethos-light-primary-light dark:text-ethos-dark-primary-dark cursor-pointer';
    if (type === LinkType.Internal && to) {
        return (
            <Link to={to} onClick={onClick} className={linkClasses}>
                {children}
            </Link>
        );
    } else if (type === LinkType.External && to) {
        return (
            <a
                href={to}
                onClick={onClick}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
            >
                {children}
            </a>
        );
    } else {
        // LinkType = None
        return (
            <span onClick={onClick} className={linkClasses}>
                {children}
            </span>
        );
    }
};

export default EthosLink;

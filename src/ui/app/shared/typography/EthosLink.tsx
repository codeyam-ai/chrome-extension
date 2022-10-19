import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { LinkType } from '_src/enums/LinkType';

/*
    The EthosLink component should be used within an existing Typography component
    so its non-color font styles (other than weight) are inherited.
*/

export interface EthosLinkProps {
    type: LinkType;
    to: string;
    children: ReactNode;
}

const EthosLink = ({ to, type, children }: EthosLinkProps) => {
    const linkClasses =
        'font-weight-ethos-semibold-body text-ethos-light-primary-light dark:text-ethos-dark-primary-dark';
    if (type === LinkType.Internal) {
        return (
            <Link to={to} className={linkClasses}>
                {children}
            </Link>
        );
    } else {
        return (
            <a
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClasses}
            >
                {children}
            </a>
        );
    }
};

export default EthosLink;

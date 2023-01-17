import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

/*
    The EthosLink component should be used within an existing Typography component
    so its non-color font styles (other than weight) are inherited.
*/

export interface EthosLinkProps {
    type: 'external' | 'internal' | 'none';
    to?: string;
    onClick?: () => void;
    onMouseOver?: () => void;
    forceLightMode?: boolean;
    children: ReactNode;
}

const EthosLink = ({
    to,
    type,
    onClick,
    onMouseOver,
    forceLightMode,
    children,
}: EthosLinkProps) => {
    const linkClasses = `font-weight-ethos-semibold-body text-ethos-light-primary-light cursor-pointer ${
        forceLightMode ? '' : 'dark:text-ethos-dark-primary-dark'
    }`;
    if (type === 'internal' && to) {
        return (
            <Link
                to={to}
                onClick={onClick}
                onMouseOver={onMouseOver}
                className={linkClasses}
            >
                {children}
            </Link>
        );
    } else if (type === 'external' && to) {
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
        // linkType = 'none
        return (
            <span onClick={onClick} className={linkClasses}>
                {children}
            </span>
        );
    }
};

export default EthosLink;

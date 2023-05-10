import { useMemo } from 'react';

import { useTheme } from '_src/shared/utils/themeContext';

import type { SortDirection } from '../../pages/home/home/dapp/dapps/Staking/ValidatorList';

const ArrowUpDownSort = ({
    sortDirection,
    className,
    width,
    height,
}: {
    sortDirection: SortDirection;
    className?: string;
    width?: string;
    height?: string;
}) => {
    const { resolvedTheme } = useTheme();

    const defaultBg = useMemo(
        () => (resolvedTheme === 'light' ? '#111111' : '#FFFFFF'),
        [resolvedTheme]
    );

    const themedPrimaryColor = useMemo(
        () => (resolvedTheme === 'light' ? '#6D28D9' : '#9C78F7'),
        [resolvedTheme]
    );

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={className}
        >
            <path
                d="M1.10864 4.30127L4.48364 0.92627M4.48364 0.92627L7.85864 4.30127M4.48364 0.92627V11.0513M14.6086 11.0513L11.2336 14.4263M11.2336 14.4263L7.85864 11.0513M11.2336 14.4263V4.30127"
                stroke={
                    sortDirection === 'asc' ? themedPrimaryColor : defaultBg
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.6086 11.0513L11.2336 14.4263M11.2336 14.4263L7.85864 11.0513M11.2336 14.4263V4.30127"
                stroke={
                    sortDirection === 'desc' ? themedPrimaryColor : defaultBg
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ArrowUpDownSort;

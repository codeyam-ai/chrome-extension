import React from 'react';

import { getTheme } from '../../helpers/getTheme';

export const Icon = ({
    isRound,
    displayIcon,
}: {
    theme?: 'dark' | 'light';
    isRound?: boolean;
    hasBg?: boolean;
    bgColor?: string;
    iconColor?: string;
    displayIcon: JSX.Element;
}) => {
    const theme = getTheme();

    const styles =
        theme === 'light'
            ? {
                  backgroundColor: '#F1EAFC',
                  iconColor: '#6D28D9',
              }
            : {
                  backgroundColor: 'rgba(156, 120, 247, 0.2)',
                  iconColor: '#9C78F7',
              };

    const clonedIcon = React.cloneElement(displayIcon, {
        color: displayIcon.props.color || styles.iconColor,
        width: displayIcon.props.width || '26px',
        height: displayIcon.props.height || '',
    });

    return (
        <div
            className={`flex w-[56px] h-[56px] justify-center items-center bg-[#F1EAFC] ${
                isRound ? 'rounded-full' : 'rounded-2xl'
            }`}
            style={styles}
        >
            {clonedIcon}
        </div>
    );
};

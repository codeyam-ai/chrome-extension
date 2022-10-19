// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useMenuIsOpen, useNextMenuUrl } from '_components/menu/hooks';

export type MenuButtonProps = {
    className?: string;
};

function MenuButton({ className }: MenuButtonProps) {
    const isOpen = useMenuIsOpen();
    const menuUrl = useNextMenuUrl(!isOpen, '/');
    const iconClasses =
        'h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium';
    return (
        <Link to={menuUrl}>
            {!isOpen ? (
                <Bars3Icon className={iconClasses} />
            ) : (
                <XMarkIcon className={iconClasses} />
            )}
        </Link>
    );
}

export default memo(MenuButton);

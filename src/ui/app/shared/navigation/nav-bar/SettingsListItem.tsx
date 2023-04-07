import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import BodyLarge from '../../../shared/typography/BodyLarge';

import type { SettingsListSectionItem } from './SettingsList';

interface SettingsListItemProps {
    item: SettingsListSectionItem;
    color: string;
}

const SettingsListItem = ({ item, color }: SettingsListItemProps) => {
    const itemContent = (
        <div className="flex p-2 items-center justify-between">
            <div className="flex gap-3 items-center">
                <span
                    className="h-6 w-6"
                    style={{
                        color: color,
                    }}
                >
                    {item.iconWithNoClasses}
                </span>
                <BodyLarge isSemibold>{item.text}</BodyLarge>
            </div>
            <div>
                {(item.isExternalLink || item.isExpandView) && (
                    <ArrowUpRightIcon className="h-4 w-4 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                )}
                {item.detailText && (
                    <BodyLarge isTextColorMedium>{item.detailText}</BodyLarge>
                )}
            </div>
        </div>
    );

    if (item.isExternalLink && item.to) {
        return (
            <a href={item.to} target="_blank" rel="noreferrer">
                {itemContent}
            </a>
        );
    } else if (item.to) {
        // Internal link
        return (
            <Link
                to={item.to}
                className={item.isExpandView ? 'sm:hidden' : ''}
                target={item.isExpandView ? '_blank' : ''}
            >
                {itemContent}
            </Link>
        );
    } else {
        // Not a link
        return (
            <div
                className={item.onClick ? 'cursor-pointer' : ''}
                onClick={item.onClick}
            >
                {itemContent}
            </div>
        );
    }
};

export default SettingsListItem;

import { CheckIcon } from '@heroicons/react/20/solid';
import { type ReactNode } from 'react';

import Body from '../../typography/Body';
import BodyLarge from '../../typography/BodyLarge';

export type RadioCardItem = {
    icon: ReactNode;
    title: string;
    subtitle?: string;
    selected: boolean;
    onClick?: () => null;
};

export interface RadioCardProps {
    item: RadioCardItem;
}
const RadioCard = ({ item }: RadioCardProps) => {
    const { icon, title, subtitle, selected, onClick } = item;

    return (
        <div
            onClick={onClick}
            className={`flex flex-row items-center gap-2 px-3 py-3 shadow-sm rounded-lg border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke ${
                onClick && 'cursor-pointer'
            }`}
        >
            {icon}
            <span className="flex flex-col text-left">
                <BodyLarge>{title}</BodyLarge>
                <Body isTextColorMedium>{subtitle}</Body>
            </span>
            <span className="flex-1">
                {selected && (
                    <CheckIcon className="float-right h-6 w-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                )}
            </span>
        </div>
    );
};

export default RadioCard;

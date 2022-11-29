import { type ReactNode } from 'react';

import BodyLarge from '../typography/BodyLarge';

export interface SegmentedControlItem {
    text: string;
    iconWithNoClasses?: ReactNode;
    isActive: boolean;
    onClick: () => void;
}

interface SegmentedControlProps {
    items: SegmentedControlItem[];
}

const SegmentedControl = ({ items }: SegmentedControlProps) => {
    return (
        <div className="flex flex-col px-6 pb-6">
            <div className="flex gap-[2px] p-1 rounded-xl bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary shadow-ethos-shadow-small">
                {items.map((item, key) => {
                    return (
                        <div
                            className={`flex grow gap-2 p-2 rounded-lg justify-center items-center cursor-pointer ${
                                item.isActive
                                    ? 'shadow-ethos-shadow-small border-[.5px] border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke bg-ethos-light-background-default dark:bg-ethos-dark-background-default'
                                    : ''
                            }`}
                            onClick={item.onClick}
                            key={key}
                        >
                            {item.iconWithNoClasses && (
                                <span
                                    className={`h-5 w-5 ${
                                        item.isActive
                                            ? 'text-ethos-light-primary-light dark:text-ethos-dark-primary-light'
                                            : 'text-ethos-light-text-medium dark:text-ethos-dark-text-medium'
                                    }`}
                                >
                                    {item.iconWithNoClasses}
                                </span>
                            )}
                            <BodyLarge
                                isSemibold
                                className={
                                    item.isActive
                                        ? 'text-ethos-light-primary-light dark:text-ethos-dark-primary-light'
                                        : 'text-ethos-light-text-medium dark:text-ethos-dark-text-medium'
                                }
                            >
                                {item.text}
                            </BodyLarge>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SegmentedControl;

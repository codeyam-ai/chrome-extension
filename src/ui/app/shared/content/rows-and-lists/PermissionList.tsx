import Body from '../../typography/Body';

import type { ReactNode } from 'react';

export interface PermissionListItem {
    iconWithNoClasses: ReactNode;
    title: string;
}

interface PermissionListProps {
    items: PermissionListItem[];
}

const PermissionList = ({ items }: PermissionListProps) => {
    return (
        <div className="flex flex-col px-6 pb-8">
            {items.map((item, key) => {
                return (
                    <div className="flex gap-2 py-2 items-center" key={key}>
                        <span className="h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium">
                            {item.iconWithNoClasses}
                        </span>
                        <Body isTextColorMedium>{item.title}</Body>
                    </div>
                );
            })}
        </div>
    );
};

export default PermissionList;

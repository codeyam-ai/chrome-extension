import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import Body from '_src/ui/app/shared/typography/Body';

import type { ReactNode } from 'react';

const CardRow = ({
    title,
    value,
    color,
    children,
}: {
    title?: string;
    value?: string;
    color?: string;
    children?: ReactNode;
}) => {
    return (
        <div
            className="flex flex-row justify-between items-center p-3"
            style={{ backgroundColor: color }}
        >
            {title && value ? (
                <>
                    <Body>{title}</Body>
                    <Body isSemibold={true}>{truncateMiddle(value)}</Body>
                </>
            ) : (
                children
            )}
        </div>
    );
};

export default CardRow;

import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import Body from '_src/ui/app/shared/typography/Body';

import type { CSSProperties, ReactNode } from 'react';

const CardRow = ({
    title,
    value,
    style,
    children,
}: {
    title?: string;
    value?: string;
    style?: CSSProperties;
    children?: ReactNode;
}) => {
    return (
        <div
            className="flex flex-row justify-between items-center p-3"
            style={style}
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

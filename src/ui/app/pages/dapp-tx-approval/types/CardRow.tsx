import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import Body from '_src/ui/app/shared/typography/Body';

import type { CSSProperties, ReactNode } from 'react';

const CardRow = ({
    title,
    value,
    subvalue,
    style,
    children,
}: {
    title?: string;
    value?: string;
    subvalue?: string;
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
                    <div className="text-right">
                        <Body isSemibold>{truncateMiddle(value, 9)}</Body>
                        {subvalue && (
                            <Body className="text-size-ethos-small">
                                {truncateMiddle(subvalue, 12)}
                            </Body>
                        )}
                    </div>
                </>
            ) : (
                children
            )}
        </div>
    );
};

export default CardRow;

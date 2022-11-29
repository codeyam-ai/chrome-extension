import truncateMiddle from '../../helpers/truncate-middle';

import type { SuiJsonValue } from '@mysten/sui.js';

export type SmallDetail = {
    type: 'small';
    content?:
        | string
        | number
        | boolean
        | SuiJsonValue
        | (string | number | boolean | SuiJsonValue)[];
};

const SmallValue = ({ content, type }: SmallDetail) => {
    if (type !== 'small' || !content) return <></>;

    const contentArray = Array.isArray(content) ? content : [content];
    return (
        <div className="text-xs font-normal text-right">
            {contentArray.map((contentItem, item) => (
                <div
                    key={`detail-${contentItem}`}
                    title={contentItem.toString()}
                >
                    {truncateMiddle(contentItem.toString(), 12)}
                </div>
            ))}
        </div>
    );
};

export default SmallValue;

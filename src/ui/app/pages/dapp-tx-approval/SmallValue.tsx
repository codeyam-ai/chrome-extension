import truncateMiddle from '../../helpers/truncate-middle';
import Body from '../../shared/typography/Body';

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
        <div className="text-right">
            {contentArray.map((contentItem, item) => (
                <Body key={`detail-${contentItem}`}>
                    {truncateMiddle(contentItem.toString(), 5)}
                </Body>
            ))}
        </div>
    );
};

export default SmallValue;

import CostValue from './CostValue';
import NumberedValue from './NumberedValue';
import SmallValue from './SmallValue';
import truncateMiddle from '../../helpers/truncate-middle';
import Body from '../../shared/typography/Body';
import CopyBody from '../../shared/typography/CopyBody';

import type { Cost } from './CostValue';
import type { NumberedDetail } from './NumberedValue';
import type { SmallDetail } from './SmallValue';
import type { SuiJsonValue } from '@mysten/sui.js';

export type Detail = {
    label?: string;
    content?:
        | string
        | number
        | boolean
        | SuiJsonValue
        | SmallDetail
        | NumberedDetail
        | Cost
        | (
              | string
              | number
              | boolean
              | SuiJsonValue
              | SmallDetail
              | NumberedDetail
              | Cost
          )[];
    title?: string;
    detail?: string | string[];
};

const DetailElement = ({ detail }: { detail: Detail }) => {
    const contents = Array.isArray(detail.content)
        ? detail.content
        : [detail.content];

    if ('break' in detail) return <hr />;

    const contentElement = (
        content?:
            | string
            | number
            | boolean
            | SuiJsonValue
            | SmallDetail
            | NumberedDetail
            | Cost
    ) => {
        if (!content) return <></>;
        if (typeof content === 'string')
            return content.length > 12 ? (
                <CopyBody isSemibold txt={content}>
                    {truncateMiddle(content, 8)}
                </CopyBody>
            ) : (
                content
            );
        if (typeof content === 'number') return content;
        if (typeof content === 'boolean') return content;
        if ('value' in content) return <CostValue {...content} />;
        if ('count' in content) return <NumberedValue {...content} />;
        if ('type' in content && content.type === 'small')
            return <SmallValue {...content} />;
    };

    let detailDetailArray;
    if (detail.detail) {
        detailDetailArray = Array.isArray(detail.detail)
            ? detail.detail
            : [detail.detail];
    }

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <Body isTextColorMedium>{detail.label}</Body>
                </div>
                <div className="flex flex-col items-end gap-2">
                    {contents.map((content, index) => (
                        <Body isSemibold key={`detail-content-${index}`}>
                            {contentElement(content)}
                        </Body>
                    ))}
                </div>
            </div>
            {detailDetailArray && (
                <div>
                    {detailDetailArray.map(
                        (detailDetail: string, index: number) => (
                            <Body
                                isSemibold
                                key={`detail-detail-${detailDetail}-${index}`}
                                className="flex justify-end"
                            >
                                {detailDetail}
                            </Body>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default DetailElement;

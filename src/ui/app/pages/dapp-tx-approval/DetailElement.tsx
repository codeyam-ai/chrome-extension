import CostValue from './CostValue';
import NumberedValue from './NumberedValue';
import SmallValue from './SmallValue';

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
        if (typeof content === 'string') return content;
        if (typeof content === 'number') return content;
        if (typeof content === 'boolean') return content;
        if ('value' in content) return <CostValue {...content} />;
        if ('count' in content) return <NumberedValue {...content} />;
        if ('type' in content && content.type === 'small')
            return <SmallValue {...content} />;
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <div className="text-gray-500 dark:text-gray-400">
                        {detail.label}
                    </div>
                </div>
                <div className="dark:text-gray-400 font-semibold flex flex-col items-end gap-1">
                    {contents.map((content, index) => (
                        <div key={`detail-content-${index}`}>
                            {contentElement(content)}
                        </div>
                    ))}
                </div>
            </div>
            {detail.detail && (
                <div className="text-xs text-slate-800 text-right">
                    {detail.detail}
                </div>
            )}
        </div>
    );
};

export default DetailElement;

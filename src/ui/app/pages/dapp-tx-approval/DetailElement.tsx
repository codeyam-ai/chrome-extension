import CostValue from './CostValue';
import NumberedValue from './NumberedValue';

import type { Cost, Detail, NumberedDetail } from './index';

const DetailElement = ({ detail }: { detail: Detail }) => {
    const contents = Array.isArray(detail.content)
        ? detail.content
        : [detail.content];

    if ('break' in detail) return <hr />;

    const contentElement = (
        content?: string | number | NumberedDetail | Cost
    ) => {
        if (!content) return <></>;
        if (typeof content === 'string' || typeof content === 'number')
            return content;
        if ('value' in content) return <CostValue {...content} />;
        if ('count' in content) return <NumberedValue {...content} />;
    };

    return (
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
    );
};

export default DetailElement;

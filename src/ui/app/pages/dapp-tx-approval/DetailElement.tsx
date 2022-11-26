import CostValue from './CostValue';
import NumberedValue from './NumberedValue';

import type { Detail } from './index';

const DetailElement = ({ detail }: { detail: Detail }) => {
    const contents = Array.isArray(detail.content)
        ? detail.content
        : [detail.content];

    if ('break' in detail) return <hr />;

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
                        {content.count !== undefined && (
                            <NumberedValue {...content} />
                        )}
                        {content.value && <CostValue {...content} />}
                        {(typeof content === 'string' ||
                            typeof content === 'number') &&
                            content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailElement;

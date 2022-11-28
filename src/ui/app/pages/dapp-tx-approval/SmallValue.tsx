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

const SmallValue = ({ content, type }: { content: string; type: string }) => {
    if (type !== 'small') return <></>;

    return <div className="text-xs font-normal">{content}</div>;
};

export default SmallValue;

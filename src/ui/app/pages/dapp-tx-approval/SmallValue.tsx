import truncateMiddle from '../../helpers/truncate-middle';
import { useFormatCoin } from '../../hooks';
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
    coinType?: string;
};

const SmallValue = ({ content, type, coinType }: SmallDetail) => {
    if (type !== 'small' || !content) return <></>;

    const contentArray = Array.isArray(content) ? content : [content];

    const CoinItem = ({ balance }: { balance: string }) => {
        const [value, symbol] = useFormatCoin(balance, coinType);

        return (
            <Body className="flex gap-1 items-center">
                {value} {symbol}
            </Body>
        );
    };

    const Item = ({ item }: { item: string }) => {
        return <Body>{truncateMiddle(item, 5)}</Body>;
    };

    return (
        <div className="text-right">
            {contentArray.map((contentItem, item) =>
                coinType ? (
                    <CoinItem
                        key={`detail-${contentItem}`}
                        balance={contentItem.toString()}
                    />
                ) : (
                    <Item
                        key={`detail-${contentItem}`}
                        item={contentItem.toString()}
                    />
                )
            )}
        </div>
    );
};

export default SmallValue;

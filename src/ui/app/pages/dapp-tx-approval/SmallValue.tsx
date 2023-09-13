import truncateMiddle from '../../helpers/truncate-middle';
import { useFormatCoin } from '../../hooks';
import Body from '../../shared/typography/Body';
import CopyBody from '../../shared/typography/CopyBody';

import type { SuiJsonValue } from '@mysten/sui.js/client';

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
        const [value, symbol, dollars] = useFormatCoin(balance, coinType);

        return (
            <Body className="flex gap-1 items-center">
                {value} {symbol} ≈ {dollars} USD
            </Body>
        );
    };

    const Item = ({ item }: { item: string }) => {
        return <CopyBody txt={item}>{truncateMiddle(item, 5)}</CopyBody>;
    };

    return (
        <div className="text-right">
            {contentArray.map((contentItem) =>
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

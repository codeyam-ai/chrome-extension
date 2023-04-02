import CardRow from './CardRow';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';

const Amount = ({ amount, coinType }: { amount: string; coinType: string }) => {
    const [formatted, symbol, dollars] = useFormatCoin(amount, coinType);

    return (
        <CardRow>
            <Body>Cost</Body>
            <div className="text-right">
                {amount === '0' ? (
                    <Body isSemibold>Free</Body>
                ) : (
                    <>
                        <div className="flex items-center gap-1 text-base">
                            <Body className="font-light">USD</Body>
                            <Body isSemibold>{dollars}</Body>
                        </div>
                        <Body className="text-size-ethos-small text-[#74777C]">
                            {formatted} {symbol}
                        </Body>
                    </>
                )}
            </div>
        </CardRow>
    );
};

export default Amount;

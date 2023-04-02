import BigNumber from 'bignumber.js';

import CardRow from './CardRow';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';

const Amount = ({ amount, coinType }: { amount: string; coinType: string }) => {
    const bnAmount = new BigNumber(amount);
    const [formatted, symbol, dollars] = useFormatCoin(
        bnAmount.abs().toString(),
        coinType
    );

    return (
        <CardRow>
            <Body>{bnAmount.lt(0) ? 'Gain' : 'Cost'}</Body>
            <div className="text-right">
                {bnAmount.eq(0) ? (
                    <Body isSemibold>Free</Body>
                ) : (
                    <>
                        <div
                            className={`flex items-center gap-1 text-base ${
                                bnAmount.lt(0) ? 'text-green-700' : ''
                            }`}
                        >
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

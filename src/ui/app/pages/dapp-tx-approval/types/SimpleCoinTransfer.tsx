import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import Continue from './Continue';
import FromTo from './FromTo';
import Header from './Header';
import TransactionBody from './TransactionBody';
import Warning from './Warning';
import { useFormatCoin } from '_src/ui/app/hooks';

import type { BalanceReduction } from '../lib/analyzeChanges';

const SimpleCoinTransfer = ({ reduction }: { reduction: BalanceReduction }) => {
    const to = reduction.recipient;
    const [formatted, symbol, dollars, name, iconUrl] = useFormatCoin(
        new BigNumber(reduction.amount).abs().toString(),
        reduction.type
    );
    const remainingBalance = 40;

    if (!to) return <></>;

    return (
        <div className="w-full">
            <Header>
                <Warning>
                    <div className="flex flex-col gap-1">
                        <div>
                            This transaction will reduce your {symbol} balance
                            by {formatted}
                        </div>
                        <div>
                            Your remaining balance will be {remainingBalance}{' '}
                            {symbol}
                        </div>
                    </div>
                </Warning>
            </Header>
            <TransactionBody>
                <div className="flex flex-col items-center gap-1 text-lg">
                    <div className="font-light">Confirm your want to send</div>
                    <div className="font-semibold">
                        {formatted} {symbol.toUpperCase()}
                    </div>
                    <div className="text-[#74777C] text-base">≈ {dollars}</div>
                </div>
            </TransactionBody>
            <FromTo to={to}></FromTo>
            <Continue />
        </div>
    );
};

export default SimpleCoinTransfer;

import Continue from './Continue';
import FromTo from './FromTo';
import Header from './Header';
import TransactionBody from './TransactionBody';
import Warning from './Warning';
import { useFormatCoin } from '_src/ui/app/hooks';

import type { BalanceReduction } from '../lib/analyzeChanges';
import BigNumber from 'bignumber.js';

const SimpleCoinTransfer = ({ reduction }: { reduction: BalanceReduction }) => {
    const to = reduction.recipient;
    const [formatted, symbol, dollars, name, iconUrl] = useFormatCoin(
        reduction.amount,
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
                            by {new BigNumber(formatted).abs().toString()}
                        </div>
                        <div>
                            Your remaining balance will be {remainingBalance}
                        </div>
                    </div>
                </Warning>
            </Header>
            <TransactionBody></TransactionBody>
            <FromTo to={to}></FromTo>
            <Continue />
        </div>
    );
};

export default SimpleCoinTransfer;

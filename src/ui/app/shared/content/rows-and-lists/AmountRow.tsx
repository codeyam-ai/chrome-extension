import { useMemo } from 'react';

import Body from '../../typography/Body';
import Header from '../../typography/Header';
import Subheader from '../../typography/Subheader';

import { useFormatCoin } from '_src/ui/app/hooks/useFormatCoin';

interface AmountRowProps {
    type: string;
    balance: number | bigint;
}

const AmountRow = ({ type, balance }: AmountRowProps) => {
    const isBalanceZero = useMemo(() => balance.toString() === '0', [balance]);
    const [balanceFormatted, symbol] = useFormatCoin(balance, type);
    // TODO: make this an actual calculation
    const usdAmount = useMemo(
        () => (isBalanceZero ? '$0.00' : '$54.32'),
        [isBalanceZero]
    );

    return (
        <div className="flex flex-row gap-2 items-center px-6 pb-2">
            <Header>{balanceFormatted}</Header>
            <Subheader>{symbol}</Subheader>
            <Body isTextColorMedium>{usdAmount}</Body>
        </div>
    );
};

export default AmountRow;

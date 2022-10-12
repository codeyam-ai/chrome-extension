import { Coin } from '@mysten/sui.js';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { TextColor } from '_src/enums/TypographyEnums';
import { balanceFormatOptions } from '_src/shared/formatting';
import Body from '../../typography/Body';
import Header from '../../typography/Header';
import Subheader from '../../typography/Subheader';

interface AmountRowProps {
    type: string;
    balance: number | bigint;
}

const AmountRow = ({ type, balance }: AmountRowProps) => {
    const symbol = useMemo(() => Coin.getCoinSymbol(type), [type]);
    const intl = useIntl();
    const isBalanceZero = useMemo(() => balance.toString() === '0', [balance]);
    const balanceFormatted = useMemo(
        () => intl.formatNumber(balance, balanceFormatOptions),
        [intl, balance]
    );
    // TODO: make this an actual calculation
    const usdAmount = useMemo(
        () => (isBalanceZero ? '$0.00' : '$54.32'),
        [isBalanceZero]
    );

    return (
        <div className="flex flex-row gap-2 items-center px-6 pb-2">
            <Header>{balanceFormatted}</Header>
            <Subheader>{symbol}</Subheader>
            <Body textColor={TextColor.Medium}>{usdAmount}</Body>
        </div>
    );
};

export default AmountRow;

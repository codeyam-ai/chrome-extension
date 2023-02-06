import { Dot } from './CostValue';
import { useFormatCoin } from '../../hooks';

const FormattedCoin = ({ type, amount }: { type: string; amount: number }) => {
    const [formattedAmount, symbol] = useFormatCoin(amount, type);

    return (
        <div className="text-xs flex gap-1 justify-end items-center">
            <div>{symbol}</div>
            <Dot />
            <div className="text-slate-500">
                {amount < 0 ? '' : '+'}
                {formattedAmount}
            </div>
        </div>
    );
};

export default FormattedCoin;

import CoinBalance from './CoinBalance';
import Loading from '_src/ui/app/components/loading';

const CoinList = ({ balances }: { balances: Record<string, bigint> }) => {
    if (Object.keys(balances).length === 0) {
        return <></>;
    }
    return (
        <div className="text-left">
            {Object.keys(balances).map((type: string) => {
                const balance = balances[type];
                return (
                    <div className={'my-3'} key={type}>
                        <CoinBalance type={type} balance={balance} />
                    </div>
                );
            })}
        </div>
    );
};

export default CoinList;

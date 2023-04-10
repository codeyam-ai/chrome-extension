import CoinBalance from './CoinBalance';

const CoinList = ({ balances }: { balances: Record<string, bigint> }) => {
    return (
        <div className="text-left">
            {Object.keys(balances).map((type: string) => {
                const balance = balances[type];
                return (
                    <div className={'mb-5'} key={type}>
                        <CoinBalance type={type} balance={balance} />
                    </div>
                );
            })}
        </div>
    );
};

export default CoinList;

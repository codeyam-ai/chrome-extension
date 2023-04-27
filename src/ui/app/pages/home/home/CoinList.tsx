import CoinBalanceElement from './CoinBalance';

const CoinList = ({ balances }: { balances: Record<string, bigint> }) => {
    return (
        <div className="text-left" data-testid="coin-list">
            {Object.keys(balances).map((type: string) => {
                const balance = balances[type];
                return (
                    <div className={'mb-5'} key={type}>
                        <CoinBalanceElement
                            type={type}
                            balance={balance.toString()}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default CoinList;

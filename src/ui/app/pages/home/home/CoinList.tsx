import CoinBalanceElement from './CoinBalance';
import Body from '_src/ui/app/shared/typography/Body';

const CoinList = ({ balances }: { balances: Record<string, bigint> }) => {
    return (
        <div className="text-left space-y-2" data-testid="coin-list">
            <Body className="ml-1">My Tokens</Body>
            {Object.keys(balances).map((type: string) => {
                const balance = balances[type];
                return (
                    <CoinBalanceElement
                        key={type}
                        type={type}
                        balance={balance.toString()}
                    />
                );
            })}
        </div>
    );
};

export default CoinList;

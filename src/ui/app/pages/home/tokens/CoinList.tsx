import CoinBalance from './CoinBalance';
import Loading from '_src/ui/app/components/loading';
import Subheader from '_src/ui/app/shared/typography/Subheader';

const CoinList = ({ balances }: { balances: Record<string, bigint> }) => {
    if (Object.keys(balances).length === 0) {
        return <></>;
    }
    return (
        <div className="text-left">
            <Subheader>Coins</Subheader>
            <Loading
                className="py-3 flex justify-center items-center"
                loading={!balances}
            >
                {Object.keys(balances).map((type: string) => {
                    const balance = balances[type];
                    return (
                        <CoinBalance type={type} balance={balance} key={type} />
                    );
                })}
            </Loading>
        </div>
    );
};

export default CoinList;

// otherCoinTypes.map((aCoinType) => {
//     const aCoinBalance = balances[aCoinType];
//     return (
//         <>
//             <div className="">OTHER COINS</div>
//             <CoinBalance
//                 type={aCoinType}
//                 balance={aCoinBalance}
//                 key={aCoinType}
//             />
//         </>
//     );
// });

import CoinBalance from './CoinBalance';
import Loading from '_src/ui/app/components/loading';

const CoinPickerList = ({
    balances,
    coinType,
}: {
    balances: Record<string, bigint>;
    coinType: string;
}) => {
    if (Object.entries(balances).length === 0) {
        return <></>;
    }

    return (
        <div className="text-left">
            <Loading
                className="py-3 flex justify-center items-center"
                loading={!balances}
            >
                {Object.entries(balances).map(([type, balance], idx) => {
                    if (type !== coinType) {
                        return (
                            <div
                                key={'coin-' + idx}
                                className={
                                    'p-2 hover:bg-ethos-light-background-secondary dark:hover:bg-ethos-dark-background-secondary rounded-lg'
                                }
                            >
                                <CoinBalance type={type} balance={balance} />
                            </div>
                        );
                    } else {
                        return <div key={idx}></div>;
                    }
                })}
            </Loading>
        </div>
    );
};

export default CoinPickerList;

import Header from './Header';
import Warning from './Warning';

const SimpleCoinTransfer = () => {
    const symbol = 'Sui';
    const reduction = 50;
    const remainingBalance = 50;

    return (
        <div className="w-full">
            <Header>
                <Warning>
                    <div className="flex flex-col gap-1">
                        <div>
                            This transaction will reduce your {symbol} balance
                            by {reduction}
                        </div>
                        <div>
                            Your remaining balance will be {remainingBalance}
                        </div>
                    </div>
                </Warning>
            </Header>
        </div>
    );
};

export default SimpleCoinTransfer;

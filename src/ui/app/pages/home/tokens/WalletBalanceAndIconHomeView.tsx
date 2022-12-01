import { AccountInfo } from '_src/ui/app/KeypairVault';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

interface WalletBalanceAndIconHomeViewProps {
    accountInfo: AccountInfo;
    dollarValue: number;
}

const WalletBalanceAndIconHomeView = ({
    accountInfo: currentAccountInfo,
    dollarValue,
}: WalletBalanceAndIconHomeViewProps) => {
    const dollarFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let formattedDollarValue = dollarFormatter.format(dollarValue);
    if (formattedDollarValue.endsWith('.00')) {
        formattedDollarValue = formattedDollarValue.slice(0, -3);
    }
    return (
        <div className="flex flex-col gap-6 py-8 px-6 place-items-center">
            <div
                className="h-[104px] w-[104px] rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: currentAccountInfo?.color || '#7E23CA',
                }}
            />
            <div className="flex flex-col gap-1">
                <BodyLarge isSemibold isTextColorMedium>
                    Wallet Balance
                </BodyLarge>
                <Title>{formattedDollarValue}</Title>
            </div>
        </div>
    );
};

export default WalletBalanceAndIconHomeView;

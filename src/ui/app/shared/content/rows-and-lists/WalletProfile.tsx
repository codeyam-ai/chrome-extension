import AccountAddress, {
    AddressMode,
} from '_src/ui/app/components/account-address';
import { useAppSelector } from '_src/ui/app/hooks';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import BodyLarge from '../../typography/BodyLarge';

// This component contains the wallet icon, name, and address
const WalletProfile = () => {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    return (
        <div className="flex flex-row gap-2 items-center py-1">
            <div
                className="h-6 w-6 rounded-full flex items-center justify-center"
                style={{
                    backgroundColor: accountInfo?.color || '#7E23CA',
                }}
            />
            <BodyLarge isSemibold>{accountInfo?.name || 'Wallet'}</BodyLarge>
            <AccountAddress
                showName={false}
                showLink={false}
                mode={AddressMode.FADED}
            />
        </div>
    );
};

export default WalletProfile;

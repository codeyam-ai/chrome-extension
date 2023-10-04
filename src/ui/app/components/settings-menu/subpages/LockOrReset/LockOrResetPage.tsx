import LockWallet from './LockWallet';
import ResetWallet from './ResetWallet';
import SignOutZk from './SignOutZk';
import { AccountType } from '_src/shared/constants';
import { useAppSelector } from '_src/ui/app/hooks';

const LockOrResetPage = () => {
    const isZK = useAppSelector(
        ({ account: { accountType } }) => accountType === AccountType.ZK
    );

    if (isZK) {
        return (
            <div className="py-6">
                <SignOutZk />
            </div>
        );
    }

    return (
        <div className="flex flex-col py-6 gap-6">
            <LockWallet />
            <ResetWallet />
        </div>
    );
};

export default LockOrResetPage;

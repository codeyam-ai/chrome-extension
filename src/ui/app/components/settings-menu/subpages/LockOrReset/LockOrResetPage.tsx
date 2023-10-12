import LockWallet from './LockWallet';
import ResetWallet from './ResetWallet';
import SignOutEmail from './SignOutEmail';
import SignOutZk from './SignOutZk';
import { AccountType } from '_src/shared/constants';
import { useAppSelector } from '_src/ui/app/hooks';

const LockOrResetPage = () => {
    const { isZk, isEmail } = useAppSelector(
        ({ account: { accountType } }) => ({
            isZk: accountType === AccountType.ZK,
            isEmail: accountType === AccountType.EMAIL,
        })
    );

    if (isZk) {
        return (
            <div className="py-6">
                <SignOutZk />
            </div>
        );
    }

    if (isEmail) {
        return (
            <div className="py-6">
                <SignOutEmail />
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

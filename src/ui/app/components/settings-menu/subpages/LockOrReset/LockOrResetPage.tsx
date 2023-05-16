import LockWallet from './LockWallet';
import ResetWallet from './ResetWallet';

const LockOrResetPage = () => {
    return (
        <div className="flex flex-col py-6">
            <LockWallet />
            <ResetWallet />
        </div>
    );
};

export default LockOrResetPage;

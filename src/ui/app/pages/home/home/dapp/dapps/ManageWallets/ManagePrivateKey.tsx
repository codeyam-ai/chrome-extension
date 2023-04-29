import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { deleteImportedPrivateKey } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Header from '_src/ui/app/shared/typography/Header';
import WalletButton from '_src/ui/app/shared/wallet-list/WalletButton';

const ManagePrivateKey = () => {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const name = new URLSearchParams(location.search).get('name');

    const privateKeyAccount = useMemo(() => {
        return accountInfos.find(
            (accountInfo) => accountInfo.importedPrivateKeyName === name
        );
    }, [accountInfos, name]);

    const deletePrivateKey = useCallback(async () => {
        if (!name) return;
        if (
            typeof window !== 'undefined' &&
            window.confirm('Are you sure you want to delete this private key?')
        ) {
            await dispatch(deleteImportedPrivateKey({ name }));
            navigate('/home/manage-wallets');
        }
    }, [dispatch, name, navigate]);

    return (
        <div className="p-6 gap-6 flex flex-col items-center">
            <Header>&#34;{name}&#34; Private Key</Header>
            {privateKeyAccount && (
                <WalletButton
                    wallet={privateKeyAccount}
                    isActive={false}
                    isWalletEditing={false}
                    destination={'/home'}
                />
            )}
            <Button
                buttonStyle="secondary"
                removeContainerPadding
                onClick={deletePrivateKey}
            >
                Delete Private Key
            </Button>
        </div>
    );
};

export default ManagePrivateKey;

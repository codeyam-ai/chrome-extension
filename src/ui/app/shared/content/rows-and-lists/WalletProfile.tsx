import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Body from '../../typography/Body';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import AccountAddress, {
    AddressMode,
} from '_src/ui/app/components/account-address';
import { useNextMenuUrl } from '_src/ui/app/components/menu/hooks';
import { useAppSelector } from '_src/ui/app/hooks';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import BodyLarge from '../../typography/BodyLarge';

// This component contains the wallet icon, name, and address
const WalletProfile = () => {
    const [editWallet, setEditWallet] = useState<boolean>(false);

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const switchWalletUrl = useNextMenuUrl(true, '/switch-wallet');
    const navigate = useNavigate();

    const _selectWallet = useCallback(() => {
        navigate(switchWalletUrl);
    }, [navigate, switchWalletUrl]);

    const _showEdit = useCallback(() => {
        setEditWallet(true);
    }, []);

    const _hideEdit = useCallback(() => {
        setEditWallet(false);
    }, []);

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

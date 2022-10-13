import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountAddress, {
    AddressMode,
} from '_src/ui/app/components/account-address';
import { useNextMenuUrl } from '_src/ui/app/components/menu/hooks';
import { useAppSelector } from '_src/ui/app/hooks';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import Body from '../../typography/Body';

const WalletRow = () => {
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
        <div className="flex flex-row gap-2 items-center py-4 px-6">
            <div
                className="flex flex-row gap-2 items-center cursor-pointer"
                onClick={_selectWallet}
                onMouseOver={_showEdit}
                onMouseOut={_hideEdit}
            >
                <div
                    className="h-5 w-5 rounded-full flex items-center justify-center"
                    style={{
                        backgroundColor: accountInfo?.color || '#7E23CA',
                    }}
                >
                    {editWallet && (
                        <svg
                            viewBox="0 0 24 24"
                            width="12"
                            height="12"
                            stroke="white"
                            strokeWidth="2"
                            fill="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={_selectWallet}
                        >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    )}
                </div>
                <Body>{accountInfo?.name || 'Wallet'}</Body>
            </div>
            <span>{' • '}</span>
            <AccountAddress
                showName={false}
                showLink={false}
                mode={AddressMode.FADED}
            />
        </div>
    );
};

export default WalletRow;

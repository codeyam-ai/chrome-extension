import { type AccountInfo } from '../../KeypairVault';
import WalletButton from './WalletButton';

interface WalletListProps {
    hasTopPadding?: boolean;
    wallets: AccountInfo[];
    activeAccountIndex: number;
    isWalletEditing: boolean;
}

const WalletList = ({
    hasTopPadding,
    wallets,
    activeAccountIndex,
    isWalletEditing,
}: WalletListProps) => {
    return (
        <div
            className={`${
                hasTopPadding ? 'pt-3' : 'pt-0'
            } px-3 pb-4 flex flex-col gap-1`}
        >
            {wallets.map((wallet, key) => {
                const isActive = (wallet.index || 0) === activeAccountIndex;
                return (
                    <div key={key}>
                        <WalletButton
                            wallet={wallet}
                            isActive={isActive}
                            isWalletEditing={isWalletEditing}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default WalletList;

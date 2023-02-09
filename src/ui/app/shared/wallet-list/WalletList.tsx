import WalletButton from './WalletButton';
import { type AccountInfo } from '../../KeypairVault';
import BodyLarge from '../typography/BodyLarge';

export type WalletListProps = {
    header?: string;
    hasTopPadding?: boolean;
    wallets: AccountInfo[];
    activeAccountIndex: number;
    isWalletEditing: boolean;
};

const WalletList = ({
    header,
    hasTopPadding,
    wallets,
    activeAccountIndex,
    isWalletEditing,
}: WalletListProps) => {
    return (
        <div
            className={`${hasTopPadding ? 'pt-3' : 'pt-0'} ${
                isWalletEditing ? 'max-h-[482px]' : 'max-h-[432px]'
            } px-3 pb-4 flex flex-col gap-1 overflow-scroll no-scrollbar`}
        >
            <BodyLarge
                isSemibold
                isTextColorMedium
                className={'text-left pl-4'}
            >
                {header}
            </BodyLarge>
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

import { useCallback } from 'react';

import { type AccountInfo } from '../../KeypairVault';
import { useAppDispatch, useAppSelector, useMiddleEllipsis } from '../../hooks';
import { setSuiRecipient } from '../../redux/slices/forms';
import WalletColorAndEmojiCircle from '../WalletColorAndEmojiCircle';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

interface WalletSelectorProps {
    wallet: AccountInfo;
}

const WalletSelector = ({ wallet }: WalletSelectorProps) => {
    const dispatch = useAppDispatch();
    const shortenedAddress = useMiddleEllipsis(wallet.address, 24, 12);
    const account = useAppSelector(({ account }) => account);

    const selectWallet = useCallback(
        (addr: string) => {
            dispatch(
                setSuiRecipient({
                    to: addr,
                    from:
                        account.accountInfos[account.activeAccountIndex].name ||
                        'Wallet',
                })
            );
        },
        [account, dispatch]
    );

    return (
        <div
            data-testid={`wallet${wallet.index + 1}`}
            className={`py-[10px] px-3 flex justify-between items-center cursor-pointer`}
            onClick={() => selectWallet(wallet.address)}
        >
            <div className="flex gap-3">
                <WalletColorAndEmojiCircle
                    color={wallet.color}
                    emoji={wallet.emoji}
                    circleSizeClasses="h-10 w-10"
                    emojiSizeInPx={22}
                />
                <div className="flex flex-col text-left" title={wallet.address}>
                    <BodyLarge>
                        {wallet.name ||
                            `Wallet${
                                wallet.index > 0 ? ' ' + wallet.index + 1 : ''
                            }`}
                    </BodyLarge>
                    <Body isTextColorMedium>{shortenedAddress}</Body>
                </div>
            </div>
        </div>
    );
};

export type SuiTxWalletListProps = {
    header?: string;
    hasTopPadding?: boolean;
    wallets: AccountInfo[];
    activeAccountIndex: number;
};

const WalletList = ({
    header,
    hasTopPadding,
    wallets,
    activeAccountIndex,
}: SuiTxWalletListProps) => {
    return (
        <div
            className={`${
                hasTopPadding ? 'pt-3' : 'pt-0'
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
                if ((wallet.index || 0) !== activeAccountIndex) {
                    return (
                        <div key={key}>
                            <WalletSelector wallet={wallet} />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default WalletList;

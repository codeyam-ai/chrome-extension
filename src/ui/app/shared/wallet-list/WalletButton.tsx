import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { type AccountInfo } from '../../KeypairVault';
import { useEditWalletUrl } from '../../components/settings-menu/hooks';
import { useAppDispatch, useMiddleEllipsis } from '../../hooks';
import { saveActiveAccountIndex } from '../../redux/slices/account';
import WalletColorAndEmojiCircle from '../WalletColorAndEmojiCircle';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import { clearForNetworkOrWalletSwitch } from '_redux/slices/sui-objects';

interface WalletButtonProps {
    wallet: AccountInfo;
    isActive: boolean;
    isWalletEditing: boolean;
}

const WalletButton = ({
    wallet,
    isActive,
    isWalletEditing,
}: WalletButtonProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const shortenedAddress = useMiddleEllipsis(wallet.address, 24, 12);
    const editWalletUrl = useEditWalletUrl(wallet.index);

    const switchToThisWallet = useCallback(async () => {
        if (isActive) {
            navigate(-1);
            return;
        }
        if (isWalletEditing) return;
        await dispatch(clearForNetworkOrWalletSwitch());
        await dispatch(saveActiveAccountIndex(wallet.index));
        navigate(-1);
    }, [wallet.index, isWalletEditing, isActive, dispatch, navigate]);

    const editThisWallet = useCallback(() => {
        navigate(editWalletUrl);
    }, [navigate, editWalletUrl]);

    return (
        <div
            data-testid={`wallet${wallet.index + 1}`}
            className="py-[10px] px-3 flex justify-between items-center cursor-pointer"
            onClick={isWalletEditing ? editThisWallet : switchToThisWallet}
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
            <div>
                {isWalletEditing && (
                    <button>
                        <PencilIcon className="h-5 w-5 text-black dark:text-white" />
                    </button>
                )}
                {isActive && !isWalletEditing && (
                    <CheckCircleIcon
                        data-testid={`check-circle-${wallet.index + 1}`}
                        className="h-5 w-5 text-ethos-light-primary-light"
                    />
                )}
            </div>
        </div>
    );
};

export default WalletButton;

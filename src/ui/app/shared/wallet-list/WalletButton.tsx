import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { type AccountInfo } from '../../KeypairVault';
import { useEditWalletUrl } from '../../components/settings-menu/hooks';
import { useAppDispatch, useMiddleEllipsis } from '../../hooks';
import useWalletName from '../../hooks/useWalletName';
import { saveActiveAccountIndex } from '../../redux/slices/account';
import WalletColorAndEmojiCircle from '../WalletColorAndEmojiCircle';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import { clearForNetworkOrWalletSwitch } from '_redux/slices/sui-objects';

interface WalletButtonProps {
    wallet: AccountInfo;
    isActive: boolean;
    isWalletEditing: boolean;
    destination?: string;
}

const WalletButton = ({
    wallet,
    isActive,
    isWalletEditing,
    destination,
}: WalletButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const shortenedAddress = useMiddleEllipsis(wallet.address, 24, 12);
    const editWalletUrl = useEditWalletUrl(wallet.index);

    const switchToThisWallet = useCallback(async () => {
        if (isActive) {
            if (destination) {
                navigate(destination);
            } else {
                navigate(-1);
            }
            return;
        }
        if (isWalletEditing) return;
        await dispatch(clearForNetworkOrWalletSwitch());
        await dispatch(saveActiveAccountIndex(wallet.index));
        if (destination) {
            navigate(destination);
        } else {
            navigate(-1);
        }
    }, [
        isActive,
        isWalletEditing,
        dispatch,
        wallet.index,
        destination,
        navigate,
    ]);

    const editThisWallet = useCallback(() => {
        navigate(editWalletUrl);
    }, [navigate, editWalletUrl]);

    useEffect(() => {
        if (isActive && ref.current?.scrollIntoView) {
            ref.current.scrollIntoView();
        }
    }, [isActive]);

    const name = useWalletName(wallet);

    return (
        <div
            ref={ref}
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
                    <BodyLarge>{name}</BodyLarge>
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

import { useCallback } from 'react';

import { type AccountInfo } from '../../KeypairVault';
import { useMiddleEllipsis } from '../../hooks';
import WalletColorAndEmojiCircle from '../WalletColorAndEmojiCircle';
import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { Contact } from '../../redux/slices/contacts';

interface WalletSelectorProps {
    wallet: AccountInfo | Contact;
    setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
    ) => void;
}

const WalletSelector = ({ wallet, setFieldValue }: WalletSelectorProps) => {
    const shortenedAddress = useMiddleEllipsis(wallet.address, 24, 12);

    const selectWallet = useCallback(() => {
        setFieldValue('to', wallet.address);
    }, [setFieldValue, wallet.address]);

    return (
        <div
            data-testid={`wallet${wallet.address}`}
            className={`py-[10px] px-3 flex justify-between items-center cursor-pointer`}
            onClick={selectWallet}
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
                                'index' in wallet
                                    ? wallet.index > 0
                                        ? ' ' + wallet.index + 1
                                        : ''
                                    : wallet.address
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
    wallets?: (AccountInfo | Contact)[];
    activeAccountIndex: number;
    setFieldValue: (
        field: string,
        value: string,
        shouldValidate?: boolean | undefined
    ) => void;
};

const WalletList = ({
    header,
    hasTopPadding,
    wallets,
    activeAccountIndex,
    setFieldValue,
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
            {wallets &&
                wallets.map((wallet, key) => {
                    if (
                        !('index' in wallet) ||
                        (wallet.index || 0) !== activeAccountIndex
                    ) {
                        return (
                            <div key={key}>
                                <WalletSelector
                                    wallet={wallet}
                                    setFieldValue={setFieldValue}
                                />
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

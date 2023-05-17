import {
    ChevronDoubleDownIcon,
    CodeBracketIcon,
} from '@heroicons/react/24/solid';

import truncateMiddle from '../../helpers/truncate-middle';
import { useAppSelector } from '../../hooks';
import { useValidatorsWithApy } from '../../hooks/staking/useValidatorsWithApy';
import useWalletOrContact from '../../hooks/useWalletOrContact';
import ValidatorImage from '../../pages/home/home/dapp/dapps/Staking/Validator/ValidatorImage';
import WalletColorAndEmojiCircle from '../../shared/WalletColorAndEmojiCircle';
import ActionIcon from '../../shared/transactions/ActionIcon';
import BodyLarge from '../../shared/typography/BodyLarge';
import CopyBody from '../../shared/typography/CopyBody';

import type { AnalyzedTransaction } from '../../helpers/transactions/analyzeTransactions';
import type { SuiAddress } from '@mysten/sui.js';

const AvatarItem = ({
    color,
    pre,
    header,
    subheader,
    emoji,
    fullHeader,
}: {
    color?: string;
    pre?: string;
    header?: string;
    subheader?: string;
    emoji?: string;
    fullHeader?: string;
}) => (
    <div className={'flex items-center gap-3'}>
        <WalletColorAndEmojiCircle
            emojiSizeInPx={20}
            circleSizeClasses={'w-[40px] h-[40px] auto'}
            color={color || '#7E23CA'}
            emoji={emoji}
        />
        <div className={'flex flex-col items-start'}>
            <div className="flex gap-1 items-center">
                {!fullHeader && (
                    <BodyLarge isSemibold>{pre ? `${pre}:` : ''}</BodyLarge>
                )}
                {(fullHeader ?? header ?? '').length > 24 ? (
                    <CopyBody
                        txt={fullHeader ?? header ?? ''}
                        large
                        isSemibold
                        className={'text-left'}
                    >
                        {truncateMiddle(fullHeader ?? header)}
                    </CopyBody>
                ) : (
                    <BodyLarge isSemibold className={'text-left'}>
                        {fullHeader ?? header}
                    </BodyLarge>
                )}
            </div>

            <CopyBody
                txt={subheader || ''}
                className={'text-ethos-light-text-medium text-left'}
            >
                {truncateMiddle(subheader)}
            </CopyBody>
        </div>
    </div>
);

const WalletAvatarItem = ({
    pre,
    fullHeader,
    address,
}: {
    pre: string;
    fullHeader?: string;
    address: SuiAddress;
}) => {
    const wallet = useWalletOrContact(address);
    const { activeAccountIndex, accountInfos } = useAppSelector(
        ({ account }) => account
    );
    const activeAccount =
        accountInfos.find((a) => a.index === activeAccountIndex) ??
        accountInfos[0];
    const header = fullHeader ? undefined : wallet?.name ?? address;
    const subheader = header === address ? undefined : address;

    if (address === activeAccount.address) {
        return <AvatarItem fullHeader={`${pre}: You`} {...activeAccount} />;
    } else {
        return (
            <AvatarItem
                color={wallet?.color ?? '#6D28D9'}
                fullHeader={fullHeader}
                pre={fullHeader ? undefined : pre}
                header={header}
                subheader={subheader}
                emoji={wallet?.emoji ?? ''}
            />
        );
    }
};

const PrimaryInteraction = ({ from, important }: AnalyzedTransaction) => {
    const { data: validators } = useValidatorsWithApy();

    let toAddress;
    let toNode;
    let fromHeader;
    let toValidator;

    if (important.faucet) {
        fromHeader = 'From: Sui Faucet';
    }

    if (important.sending) {
        toAddress = important.sending[0].recipient;
    }

    if (important.moveCalls) {
        const { functionName, moduleName, packageObjectId } =
            important.moveCalls[0];
        toNode = (
            <div className="flex items-center gap-3">
                <ActionIcon>
                    <CodeBracketIcon />
                </ActionIcon>
                <div className="flex flex-col items-start text-left">
                    <BodyLarge isSemibold>
                        {moduleName} &gt; {functionName}
                    </BodyLarge>
                    <CopyBody txt={packageObjectId} isTextColorMedium>
                        {truncateMiddle(packageObjectId)}
                    </CopyBody>
                </div>
            </div>
        );
    }

    if (important.staking) {
        toAddress = important.staking[0].validatorAddress;
        const validator = validators?.[important.staking[0].validatorAddress];
        toNode = undefined;
        toValidator = (
            <div className="flex items-center gap-3">
                <ValidatorImage
                    validator={validator}
                    className="h-9 w-9 rounded-full"
                />
                <div className="flex flex-col items-start text-left">
                    <BodyLarge isSemibold>{validator?.name}</BodyLarge>
                    <CopyBody
                        txt={validator?.suiAddress ?? ''}
                        isTextColorMedium
                    >
                        {truncateMiddle(validator?.suiAddress)}
                    </CopyBody>
                </div>
            </div>
        );
    }

    return (
        <div className={'py-3 flex flex-col gap-3'}>
            {from && (
                <WalletAvatarItem
                    pre="From"
                    fullHeader={fromHeader}
                    address={from}
                />
            )}
            {(toAddress || toNode || toValidator) && (
                <>
                    <div className="pl-[6px] text-ethos-light-text-medium dark:text-ethos-dark-text-medium">
                        <ChevronDoubleDownIcon width={25} height={23} />
                    </div>
                    {toValidator && toValidator}
                    {toNode && toNode}
                    {!toNode && !toValidator && !!toAddress && (
                        <WalletAvatarItem pre="To" address={toAddress} />
                    )}
                </>
            )}
        </div>
    );
};

export default PrimaryInteraction;

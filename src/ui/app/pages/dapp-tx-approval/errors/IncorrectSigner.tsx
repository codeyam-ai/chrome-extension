import { useCallback, useMemo } from 'react';

import WrongAddress from './WrongAddress';
import AccountAddress, {
    AddressMode,
} from '_src/ui/app/components/account-address';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { saveActiveAccountIndex } from '_src/ui/app/redux/slices/account';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';
import Button from '_src/ui/app/shared/buttons/Button';
import Alert from '_src/ui/app/shared/feedback/Alert';
import Body from '_src/ui/app/shared/typography/Body';

import type { TransactionRequest } from '_src/shared/messaging/messages/payloads/transactions';

type IncorrectSignerProps = {
    correctAddress?: string;
    errorMessage?: string;
    txID?: string;
    txRequest?: TransactionRequest | null;
};

const IncorrectSigner = ({
    correctAddress,
    errorMessage,
    txID,
    txRequest,
}: IncorrectSignerProps) => {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);

    const dispatch = useAppDispatch();

    const correctAccount = useMemo(
        () =>
            accountInfos.find(
                (accountInfo) => accountInfo.address === correctAddress
            ),
        [accountInfos, correctAddress]
    );

    const switchSigner = useCallback(async () => {
        // setIncorrectSigner(undefined);
        const index = accountInfos.findIndex(
            (accountInfo) => accountInfo.address === correctAddress
        );
        await dispatch(saveActiveAccountIndex(index));
    }, [dispatch, accountInfos, correctAddress]);

    if (!correctAccount) {
        if (errorMessage && txRequest) {
            return (
                <WrongAddress
                    errorMessage={errorMessage}
                    txID={txID}
                    txRequest={txRequest}
                />
            );
        } else {
            return (
                <Alert
                    title="Wrong Wallet Address"
                    subtitle={
                        <Body as="div" className="flex flex-col gap-6 py-6">
                            <div>
                                Please check that you are signing this
                                transaction with the correct wallet address. The
                                wallet address that was expected was:
                            </div>
                            <div>{correctAddress}</div>
                        </Body>
                    }
                />
            );
        }
    }

    return (
        <div className="px-6 pb-6 flex flex-col gap-6 items-start justify-start">
            <Alert
                title="Wrong Wallet Address"
                subtitle={
                    <Body as="div" className="flex flex-col gap-6 py-6">
                        <div>
                            This transaction request needs to be signed with the
                            wallet address:
                        </div>
                        <div className="flex gap-2 items-center">
                            {correctAccount.color && (
                                <WalletColorAndEmojiCircle
                                    {...correctAccount}
                                    circleSizeClasses="h-6 w-6 "
                                    emojiSizeInPx={12}
                                />
                            )}
                            {correctAccount.name && (
                                <div>{correctAccount.name}</div>
                            )}
                            <AccountAddress
                                showName={false}
                                showLink={false}
                                mode={AddressMode.FADED}
                            />
                        </div>
                        <div>
                            Would you like to switch to this wallet address?
                        </div>
                        <Button
                            buttonStyle="primary"
                            onClick={switchSigner}
                            removeContainerPadding={true}
                        >
                            Switch
                        </Button>
                    </Body>
                }
            />
        </div>
    );
};

export default IncorrectSigner;

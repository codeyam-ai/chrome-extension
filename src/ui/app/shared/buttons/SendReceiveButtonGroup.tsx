import {
    CreditCardIcon,
    PaperAirplaneIcon,
    ArrowDownTrayIcon,
    CloudArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useCallback, useMemo, useState } from 'react';
import { API_ENV_TO_INFO } from '../../ApiProvider';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import { useAppSelector } from '../../hooks';
import { GAS_TYPE_ARG } from '../../redux/slices/sui-objects/Coin';
import InlineButtonGroup from './InlineButtonGroup';

interface SendReceiveButtonGroupProps {
    mistBalance: number | bigint;
}

const SendReceiveButtonGroup = ({
    mistBalance,
}: SendReceiveButtonGroupProps) => {
    // Update with login when mainnet happens
    const isMainnet = false;
    const isBalanceZero = useMemo(
        () => mistBalance.toString() === '0',
        [mistBalance]
    );
    const sendUrl = useMemo(
        () => `/send?${new URLSearchParams({ type: GAS_TYPE_ARG }).toString()}`,
        [GAS_TYPE_ARG]
    );

    const faucetAvailable = useMemo(
        () => mistBalance < 10000000,
        [mistBalance]
    );

    const showFaucet = useMemo(() => {
        return faucetAvailable && !isMainnet && isBalanceZero;
    }, [faucetAvailable, isMainnet, isBalanceZero]);

    const [isFaucetInProgress, setIsFaucetInProgress] = useState(false);
    const address = useAppSelector(({ account }) => account.address);

    const _faucet = useCallback(() => {
        if (!faucetAvailable) return;
        setIsFaucetInProgress(true);
        const faucet = async () => {
            await fetch('https://faucet.devnet.sui.io:443/gas', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FixedAmountRequest: {
                        recipient: address,
                    },
                }),
            });

            setTimeout(() => {
                setIsFaucetInProgress(false);
            }, 2500);
        };

        faucet();
    }, [faucetAvailable, address]);
    const iconClasses = 'h-4 w-4';
    return (
        <InlineButtonGroup
            buttonPrimaryTo={
                showFaucet ? undefined : isBalanceZero ? '/buy' : sendUrl
            }
            onClickButtonPrimary={showFaucet ? _faucet : undefined}
            isButtonPrimaryDisabled={isFaucetInProgress}
            buttonPrimaryChildren={
                <>
                    {showFaucet ? (
                        <CloudArrowDownIcon className={iconClasses} />
                    ) : isBalanceZero ? (
                        <CreditCardIcon className={iconClasses} />
                    ) : (
                        <PaperAirplaneIcon className={iconClasses} />
                    )}

                    {isFaucetInProgress ? (
                        <LoadingIndicator />
                    ) : showFaucet ? (
                        'Use faucet'
                    ) : isBalanceZero ? (
                        'Buy'
                    ) : (
                        'Send'
                    )}
                </>
            }
            buttonSecondaryTo="/receive"
            buttonSecondaryChildren={
                <>
                    <ArrowDownTrayIcon className={iconClasses} />
                    Receive
                </>
            }
        />
    );
};

export default SendReceiveButtonGroup;

import { CreditCardIcon } from '@heroicons/react/24/outline';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useCallback, useEffect, useMemo, useState } from 'react';

import InlineButtonGroup from './InlineButtonGroup';
// import { API_ENV } from '../../ApiProvider';
import { API_ENV } from '../../ApiProvider';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import { useAppSelector } from '../../hooks';
import { accountAggregateBalancesSelector } from '../../redux/slices/account';
// import TestnetFaucetModal from '../alerts/TestnetFaucetModal';
import Alert from '../feedback/Alert';
import SuiIcon from '../svg/SuiIcon';
import { api } from '_redux/store/thunk-extras';
import { openInNewTab } from '_src/shared/utils';

interface SendReceiveButtonGroupProps {
    mistBalance?: number | bigint;
}

const SendReceiveButtonGroup = ({
    mistBalance,
}: SendReceiveButtonGroupProps) => {
    // Update with login when mainnet happens
    const [error, setError] = useState(false);
    // const [isOpenTestnetFaucetModal, setIsOpenTestnetFaucetModal] =
    //     useState(false);
    // const selectedApiEnv = useAppSelector(({ app }) => app.apiEnv);

    const isBalanceZero = useMemo(
        () => (mistBalance || 0).toString() === '0',
        [mistBalance]
    );
    const sendUrl = useMemo(
        () =>
            `/send/recipient?${new URLSearchParams({
                type: SUI_TYPE_ARG,
            }).toString()}`,
        []
    );

    const [isFaucetInProgress, setIsFaucetInProgress] = useState(false);
    const [balance, setBalance] = useState('');
    const address = useAppSelector(({ account }) => account.address);
    const suiBalance = useAppSelector(accountAggregateBalancesSelector);
    const selectedApiEnv = useAppSelector(({ app }) => app.apiEnv);
    const isMainnet = selectedApiEnv === API_ENV.mainNet;

    const sui =
        suiBalance[
            '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI'
        ];
    useEffect(() => {
        if (!sui) return;
        setBalance(sui.toString());
    }, [sui]);

    const _faucet = useCallback(() => {
        setIsFaucetInProgress(true);
        const faucet = async () => {
            const result = await fetch(`${api.getEndPoints().faucet}gas`, {
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

            if (result.status !== 201 && result.status !== 200) {
                setIsFaucetInProgress(false);
                setError(true);
            }
        };

        setTimeout(() => {
            // Sets the error if the faucet does not work after 15s
            if (isFaucetInProgress) {
                setIsFaucetInProgress(false);
                setError(true);
            }
        }, 15000);

        faucet();
    }, [address, setIsFaucetInProgress, isFaucetInProgress]);

    const openBuyTab = useCallback(() => {
        openInNewTab(`/ui.html?type=popup#/home/buy?env=${selectedApiEnv}`);
    }, [selectedApiEnv]);

    useEffect(() => {
        if (isFaucetInProgress && sui && sui.toString() !== balance) {
            setIsFaucetInProgress(false);
        }
    }, [suiBalance, setIsFaucetInProgress, isFaucetInProgress, sui, balance]);

    const iconClasses = 'h-4 w-4';

    return (
        <>
            {error ? (
                <div className="px-6 pb-4">
                    <Alert
                        title="The faucet isn't working"
                        subtitle="There could be an issue with the Sui network or the Sui faucet. Please try again later."
                    />
                </div>
            ) : isMainnet ? (
                <InlineButtonGroup
                    onClickButtonPrimary={openBuyTab}
                    isButtonPrimaryDisabled={isFaucetInProgress}
                    buttonPrimaryTestId={'buy'}
                    buttonPrimaryChildren={
                        <>
                            <CreditCardIcon className={iconClasses} /> Buy
                        </>
                    }
                    buttonSecondaryTo={sendUrl}
                    buttonSecondaryTestId={'send'}
                    buttonSecondaryChildren={
                        <>
                            <ArrowUpCircleIcon width={20} height={20} /> Send
                        </>
                    }
                />
            ) : (
                <InlineButtonGroup
                    onClickButtonPrimary={_faucet}
                    isButtonPrimaryDisabled={isFaucetInProgress}
                    buttonPrimaryTestId="faucet"
                    buttonPrimaryChildren={
                        <>
                            <SuiIcon width={11} height={16} />

                            {isFaucetInProgress ? (
                                <LoadingIndicator />
                            ) : (
                                'Use faucet'
                            )}
                        </>
                    }
                    onClickButtonSecondary={
                        isBalanceZero ? openBuyTab : undefined
                    }
                    buttonSecondaryTo={isBalanceZero ? undefined : sendUrl}
                    buttonSecondaryTestId={isBalanceZero ? 'buy' : 'send'}
                    buttonSecondaryChildren={
                        <>
                            {isBalanceZero ? (
                                <CreditCardIcon className={iconClasses} />
                            ) : (
                                <ArrowUpCircleIcon width={20} height={20} />
                            )}

                            {isBalanceZero ? 'Buy' : 'Send'}
                        </>
                    }
                />
            )}
        </>
    );
};

export default SendReceiveButtonGroup;

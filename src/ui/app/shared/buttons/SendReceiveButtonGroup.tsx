import { CreditCardIcon } from '@heroicons/react/24/outline';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useMemo, useState } from 'react';

import LoadingIndicator from '../../components/loading/LoadingIndicator';
import { useAppSelector } from '../../hooks';
import { accountAggregateBalancesSelector } from '../../redux/slices/account';
import { GAS_TYPE_ARG } from '../../redux/slices/sui-objects/Coin';
import Alert from '../feedback/Alert';
import SuiIcon from '../svg/SuiIcon';
import InlineButtonGroup from './InlineButtonGroup';

interface SendReceiveButtonGroupProps {
    mistBalance: number | bigint;
}

const SendReceiveButtonGroup = ({
    mistBalance,
}: SendReceiveButtonGroupProps) => {
    // Update with login when mainnet happens
    const [error, setError] = useState(false);
    const isBalanceZero = useMemo(
        () => mistBalance.toString() === '0',
        [mistBalance]
    );
    const sendUrl = useMemo(
        () =>
            `/send/recipient?${new URLSearchParams({
                type: GAS_TYPE_ARG,
            }).toString()}`,
        []
    );

    const [isFaucetInProgress, setIsFaucetInProgress] = useState(false);
    const [balance, setBalance] = useState('');
    const address = useAppSelector(({ account }) => account.address);
    const suiBalance = useAppSelector(accountAggregateBalancesSelector);

    if (!balance) {
        const b = suiBalance['0x2::sui::SUI'].toString();
        setBalance(b);
    }

    const _faucet = useCallback(() => {
        setIsFaucetInProgress(true);
        const faucet = async () => {
            const result = await fetch('https://faucet.devnet.sui.io:443/gas', {
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

    useEffect(() => {
        if (
            isFaucetInProgress &&
            suiBalance['0x2::sui::SUI'].toString() !== balance
        ) {
            setIsFaucetInProgress(false);
        }
    }, [suiBalance, setIsFaucetInProgress, isFaucetInProgress, balance]);

    const iconClasses = 'h-4 w-4';

    return (
        <>
            {error ? (
                <div className="px-6 pb-4">
                    <Alert
                        title="The faucet isn't working"
                        subtitle="There could be an issue with Sui DevNet or the Sui faucet. Please try again later."
                    />
                </div>
            ) : (
                <InlineButtonGroup
                    onClickButtonPrimary={_faucet}
                    isButtonPrimaryDisabled={isFaucetInProgress}
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
                    buttonSecondaryTo={isBalanceZero ? '/receive' : sendUrl}
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

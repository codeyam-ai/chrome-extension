import { useEffect, useState, useCallback } from 'react';
import { loadStripeOnramp } from '@stripe/crypto';
import { CryptoElements, OnrampElement } from './StripeCryptoElements';

import { useAppSelector } from '../../../../hooks';

export default function StripeOnboarding() {
    const address = useAppSelector((state) => state.account.address);
    const [clientSecret, setClientSecret] = useState('');
    const [message, setMessage] = useState('');
    const stripeOnrampPromise = loadStripeOnramp(
        'pk_test_51IJ6DRGUR595v9bNxOZkg0zvbtebEERcOHhT9cvrUmmWPUCLQ5iLMWSsgWidm757xLTKLHsrhq49LW0kvOSDxQQK00c9OdF0cC'
    );

    useEffect(() => {
        // Fetches an onramp session and captures the client secret
        fetch('/create-onramp-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                transaction_details: {
                    destination_currency: 'usdc',
                    destination_exchange_amount: '13.37',
                    destination_network: 'ethereum',
                },
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const onChange = useCallback(({ session }: { session: any }) => {
        setMessage(`OnrampSession is now in ${session.status} state.`);
    }, []);

    return (
        <>
            <CryptoElements stripeOnramp={stripeOnrampPromise}>
                {clientSecret && (
                    <OnrampElement
                        id="onramp-element"
                        clientSecret={clientSecret}
                        appearance={{ theme: 'dark' }}
                        onChange={onChange}
                    />
                )}
            </CryptoElements>
            {message && <div id="onramp-message">{message}</div>}
        </>
    );
}

import { fromB64 } from '@mysten/bcs';
import { useCallback, useState } from 'react';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { extractInfoFromCredential } from '../helpers/biometricAuth';
import { setIsBiometricsSetUp } from '../redux/slices/account';

const CHALLENGE = new TextEncoder().encode('Ethos Wallet');

const CREDENTIAL_CREATION_OPTIONS: CredentialCreationOptions = {
    publicKey: {
        challenge: CHALLENGE,
        rp: {
            name: 'Ethos Wallet',
        },
        user: {
            name: 'Ethos Wallet',
            displayName: 'Ethos Wallet',
            id: CHALLENGE,
        },
        pubKeyCredParams: [
            { type: 'public-key', alg: -7 }, //ES256
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
        },
        timeout: 60000,
    },
    signal: undefined,
};

export function useBiometricAuth() {
    const [credentialIdBase64, setCredentialIdBase64] = useState<string>();
    const [encryptedChallenge, setEncryptedChallenge] = useState<string>();

    const dispatch = useAppDispatch();

    const isSupported =
        navigator.credentials &&
        navigator.platform.toUpperCase().includes('MAC');

    const isBiometricsSetUp = useAppSelector(
        ({ account }) => account.isBiometricsSetUp
    );

    const setup = useCallback(async () => {
        if (!isSupported) {
            return false;
        }

        const credential = await navigator.credentials
            .create(CREDENTIAL_CREATION_OPTIONS)
            .catch(() => {
                return null;
            });

        if (credential) {
            const { id, challenge } = extractInfoFromCredential(credential);

            setCredentialIdBase64(id);
            setEncryptedChallenge(challenge);
            dispatch(setIsBiometricsSetUp(true));
            return true;
        }
        return false;
    }, [dispatch, isSupported]);

    const authenticate = useCallback(
        async (signal?: AbortSignal) => {
            if (!isSupported) {
                // throw new Error('Biometric auth is not supported');
                return false;
            }

            if (!isBiometricsSetUp) {
                console.log('Biometric auth is not set up');

                // throw new Error('Biometric auth is not setuped');
                return false;
            }

            if (credentialIdBase64) {
                const publicKey: PublicKeyCredentialRequestOptions = {
                    challenge: CHALLENGE,
                    allowCredentials: [
                        {
                            type: 'public-key',
                            id: fromB64(credentialIdBase64),
                            transports: ['internal'],
                        },
                    ],
                    userVerification: 'discouraged',
                };

                const credential = await navigator.credentials.get({
                    publicKey,
                    signal,
                });
                if (credential) {
                    const { challenge, signature } =
                        extractInfoFromCredential(credential);
                    console.log('SIGNATURE', signature);

                    console.log('VALID', challenge === encryptedChallenge);
                    return challenge === encryptedChallenge;

                    // Save the signature in local storage
                    // On next authentication check the signature and, if equal, use the challenge to decrypt the password
                    // Use the password as if the user had entered it directly
                }
                return false;
            }
            return false;
        },
        [credentialIdBase64, encryptedChallenge, isBiometricsSetUp, isSupported]
    );

    const reset = useCallback(() => {
        dispatch(setIsBiometricsSetUp(false));
    }, [dispatch]);

    return {
        isSupported,
        isBiometricsSetUp,
        setup,
        authenticate,
        reset,
    };
}

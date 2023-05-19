import { fromB64 } from '@mysten/bcs';
import { useCallback } from 'react';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { extractInfoFromCredential } from '../helpers/biometricAuth';
import {
    removeBiometric,
    saveBiometricID,
    saveBiometricKey,
    unlockViaBiometric,
} from '../redux/slices/account';
import { toast } from 'react-toastify';

export const CHALLENGE = new TextEncoder().encode('Ethos Wallet');

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
    const dispatch = useAppDispatch();

    const isSupported =
        navigator.credentials &&
        navigator.platform.toUpperCase().includes('MAC');

    const biometricID = useAppSelector(({ account }) => account.biometricID);

    const getBiometric = useCallback(
        async (id?: string) => {
            if (!isSupported) {
                // throw new Error('Biometric auth is not supported');
                return;
            }

            if (!id && !biometricID) {
                // throw new Error('Biometric auth is not setuped');
                return;
            }

            const publicKey: PublicKeyCredentialRequestOptions = {
                challenge: CHALLENGE,
                allowCredentials: [
                    {
                        type: 'public-key',
                        id: fromB64(id ?? biometricID ?? ''),
                        transports: ['internal'],
                    },
                ],
                userVerification: 'discouraged',
            };

            const credential = await navigator.credentials.get({
                publicKey,
            });

            if (credential) {
                const { signature } = await extractInfoFromCredential(
                    credential
                );
                return signature;
            }

            return;
        },
        [biometricID, isSupported]
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
            const { id } = await extractInfoFromCredential(credential);

            if (!id) return false;

            const signature = await getBiometric(id);

            if (signature) {
                await dispatch(saveBiometricID(id));
                await dispatch(saveBiometricKey(signature));
                return true;
            }

            return false;
        }
        return false;
    }, [dispatch, isSupported, getBiometric]);

    const authenticate = useCallback(async () => {
        const signature = await getBiometric();

        if (signature) {
            const passphrase = await dispatch(
                unlockViaBiometric(signature)
            ).unwrap();
            return passphrase;
        }

        return null;
    }, [getBiometric, dispatch]);

    const reset = useCallback(async () => {
        const signature = await getBiometric();

        if (signature) {
            dispatch(removeBiometric(signature));
        }
    }, [dispatch, getBiometric]);

    return {
        isSupported,
        isBiometricsSetUp: !!biometricID,
        setup,
        authenticate,
        reset,
    };
}

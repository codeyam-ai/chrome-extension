import { fromB64 } from '@mysten/bcs';
import { useCallback } from 'react';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { extractInfoFromCredential } from '../helpers/biometricAuth';
import {
    deleteBiometric,
    saveBiometricKey,
    setBiometricID,
    unlockViaBiometric,
} from '../redux/slices/account';

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
    // const isBiometricsSetUp = true;

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
            const { id, challenge } = await extractInfoFromCredential(
                credential
            );

            if (id) {
                await dispatch(setBiometricID(id));
            }

            if (challenge) {
                await dispatch(saveBiometricKey(challenge));
            }
            return true;
        }
        return false;
    }, [dispatch, isSupported]);

    const getBiometric = useCallback(async () => {
        if (!isSupported) {
            // throw new Error('Biometric auth is not supported');
            return;
        }

        if (!biometricID) {
            // throw new Error('Biometric auth is not setuped');
            return;
        }

        const publicKey: PublicKeyCredentialRequestOptions = {
            challenge: CHALLENGE,
            allowCredentials: [
                {
                    type: 'public-key',
                    id: fromB64(biometricID),
                    transports: ['internal'],
                },
            ],
            userVerification: 'discouraged',
        };

        const credential = await navigator.credentials.get({
            publicKey,
        });

        if (credential) {
            const { challenge } = await extractInfoFromCredential(credential);
            return challenge;
        }

        return;
    }, [biometricID, isSupported]);

    const authenticate = useCallback(async () => {
        const challenge = await getBiometric();

        if (challenge) {
            const success = await dispatch(unlockViaBiometric(challenge));
            return success;
        }

        return false;
    }, [getBiometric, dispatch]);

    const reset = useCallback(async () => {
        const challenge = await getBiometric();

        if (challenge) {
            dispatch(deleteBiometric(challenge));
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

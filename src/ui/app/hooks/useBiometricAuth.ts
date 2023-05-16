import { useState } from 'react';

import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import { extractInfoFromCredential } from '../helpers/biometricAuth';
import { bufferDecode, bufferEncode } from '../helpers/biometricAuth/buffer';
import importPublicKey from '../helpers/biometricAuth/importPublicKey';
import verifySignature from '../helpers/biometricAuth/verifySignature';
import { setIsBiometricsSetUp } from '../redux/slices/account';

const ETHOS_WALLET_BYTES = new TextEncoder().encode('Ethos Wallet');

const CREDENTIAL_CREATION_OPTIONS = {
    publicKey: {
        challenge: ETHOS_WALLET_BYTES,
        rp: {
            name: 'Ethos Wallet',
            icon: 'https://assets.suiet.app/Logo.png',
        },
        user: {
            name: 'Ethos Wallet',
            displayName: 'Ethos Wallet',
            id: ETHOS_WALLET_BYTES,
        },
        pubKeyCredParams: [
            { type: 'public-key', alg: -7 }, //ES256
            // { type: 'public-key', alg: -8 }, //Ed25519
            // { type: 'public-key', alg: -257 }, //RS256
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
        },
        timeout: 60000,
    },
} as any;

export function useBiometricAuth() {
    // TEMPORARY - SAVE THESE IN SLICE/LOCALLY
    const [credentialIdBase64, setCredentialIdBase64] = useState<string>();
    const [publicKeyBase64, setPublicKeyBase64] = useState<string>();

    const dispatch = useAppDispatch();

    const isSupported =
        navigator.credentials &&
        navigator.platform.toUpperCase().includes('MAC');

    const isBiometricsSetUp = useAppSelector(
        ({ account }) => account.isBiometricsSetUp
    );

    const setup = async () => {
        if (!isSupported) {
            // throw new Error('Biometric auth is not supported');
            return false;
        }

        const credential = await navigator.credentials
            .create(CREDENTIAL_CREATION_OPTIONS)
            .catch((e) => {
                console.error(e);
            });

        console.log('credential :>> ', credential);

        if (credential) {
            const { credentialIdBase64, publicKeyBase64 } =
                extractInfoFromCredential(credential);

            console.log('credentialIdBase64 :>> ', credentialIdBase64);
            console.log('publicKeyBase64 :>> ', publicKeyBase64);
            setCredentialIdBase64(credentialIdBase64);
            setPublicKeyBase64(publicKeyBase64);

            dispatch(setIsBiometricsSetUp(true));

            //   try {
            //     const ok = await apiClient.callFunc<any, boolean>(
            //       'auth.biometricAuthEnable',
            //       {
            //         credentialIdBase64,
            //         publicKeyBase64,
            //       }
            //     );

            //     if (ok) {
            //       dispatch(updateBiometricSetuped(true));
            //       message.success('Setup Touch ID successfully!');
            //       return true;
            //     } else {
            //       message.error('Setup Touch ID failed! Please try again.', {
            //         style: { width: '240px' },
            //       });
            //     }
            //   } catch (e) {}
            return false;
        }
    };

    const authenticate = async (signal?: AbortSignal) => {
        if (!isSupported) {
            // throw new Error('Biometric auth is not supported');
            return false;
        }

        if (!isBiometricsSetUp) {
            console.log('Biometric auth is not set up');

            // throw new Error('Biometric auth is not setuped');
            return false;
        }

        // let data: any;
        // try {
        //   data = await apiClient.callFunc<null, any>(
        //     'auth.biometricAuthGetData',
        //     null
        //   );
        // } catch (e) {
        //   if (/metadata/.test((e as any).message)) {
        //     console.error(e);
        //     throw new Error(
        //       'Database seems broken, please re-enter or re-install the extension'
        //     );
        //   }
        //   throw e;
        // }
        // const { credentialIdBase64 } = data;

        const challenge = JSON.stringify({
            message: 'Ethos Wallet',
            datetime: new Date().toISOString(),
            nonce: ~~(Math.random() * 2 ** 30),
        });
        const challengeBytes = new TextEncoder().encode(challenge);
        const assertion = await navigator.credentials
            .get({
                publicKey: {
                    challenge: challengeBytes,
                    allowCredentials: [
                        {
                            type: 'public-key',
                            id: bufferDecode(credentialIdBase64 || ''),
                        },
                    ],
                    userVerification: 'discouraged',
                    timeout: 2e4,
                },
                signal,
            })
            .catch((e) => {
                console.error(e);
            });

        console.log('assertion :>> ', assertion);

        if (assertion) {
            // @ts-expect-error response does exist on assertion
            const sig = assertion.response.signature;

            const publicKey = await importPublicKey(publicKeyBase64 || '');
            console.log('publicKey :>> ', publicKey);
            const isValid = await verifySignature(publicKey, sig, challenge);

            if (isValid) {
                console.log('The signature is valid.');
            } else {
                console.log('The signature is not valid.');
            }

            try {
                console.log('bufferEncode(sig) :>> ', bufferEncode(sig));
                // const ok = await apiClient.callFunc<any, boolean>(
                //   'auth.biometricAuthRotateAuthKey',
                //   {
                //     challengeBase64,
                //     signatureBase64: bufferEncode(sig),
                //   }
                // );

                // if (ok) {
                //   dispatch(updateAuthed(true));
                //   return true;
                // }
            } catch (e) {
                console.error(e);
            }

            //   if (await checkEnabled()) {
            //     dispatch(updateBiometricSetuped(true));
            //     message.error(
            //       'Touch ID authentication failed! Please retry or use password.',
            //       {
            //         style: { width: '270px' },
            //         // Longer duration for long error message
            //         autoClose: 6000,
            //       }
            //     );
            //   } else {
            //     dispatch(updateBiometricSetuped(false));
            //     dispatch(updateBiometricDismissed(false));
            //     message.error(
            //       'Touch ID authentication failed! We have disabled Touch ID for you. Please setup Touch ID again.',
            //       {
            //         style: { width: '270px' },
            //         // Longer duration for long error message
            //         autoClose: 6000,
            //       }
            //     );
            //   }
        }

        // return false;
    };

    return {
        isSupported,
        setup,
        authenticate,
    };
}

import { extractInfoFromCredential } from '../helpers/biometricAuth';

const ETHOS_WALLET_BYTES = Uint8Array.from('Ethos Wallet', (c) =>
    c.charCodeAt(0)
);

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
            { type: 'public-key', alg: -7 },
            // { type: 'public-key', alg: -35 },
            // { type: 'public-key', alg: -36 },
            // { type: 'public-key', alg: -257 },
            // { type: 'public-key', alg: -258 },
            // { type: 'public-key', alg: -259 },
            // { type: 'public-key', alg: -37 },
            // { type: 'public-key', alg: -38 },
            // { type: 'public-key', alg: -39 },
            // { type: 'public-key', alg: -8 },
        ],
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required',
        },
        timeout: 60000,
    },
} as any;

export function useBiometricAuth() {
    const isSupported =
        // currently only support mac, because design is not ready for other platforms,
        // and we use "Touch ID" as feature name
        navigator.credentials &&
        navigator.platform.toUpperCase().includes('MAC');

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

    return {
        isSupported,
        setup,
    };
}

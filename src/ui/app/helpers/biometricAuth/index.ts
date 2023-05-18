import { toB64 } from '@mysten/bcs';

export async function extractInfoFromCredential(
    credential: Credential,
    publicKeyData?: Uint8Array
) {
    if (
        credential.type === 'public-key' &&
        'rawId' in credential &&
        'response' in credential &&
        credential.response &&
        typeof credential.response === 'object'
    ) {
        const { rawId, response } = credential;

        const id = toB64(new Uint8Array(rawId as ArrayBuffer));

        let challenge: string | undefined;
        let publicKey: string | undefined;
        let signature: string | undefined;

        if ('clientDataJSON' in response && response.clientDataJSON) {
            const userData = JSON.parse(
                new TextDecoder().decode(response.clientDataJSON as ArrayBuffer)
            );
            challenge = userData.challenge;
        }

        if (
            'getPublicKey' in response &&
            response.getPublicKey &&
            typeof response.getPublicKey === 'function'
        ) {
            publicKey = toB64(new Uint8Array(response.getPublicKey()));
        }

        if ('signature' in response && response.signature) {
            signature = toB64(
                new Uint8Array(response.signature as ArrayBuffer)
            );
        }

        // Verifying the signature (why?) is a pain so we're just using the challenge
        // The password won't decrypt without the correct signature anyway
        // https://gist.github.com/philholden/50120652bfe0498958fd5926694ba354
        // if (challenge && publicKeyData && signature) {
        //     const signatureData = fromB64(signature);
        //     const challengeData = fromB64(challenge);

        //     console.log(
        //         'PUBLIC KEY',
        //         publicKeyData,
        //         'SIGNATURE',
        //         signature,
        //         signatureData,
        //         'CHALLENGE',
        //         challenge,
        //         challengeData
        //     );

        //     const cryptoKey = await window.crypto.subtle.importKey(
        //         'spki',
        //         publicKeyData,
        //         {
        //             name: 'ECDSA',
        //             namedCurve: 'P-256',
        //             hash: { name: 'SHA-256' },
        //         },
        //         false,
        //         ['verify']
        //     );

        //     const isValid = await window.crypto.subtle.verify(
        //         {
        //             name: 'ECDSA',
        //             hash: { name: 'SHA-256' },
        //         },
        //         cryptoKey,
        //         signatureData,
        //         challengeData
        //     );

        //     console.log('IS VALID', isValid);
        // }

        return {
            id,
            signature,
            publicKey,
            challenge,
        };
    }

    return {};
}

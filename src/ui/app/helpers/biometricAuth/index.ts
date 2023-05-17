import { toB64 } from '@mysten/bcs';

export function extractInfoFromCredential(credential: Credential) {
    if (
        credential.type === 'public-key' &&
        'rawId' in credential &&
        'response' in credential &&
        credential.response &&
        typeof credential.response === 'object'
    ) {
        const { rawId, response } = credential;

        let signature: string | undefined;
        let publicKey: string | undefined;
        let challenge: string | undefined;

        if ('clientDataJSON' in response && response.clientDataJSON) {
            const userData = JSON.parse(
                new TextDecoder().decode(response.clientDataJSON as ArrayBuffer)
            );
            challenge = userData.challenge;
        }

        if ('signature' in response && response.signature) {
            signature = toB64(
                new Uint8Array(response.signature as ArrayBuffer)
            );
        }
        console.log('SIGNATURE', signature);

        const id = toB64(new Uint8Array(rawId as ArrayBuffer));

        return {
            id,
            signature,
            publicKey,
            challenge,
        };
    }

    return {};
}

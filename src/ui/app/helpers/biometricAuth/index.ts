import { bufferEncode } from './buffer';

export function extractInfoFromCredential(credential: Credential) {
    if (
        credential.type === 'public-key' &&
        'rawId' in credential &&
        'response' in credential &&
        credential.response &&
        typeof credential.response === 'object'
    ) {
        const { rawId, response } = credential;

        let signature: ArrayBuffer | undefined;
        let publicKey: string | undefined;
        let challenge: string | undefined;

        if ('clientDataJSON' in response && response.clientDataJSON) {
            const userData = JSON.parse(
                new TextDecoder().decode(response.clientDataJSON as ArrayBuffer)
            );
            challenge = userData.challenge;
        }

        if ('signature' in response && response.signature) {
            signature = response.signature as ArrayBuffer;
        }

        return {
            id: bufferEncode(rawId as ArrayBuffer),
            signature,
            publicKey,
            challenge,
        };
    }

    return {};
}

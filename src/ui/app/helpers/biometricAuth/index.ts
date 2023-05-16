export function extractInfoFromCredential(credential: Credential) {
    if (
        credential.type === 'public-key' &&
        'response' in credential &&
        credential.response &&
        typeof credential.response === 'object'
    ) {
        const { id, response } = credential;

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
            id,
            signature,
            publicKey,
            challenge,
        };
    }

    return {};
}

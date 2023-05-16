export function extractInfoFromCredential(credential: Credential) {
    if (
        credential.type === 'public-key' &&
        'response' in credential &&
        credential.response &&
        typeof credential.response === 'object' &&
        'clientDataJSON' in credential.response &&
        credential.response.clientDataJSON
    ) {
        const { id, response } = credential;

        const userData = JSON.parse(
            new TextDecoder().decode(response.clientDataJSON as ArrayBuffer)
        );

        return {
            id,
            // publicKeyBase64,
            userData,
        };
    }

    return {};
}

const CLIENT_ID =
    '117215743679-qgqrb6n1lacao6ecrc9p1mh96ffroq56.apps.googleusercontent.com';

export enum OAuthType {
    Google,
    DevTest,
}

export function getOAuthUrl({
    type,
    nonce,
}: {
    type: OAuthType;
    nonce: string;
}) {
    switch (type) {
        case OAuthType.Google:
            return _google({ nonce });
        default:
            return _devTest({ nonce });
    }
}

function _getRedirectUrl(): string {
    const redirectUrl = chrome.identity.getRedirectURL('/ui.html');
    console.log('redirectUrl c=> ', redirectUrl);
    return redirectUrl;
}

function _google({ nonce }: { nonce: string }) {
    const searchParamsData = {
        client_id: CLIENT_ID,
        response_type: 'id_token',
        redirect_uri: _getRedirectUrl(),
        scope: 'openid',
        nonce: nonce,
    };

    const urlSearchParams = new URLSearchParams(searchParamsData);
    const basePath = `https://accounts.google.com/o/oauth2/v2/auth`;
    return `${basePath}?${urlSearchParams}`;
    // return `https://accounts.google.com/o/oauth2/v2/auth?client_id=$CLIENT_ID&response_type=id_token&redirect_uri=$REDIRECT_URL&scope=openid&nonce=$NONCE`;
}

function _devTest({ nonce }: { nonce: string }) {
    const params = new URLSearchParams({
        // When using the provided test client ID + redirect site, the redirect_uri needs to be provided in the state.
        state: new URLSearchParams({
            redirect_uri: _getRedirectUrl(),
        }).toString(),
        // Test Client ID for devnet / testnet:
        client_id:
            '25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com',
        redirect_uri: 'https://zklogin-dev-redirect.vercel.app/api/auth',
        response_type: 'id_token',
        scope: 'openid',
        // See below for details about generation of the nonce
        nonce: nonce,
    });

    const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    return loginURL;
}

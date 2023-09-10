const CLIENT_ID =
    '117215743679-hq8b07jk94fl8fpohlg8j2oo7h1i0a35.apps.googleusercontent.com';

// TODO: I'm 75% sure the redirect url is our "chrome extension url"
const REDIRECT_URL = 'chrome-extension://mcbigmjiafegjnnogedioegffbooigli';

export function getOAuthUrlGoogle({ nonce }: { nonce: string }) {
    const searchParamsData = {
        client_id: CLIENT_ID,
        response_type: 'id_token',
        redirect_uri: REDIRECT_URL,
        scope: 'openid',
        nonce: nonce,
    };

    const urlSearchParams = new URLSearchParams(searchParamsData);
    const basePath = `https://accounts.google.com/o/oauth2/v2/auth`;
    return `${basePath}?${urlSearchParams}`;
    // return `https://accounts.google.com/o/oauth2/v2/auth?client_id=$CLIENT_ID&response_type=id_token&redirect_uri=$REDIRECT_URL&scope=openid&nonce=$NONCE`;
}

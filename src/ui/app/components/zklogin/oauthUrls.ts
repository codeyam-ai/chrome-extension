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
}

function _devTest({ nonce }: { nonce: string }) {
    // https://docs.sui.io/build/zk_login#configure-a-developer-account-with-openid-provider
    const MYSTEN_DEV_USE_ONLY_CLIENT_ID =
        '25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com';
    const params = new URLSearchParams({
        // When using the provided test client ID + redirect site, the redirect_uri needs to be provided in the state.
        state: new URLSearchParams({
            redirect_uri: _getRedirectUrl(),
        }).toString(),
        client_id: MYSTEN_DEV_USE_ONLY_CLIENT_ID,
        redirect_uri: 'https://zklogin-dev-redirect.vercel.app/api/auth',
        response_type: 'id_token',
        scope: 'openid',
        // See below for details about generation of the nonce
        nonce: nonce,
    });

    const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    return loginURL;
}

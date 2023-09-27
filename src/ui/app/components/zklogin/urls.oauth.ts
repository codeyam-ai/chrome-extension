export enum OAuthType {
    Google,
    DevTest,
}

export function getOAuthUrl({
    type,
    nonce,
    getRedirectUrl = chrome.identity.getRedirectURL,
}: {
    type: OAuthType;
    nonce: string;
    getRedirectUrl?: (path?: string) => string;
}) {
    switch (type) {
        case OAuthType.Google:
            return _google({ nonce, getRedirectUrl });
        default:
            return _devTest({ nonce, getRedirectUrl });
    }
}

function _google({
    nonce,
    getRedirectUrl = chrome.identity.getRedirectURL,
}: {
    nonce: string;
    getRedirectUrl?: (path?: string) => string;
}) {
    const CLIENT_ID =
        '117215743679-qgqrb6n1lacao6ecrc9p1mh96ffroq56.apps.googleusercontent.com';

    const searchParamsData = {
        client_id: CLIENT_ID,
        response_type: 'id_token',
        redirect_uri: getRedirectUrl('/ui.html'),
        scope: 'openid profile email',
        nonce: nonce,
    };

    const urlSearchParams = new URLSearchParams(searchParamsData);
    const basePath = `https://accounts.google.com/o/oauth2/v2/auth`;
    return `${basePath}?${urlSearchParams}`;
}

/**
 * https://docs.sui.io/build/zk_login#configure-a-developer-account-with-openid-provider
 */
function _devTest({
    nonce,
    getRedirectUrl = chrome.identity.getRedirectURL,
}: {
    nonce: string;
    getRedirectUrl?: (path?: string) => string;
}) {
    const MYSTEN_DEV_USE_ONLY_CLIENT_ID =
        '25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com';
    const MYSTEN_DEV_REDIRECT_URL =
        'https://zklogin-dev-redirect.vercel.app/api/auth';

    const params = new URLSearchParams({
        state: new URLSearchParams({
            redirect_uri: getRedirectUrl('/ui.html'),
        }).toString(),
        client_id: MYSTEN_DEV_USE_ONLY_CLIENT_ID,
        redirect_uri: MYSTEN_DEV_REDIRECT_URL,
        response_type: 'id_token',
        scope: 'openid profile email',
        nonce: nonce,
    });

    const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    return loginURL;
}

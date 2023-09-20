import { OAuthType, getOAuthUrl } from './oauthUrls';

test('google oauth url construction', () => {
    // example URL:
    // `https://accounts.google.com/o/oauth2/v2/auth?client_id=$CLIENT_ID&response_type=id_token&redirect_uri=$REDIRECT_URL&scope=openid&nonce=$NONCE`;

    const expectedNonce = 'random-nonce';
    const actual = getOAuthUrl({
        type: OAuthType.Google,
        nonce: expectedNonce,
        getRedirectUrl: (path) => `http://fake.url/${path}`,
    });
    const url = new URL(actual);

    expect(url.protocol).toBe('https:');
    expect(url.host).toBe('accounts.google.com');
    expect(url.pathname).toBe('/o/oauth2/v2/auth');

    expect(url.searchParams.get('response_type')).toBe('id_token');
    expect(url.searchParams.get('scope')).toBe('openid');

    expect(url.searchParams.get('nonce')).toBe(expectedNonce);

    // expect(url.searchParams.get('client_id')).toBe('???');
    // expect(url.searchParams.get('redirect_url')).toBe('???');
});

export function extractJwtFromUrl(url: string): string | null {
    // `slice` removes the leading '#' which is required because the hash in not
    // URL decoded
    const hashParams = new URL(url).hash.slice(1);

    const params = new URLSearchParams(hashParams);
    const jwt = params.get('id_token');
    return jwt;
}

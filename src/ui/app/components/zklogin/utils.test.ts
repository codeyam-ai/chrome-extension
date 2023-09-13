import { extractJwtFromUrl } from './utils';

test('extractJwtFromUrl when the jwt is present in the hash', () => {
    const expectedJwt = 'a1A.b-_-2B.c3C';
    const url = `https://example.com/some/path#id_token=${expectedJwt}&authuser=0&prompt=none`;
    const actual = extractJwtFromUrl(url);

    expect(actual).toBe(expectedJwt);
});

test('extractJwtFromUrl when the jwt is not in the hash', () => {
    // no hash or search params
    expect(extractJwtFromUrl('https://example.com')).toBe(null);

    // no hash, search params
    expect(extractJwtFromUrl('https://example.com?id_token=a.b.c')).toBe(null);

    // hash with no id_token
    expect(extractJwtFromUrl('https://example.com#a=1&b=2')).toBe(null);
});

import { maybeGetValue } from './unknown';

test('maybeGetValue', () => {
    const a: unknown = { a: 1 };
    const b: unknown = null;
    const c: unknown = 'non-object';
    const d: unknown = undefined;
    expect(maybeGetValue<number>(a, 'a')).toBe(1);
    expect(maybeGetValue<number>(a, 'non-existant-key')).toBeUndefined();
    expect(maybeGetValue<number>(b, 'a')).toBeUndefined();
    expect(maybeGetValue<number>(c, 'a')).toBeUndefined();
    expect(maybeGetValue<number>(d, 'a')).toBeUndefined();
});

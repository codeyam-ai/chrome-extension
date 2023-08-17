/**
 * Attempt to get a key's from an unknown type.
 * If the type guards prevent it, return undefined
 */
export function maybeGetValue<ReturnType>(
    unk: unknown,
    key: string
): ReturnType | undefined {
    if (unk && typeof unk === 'object' && `${key}` in unk) {
        return (unk as Record<string, never>)[key];
    }
}

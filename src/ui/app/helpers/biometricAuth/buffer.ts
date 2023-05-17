export function bufferDecode(value: string) {
    return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}

export function bufferEncode(value: ArrayBuffer) {
    // @ts-expect-error Ignoring TypeScript error because Uint8Array is iterable and this will work at runtime
    return btoa(String.fromCharCode.apply(null, new Uint8Array(value)));
}

export function useBiometricAuth() {
    console.log('navigator :>> ', navigator);
    const isSupported =
        // currently only support mac, because design is not ready for other platforms,
        // and we use "Touch ID" as feature name
        navigator.credentials &&
        navigator.platform.toUpperCase().includes('MAC');

    return {
        isSupported,
    };
}

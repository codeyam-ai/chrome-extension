import { cleanup } from '@testing-library/react';

export const preventActWarning = function () {
    // this fixes the dreaded 'use act() in tests' warning.
    // context: https://github.com/testing-library/react-testing-library/issues/1051#issuecomment-1183303965
    // also perhaps a fix is underway here: https://github.com/testing-library/react-testing-library/pull/1137
    cleanup();
};

/**
 * Return any number of different objectIds, for usage in the mockchain.
 *
 * @param count The number of different objectIds you want.
 */
export function getObjectIds(count: number): string[] {
    if (count <= 0)
        throw new Error(`objectIds count less than 1 not supported: ${count}`);
    if (count >= 10)
        throw new Error(
            `objectIds count greater than 9 not supported: ${count}`
        );

    const objectIds = [];
    for (let i = 0; i < count; i++) {
        objectIds.push(
            `0x3c36fe1eca57222e087352959ab0edf83251fe0a5aa8a0ec87c4e3fa1714f36${i}`
        );
    }
    return objectIds;
}

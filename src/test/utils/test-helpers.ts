import { cleanup } from '@testing-library/react';

export const preventActWarning = function () {
    // this fixes the dreaded 'use act() in tests' warning.
    // context: https://github.com/testing-library/react-testing-library/issues/1051#issuecomment-1183303965
    // also perhaps a fix is underway here: https://github.com/testing-library/react-testing-library/pull/1137
    cleanup();
};

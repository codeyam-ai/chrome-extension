// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './configs/ts/tsconfig.common.json';

import type { Config } from '@jest/types';

const pathsMappings = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
});
const cssMappings = { '^.+\\.scss$': 'identity-obj-proxy' };
const esmMappings = {
    uuid: '<rootDir>/node_modules/uuid/dist/index.js',
};
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: { ...pathsMappings, ...cssMappings, ...esmMappings },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: ['./src/test-utils/setup-tests.ts'],
};

export default config;

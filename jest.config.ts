import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './configs/ts/tsconfig.common.json';

import type { Config } from '@jest/types';

const pathsMappings = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
});
const cssMappings = {
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
        'jest-transform-stub',
};
const esmMappings = {
    uuid: '<rootDir>/node_modules/uuid/dist/index.js',
};

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: { ...cssMappings },
    moduleNameMapper: { ...pathsMappings, ...cssMappings, ...esmMappings },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    setupFilesAfterEnv: [
        './src/test/utils/setup-tests.ts',
        './src/background/index.ts',
    ],
};

export default config;

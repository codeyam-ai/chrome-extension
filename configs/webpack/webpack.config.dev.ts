// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { merge } from 'webpack-merge';

import configCommon from './webpack.config.common';

import type { Configuration } from 'webpack';

const configDev: Configuration = {
    entry: {
        ui: ['react-devtools'],
    },
    mode: 'development',
    devtool: 'cheap-source-map',
    plugins: [],
    watchOptions: {
        aggregateTimeout: 600,
    },
    stats: {
        loggingDebug: ['sass-loader'],
    },
};

async function getConfig() {
    return merge(configDev, await configCommon());
}

export default getConfig;

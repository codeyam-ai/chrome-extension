// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import ESLintPlugin from 'eslint-webpack-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import { merge } from 'webpack-merge';

import configCommon from './webpack.config.common';

import type { Configuration } from 'webpack';
import util from 'util';

const configDev: Configuration = {
    entry: {
        ui: ['react-devtools'],
    },
    mode: 'development',
    devtool: 'cheap-source-map',
    plugins: [
        new ESLintPlugin({ extensions: ['ts', 'tsx', 'js', 'jsx'] }),
        new StyleLintPlugin(),
    ],
    watchOptions: {
        aggregateTimeout: 600,
    },
    stats: {
        loggingDebug: ['sass-loader'],
    },
};

async function getConfig() {
    const merged = merge(configDev, await configCommon());
    console.log(
        util.inspect(merged.entry, {
            showHidden: false,
            depth: null,
            colors: true,
        })
    );
    return merged;
}

export default getConfig;

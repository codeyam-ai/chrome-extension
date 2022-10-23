// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { GrowthBook } from '@growthbook/growthbook';

import type { JSONValue } from '@growthbook/growthbook';

const GROWTHBOOK_API_KEY = 'prod_rT9proBe3naVQHm9JbRb4LpE2Z8t5zK3IoLNo0dXEU';
export default class FeatureGating {
    #growthBook: GrowthBook;

    constructor() {
        // Create a GrowthBook context
        this.#growthBook = new GrowthBook();
        this.init();
    }

    public async init() {
        await fetch(
            `https://cdn.growthbook.io/api/features/${GROWTHBOOK_API_KEY}`
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.statusText);
            })
            .then((parsed) => {
                this.#growthBook.setFeatures(parsed.features);
            })
            .catch(() => {
                // eslint-disable-next-line no-console
                console.warn(
                    `Failed to fetch feature definitions from GrowthBook with API_KEY ${process.env.GROWTH_BOOK_API_KEY}`
                );
            });
    }

    public isOn(featureName: string): boolean {
        return this.#growthBook.isOn(featureName);
    }

    public getFeatureValue<T extends JSONValue>(
        featureName: string,
        defaultValue: T
    ) {
        return this.#growthBook.getFeatureValue(featureName, defaultValue);
    }
}

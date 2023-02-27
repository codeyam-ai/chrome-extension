// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { GrowthBook } from '@growthbook/growthbook';

import { setAttributes } from '_src/shared/experimentation/features';

const GROWTHBOOK_API_KEY = process.env.GROWTHBOOK_API_KEY;

class FeatureGating {
    #growthBook = new GrowthBook();
    #ready = this.loadFeatures();

    async getGrowthBook() {
        await this.#ready;
        return this.#growthBook;
    }

    async getLoadedFeatures() {
        return (await this.getGrowthBook()).getFeatures();
    }

    private async loadFeatures() {
        setAttributes(this.#growthBook);
        try {
            const res = await fetch(
                `https://cdn.growthbook.io/api/features/${GROWTHBOOK_API_KEY}`
            );
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            this.#growthBook.setFeatures(data.features);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(
                'Failed to fetch feature definitions from Growthbook',
                e
            );
        }
    }
}

const featureGating = new FeatureGating();

export default featureGating;

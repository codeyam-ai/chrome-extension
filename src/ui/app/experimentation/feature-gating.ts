// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { GrowthBook } from '@growthbook/growthbook-react';

export const growthbook = new GrowthBook();

export async function loadFeatures() {
    try {
        const res = await fetch(
            `https://cdn.growthbook.io/api/features/${process.env.GROWTHBOOK_API_KEY}`
        );

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const data = await res.json();

        growthbook.setFeatures(data.features);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('Failed to fetch feature definitions from Growthbook', e);
    }
}

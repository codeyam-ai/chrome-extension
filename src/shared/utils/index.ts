// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import Browser from 'webextension-polyfill';

export function openInNewTab(page = 'ui.html') {
    const url = Browser.runtime.getURL(page);
    return Browser.tabs.create({ url });
}

export function isValidUrl(url: string | null) {
    if (!url) {
        return false;
    }
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

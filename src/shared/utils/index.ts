import Browser from 'webextension-polyfill';

/**
 * Opens a new tab with the specified page
 * @param {string} [page='ui.html'] - The page to open in the new tab
 * @returns {Promise<Browser.tabs.Tab>} - A promise that resolves with the created tab object
 */
export const openInNewTab = (page = 'ui.html'): Promise<Browser.Tabs.Tab> => {
    const url = Browser.runtime.getURL(page);
    return Browser.tabs.create({ url });
};

/**
 * Validates a URL string
 * @param {string | null} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidUrl = (url: string | null): boolean => {
    if (!url) {
        return false;
    }
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

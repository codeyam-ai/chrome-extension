// Import dependencies
import Browser from 'webextension-polyfill';

import * as utils from '../index';

describe('Utils', () => {
    beforeAll(() => {
        Object.defineProperty(Browser, 'runtime', {
            value: { getURL: jest.fn() },
        });

        Object.defineProperty(Browser, 'tabs', {
            value: { create: jest.fn() },
        });
    });

    // Reset all mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('openInNewTab', () => {
        it('opens a url in a new tab', async () => {
            // Preparation for the Test
            const url = 'test.html';
            const fullUrl = `chrome://extension/${url}`;
            (Browser.runtime.getURL as jest.Mock).mockReturnValue(fullUrl);

            // Execute the Test
            await utils.openInNewTab(url);

            // Assert
            expect(Browser.runtime.getURL).toHaveBeenCalledWith(url);
            expect(Browser.tabs.create).toHaveBeenCalledWith({ url: fullUrl });
        });
    });

    describe('isValidUrl', () => {
        it('returns true when URL is valid', () => {
            // Execute the Test
            const result = utils.isValidUrl('https://validurl.com');

            // Assert
            expect(result).toBe(true);
        });

        it('returns false when URL is invalid', () => {
            // Execute the Test
            const result = utils.isValidUrl('invalidurl');

            // Assert
            expect(result).toBe(false);
        });

        it('returns false when URL is null', () => {
            // Execute the Test
            const result = utils.isValidUrl(null);

            // Assert
            expect(result).toBe(false);
        });
    });
});

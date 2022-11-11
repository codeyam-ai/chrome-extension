import { screen } from '@testing-library/react';
import * as React from 'react';

import App from '_app/index';
import { renderWithProviders } from '_src/test/utils/react-rendering';

test('renders the getting started page', async () => {
    // TODO: saner way to mock out the encrypted stuff in local storage? these magic keys are gross
    const firstKey = 'e654995be44ee4b1de934ba23bdd';
    const firstResponse: Record<string, unknown> = { firstKey: null };
    mockBrowser.storage.local.get.expect(firstKey).andResolve(firstResponse);

    const secondKey = 'f7409e40f148e2b9ce97';
    const secondResponse: Record<string, unknown> = { secondKey: null };
    mockBrowser.storage.local.get.expect(secondKey).andResolve(secondResponse);

    renderWithProviders(<App />);
    await screen.findByText('The new web awaits');
});

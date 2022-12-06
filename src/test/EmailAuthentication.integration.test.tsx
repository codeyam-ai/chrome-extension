import { act, cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import App from '_app/index';
import { renderWithProviders } from '_src/test/utils/react-rendering';
import { preventActWarning } from '_src/test/utils/test-helpers';

describe('Email Authentication', () => {
    test('User can enter email and is prompted to wait for the magic login link', async () => {
        renderWithProviders(<App />);
        await screen.findByText('The new web awaits');
        await userEvent.click(screen.getByText('Sign in with Email'));
        await userEvent.type(
            screen.getByRole('textbox', { name: 'Email address' }),
            'sbf@federalprison.gov'
        );
        await userEvent.click(screen.getByRole('button'));

        // simulate the iframe sending a message back to the extension that the magic email link has been sent
        window.dispatchEvent(
            new MessageEvent('message', {
                source: window,
                origin: 'http://localhost:3000',
                data: { action: 'login' },
            })
        );

        await screen.findByText('Email sent');
    });

    test('User can see tokens page after logged in via the iframe', async () => {
        renderWithProviders(<App />, {
            initialRoute: '/initialize/hosted?log-in=true',
        });
        expect(await screen.findByText(/The new web awaits/i)).not.toBeNull();
        preventActWarning();
    });
});

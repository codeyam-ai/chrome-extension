import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import * as React from 'react';

import mockSuiObjects from './utils/mockchain';
import App from '_app/index';
import { BASE_URL } from '_src/shared/constants';
import { renderWithProviders } from '_src/test/utils/react-rendering';

describe('Email Authentication', () => {
    test('User can enter email and is prompted to wait for the magic login link', async () => {
        const fakeAccessToken = '12345';
        mockSuiObjects();
        nock(BASE_URL, {
            reqheaders: { 'x-supabase-access-token': fakeAccessToken },
        })
            .persist()
            .post('/api/wallet/accounts')
            .reply(200, {
                accounts: [
                    {
                        address: '0x218d1ea2ce30efd16394f81569f69cf8531d05ea',
                        index: 0,
                    },
                ],
            });

        renderWithProviders(<App />);
        await screen.findByText('The new web awaits');
        await userEvent.click(screen.getByText('Sign in with Email'));
        await userEvent.type(
            screen.getByRole('textbox', { name: 'Email address' }),
            'sam@example.com'
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

        // TODO(mike/tommy): remove this code when this page is no longer responsible for both submitting the email
        // and receiving the access code.
        simulateIframeSendingAccessCode('12345');
        await screen.findByText('Get started with Sui');
    });

    test('User can see tokens page after logged in via the iframe', async () => {
        const fakeAccessToken = '12345';
        mockSuiObjects();
        nock(BASE_URL, {
            reqheaders: { 'x-supabase-access-token': fakeAccessToken },
        })
            .post('/api/wallet/accounts')
            .reply(200, {
                accounts: [
                    {
                        address: '0x218d1ea2ce30efd16394f81569f69cf8531d05ea',
                        index: 0,
                    },
                ],
            });

        renderWithProviders(<App />, {
            initialRoute: '/initialize/hosted?log-in=true',
        });

        await screen.findByText(/The new web awaits/i);

        simulateIframeSendingAccessCode(fakeAccessToken);
        await screen.findByText('Get started with Sui');
    });

    function simulateIframeSendingAccessCode(fakeAccessToken: string) {
        window.dispatchEvent(
            new MessageEvent('message', {
                source: window,
                origin: 'http://localhost:3000',
                data: {
                    action: 'sendKey',
                    data: {
                        key: `{"currentSession": {"access_token": "${fakeAccessToken}"}}`,
                    },
                },
            })
        );
    }
});

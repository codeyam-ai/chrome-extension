import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '_app/index';
import { password as correctPassword, simulateAuthenticatedUser, simulateLogout } from '_src/test/utils/fake-local-storage';
import mockSuiObjects from '_src/test/utils/mockchain';
import { renderWithProviders } from '_src/test/utils/react-rendering';

describe('Unlocking the wallet', () => {
    beforeEach(async () => {
        await createLockedWallet()
    });

    test('Entering an incorrect password will display error message', async () => {
        await userEvent.type(
            screen.getByTestId('password'),
            'an incorrect password'
        )
        await userEvent.click(screen.getByTestId('submit'))
        await screen.findByText('Password is incorrect')
    });

    test('Entering a correct password will log the user in', async () => {
        await userEvent.type(
            screen.getByTestId('password'),
            correctPassword
        )
        await userEvent.click(screen.getByTestId('submit'))
        await screen.findByText('Wallet Balance')
    });
});

const createLockedWallet = async () => {
    await simulateAuthenticatedUser();
    await simulateLogout();
    mockSuiObjects();
    renderWithProviders(<App />);
    await screen.findAllByText('Unlock Wallet');
}

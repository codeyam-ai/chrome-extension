import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { simulateMnemonicUser } from '_src/test/utils/fake-local-storage';
import { Mockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';

describe('Minting an NFT', () => {
    let mockchain: Mockchain;
    beforeEach(async () => {
        mockchain = new Mockchain();
        simulateMnemonicUser();
        mockchain.mockCommonCalls();
    });

    test('can mint an NFT', async () => {
        mockchain.mockSuiObjects({
            suiBalance: 500000,
        });
        renderApp();
        const nftsButton = await screen.findByTitle('NFTs');
        await userEvent.click(nftsButton);
        await screen.findByText('No NFTs here yet');
        const mintButton = await screen.findByText('Mint an NFT');
        await userEvent.click(mintButton);
        expect(mintButton.getAttribute('href')).toMatch('/dashboard/experiment')
    });
});

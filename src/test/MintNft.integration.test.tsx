import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockCommonCalls, mockSuiObjects } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';

describe('Minting an NFT', () => {
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        simulateMnemonicUser();
        mockCommonCalls(mockJsonRpc);
    });

    test('can mint an NFT', async () => {
        mockSuiObjects(mockJsonRpc, {
            suiBalance: 500000,
        });
        renderApp();
        const nftsButton = await screen.findByTitle('NFTs');
        await userEvent.click(nftsButton);
        await screen.findByText('No NFTs here yet');
        const mintButton = await screen.findByText('Mint an NFT');
        await userEvent.click(mintButton);
        expect(mintButton.getAttribute('href')).toMatch(
            '/dashboard/collectibles'
        );
    });
});

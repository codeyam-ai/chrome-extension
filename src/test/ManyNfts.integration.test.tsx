import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockJsonRpc } from '_src/test/utils/mock-json-rpc';
import { mockBlockchain } from '_src/test/utils/mockchain';
import { renderApp } from '_src/test/utils/react-rendering';
import { simulateMnemonicUser } from '_src/test/utils/storage';

describe('Minting an NFT', () => {
    let mockJsonRpc: MockJsonRpc;
    beforeEach(async () => {
        mockJsonRpc = new MockJsonRpc();
        simulateMnemonicUser();
    });

    test('can view multiple NFTs', async () => {
        mockBlockchain(mockJsonRpc, {
            logObjects: true,
            nftDetails: {
                name: 'nft',
                count: 5,
            },
        });

        renderApp();

        const nftsButton = await screen.findByTitle('NFTs');
        await userEvent.click(nftsButton);
        await screen.findByText('My Collectibles');
        // the mockchain will make nfts with names like `nft`, `nft1`, etc
        // the alt-text uses the name and fallsback to "NFT", hence the `i`
        // to ignore case.
        const nfts = await screen.findAllByAltText(/nft/i);
        expect(nfts.length).toBe(5);
    });
});

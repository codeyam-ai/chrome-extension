// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { RawSigner, SuiExecuteTransactionResponse } from '@mysten/sui.js';

// TODO: Remove this after internal dogfooding
export class ExampleNFT {
    /**
     * Mint a Example NFT. The wallet address must own enough gas tokens to pay for the transaction.
     *
     * @param signer A signer with connection to the fullnode
     */
    public static async mintExampleNFTWithFullnode(
        signer: RawSigner,
        name?: string,
        description?: string,
        imageUrl?: string
    ): Promise<SuiExecuteTransactionResponse> {
        return await signer.executeMoveCall({
            packageObjectId: '0x2',
            module: 'devnet_nft',
            function: 'mint',
            typeArguments: [],
            arguments: [
                name || 'Example NFT',
                description || 'An NFT created by Sui Wallet',
                imageUrl ||
                    'ipfs://bafkreibngqhl3gaa7daob4i2vccziay2jjlp435cf66vhono7nrvww53ty',
            ],
            gasBudget: 10000,
        });
    }

    public static async TransferNFTWithFullnode(
        signer: RawSigner,
        nftId: string,
        recipientID: string,
        transferCost: number
    ): Promise<SuiExecuteTransactionResponse> {
        return await signer.transferObject({
            objectId: nftId,
            gasBudget: transferCost,
            recipient: recipientID,
        });
    }
}

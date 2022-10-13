// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Base64DataBuffer, Ed25519Keypair } from '@mysten/sui.js';

import {
    generateMnemonicsAndKeypair,
    getKeypairFromMnemonics,
    normalizeMnemonics,
} from './mnemonics';

describe('mnemonics', () => {
    it('generate mnemonics', () => {
        const [mnemonics, keypair] = generateMnemonicsAndKeypair();
        expect(mnemonics.split(' ').length).toBe(12);
        const parsedKeypair = getKeypairFromMnemonics(mnemonics, -1);
        expect(parsedKeypair.publicKey).toEqual(keypair.publicKey);
        expect(parsedKeypair.secretKey).toEqual(keypair.secretKey);
    });

    it('normalize', () => {
        expect(normalizeMnemonics(' Almost a Seed    Phrase')).toEqual(
            'almost a seed phrase'
        );
    });

    it('parse mnemonics', () => {
        const keypairData = getKeypairFromMnemonics(
            'Shoot island position soft burden budget tooth cruel issue economy destroy Above'
        );

        const keypair = new Ed25519Keypair(keypairData);

        expect(new Base64DataBuffer(keypairData.secretKey).toString()).toEqual(
            'NsmVpqDHahFNSPNs+w/PqwNuhBrCGL8He5v1q+nQnRkvN+Qdrhzog983149pQTOOfKQKnWEBUnPNDnqzwpwsGA=='
        );
        expect(keypair.getPublicKey().toBase64()).toEqual(
            'LzfkHa4c6IPfN9ePaUEzjnykCp1hAVJzzQ56s8KcLBg='
        );
    });
});

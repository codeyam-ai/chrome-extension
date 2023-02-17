// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Ed25519Keypair, toB64 } from '@mysten/sui.js';

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

        expect(toB64(keypairData.secretKey)).toEqual(
            'uYSGvJ/dr9US/nRRyChSQ0tBsMemg+Az8WVypeS32lMzEeahmtwcBqUJ5b9GTp1OzHMDnzEayUC7EYlvgvtlMw=='
        );
        expect(keypair.getPublicKey().toBase64()).toEqual(
            'MxHmoZrcHAalCeW/Rk6dTsxzA58xGslAuxGJb4L7ZTM='
        );
    });
});

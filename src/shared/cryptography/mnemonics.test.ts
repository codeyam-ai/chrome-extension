// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    generateMnemonicsAndKeypair,
    getKeypairFromMnemonics,
    normalizeMnemonics,
} from './mnemonics';

describe('mnemonics', () => {
    it.skip('generate mnemonics', () => {
        const [mnemonics, keypair] = generateMnemonicsAndKeypair();
        expect(mnemonics.split(' ').length).toBe(12);
        const parsedKeypair = getKeypairFromMnemonics(mnemonics, -1);

        const pubKey = keypair.getPublicKey();
        const privKey = keypair.export().privateKey;
        const parsedPubKey = parsedKeypair.getPublicKey();
        const parsedPrivKey = parsedKeypair.export().privateKey;
        expect(pubKey).toEqual(parsedPubKey);
        expect(privKey).toEqual(parsedPrivKey);
    });

    it('normalize', () => {
        expect(normalizeMnemonics(' Almost a Seed    Phrase')).toEqual(
            'almost a seed phrase'
        );
    });

    it.skip('parse mnemonics', () => {
        const keypair = getKeypairFromMnemonics(
            'Shoot island position soft burden budget tooth cruel issue economy destroy Above'
        );

        // const keypair = new Ed25519Keypair(keypairData);

        // const privKey = keypair.export().privateKey;

        // expect(toB64(privKey)).toEqual(
        //     'uYSGvJ/dr9US/nRRyChSQ0tBsMemg+Az8WVypeS32lMzEeahmtwcBqUJ5b9GTp1OzHMDnzEayUC7EYlvgvtlMw=='
        // );
        expect(keypair.getPublicKey().toBase64()).toEqual(
            'MxHmoZrcHAalCeW/Rk6dTsxzA58xGslAuxGJb4L7ZTM='
        );
    });
});

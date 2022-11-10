// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import bip39 from 'bip39-light';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';

import type { Ed25519KeypairData } from '@mysten/sui.js';

/**
 * Generate a 12-word random mnemonic and keypair using crypto.randomBytes
 * under the hood, defaults to 128-bits of entropy.
 * @returns a tuple of mnemonic and keypair. The mnemonics is a 12-word string
 * split by spaces.
 */
export function generateMnemonicsAndKeypair(): [string, Ed25519KeypairData] {
    const mnemonics = bip39.generateMnemonic();
    return [mnemonics, getKeypairFromMnemonics(mnemonics, -1)];
}

export function generateMnemonic(): string {
    return bip39.generateMnemonic();
}

/**
 * Derive public key and private key from the Mnemonics
 * @param mnemonics a 12-word seed phrase
 * @returns public key and private key
 */
export function getKeypairFromMnemonics(
    mnemonics: string,
    index = 0
): Ed25519KeypairData {
    const seed = getSeedFromMnemonics(mnemonics, index);
    const keypair = nacl.sign.keyPair.fromSeed(seed);

    return keypair;
}

export function getSeedFromMnemonics(mnemonics: string, index = 0): Uint8Array {
    let seed = bip39.mnemonicToSeed(normalizeMnemonics(mnemonics));

    if (index > -1) {
        const path = `m/44'/784'/0'/0'/${index}'`;
        const seedBuffer = Buffer.from(seed).toString('hex');
        seed = derivePath(path, seedBuffer).key;
    }

    return new Uint8Array(seed.toJSON().data.slice(0, 32));
}

/**
 * Sanitize the mnemonics string provided by user
 * @param mnemonics a 12-word string split by spaces that may contain mixed cases
 * and extra spaces
 * @returns a sanitized mnemonics string
 */
export function normalizeMnemonics(mnemonics: string): string {
    return mnemonics
        .trim()
        .split(/\s+/)
        .map((part) => part.toLowerCase())
        .join(' ');
}

export const validateMnemonics = bip39.validateMnemonic;
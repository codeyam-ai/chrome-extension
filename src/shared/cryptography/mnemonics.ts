// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Ed25519Keypair } from '@mysten/sui.js';
import bip39 from 'bip39-light';

/**
 * Generate a 12-word random mnemonic and keypair using crypto.randomBytes
 * under the hood, defaults to 128-bits of entropy.
 * @returns a tuple of mnemonic and keypair. The mnemonics is a 12-word string
 * split by spaces.
 */
export function generateMnemonicsAndKeypair(): [string, Ed25519Keypair] {
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
): Ed25519Keypair {
    const derivationPath = makeDerivationPath(index);
    const keypair = Ed25519Keypair.deriveKeypair(mnemonics, derivationPath);
    return keypair;
}

export function makeDerivationPath(index: number): string {
    return `m/44'/784'/${index}'/0'/0'`;
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

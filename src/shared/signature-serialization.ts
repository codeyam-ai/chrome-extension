// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import type { SignaturePubkeyPair, SignatureScheme } from '@mysten/sui.js';

export interface SerializedSignaturePubkeyPair {
    signatureScheme: string;
    signature: string;
    pubKey: string;
}

export function serializeSignaturePubkeyPair(
    signature: SignaturePubkeyPair
): SerializedSignaturePubkeyPair {
    return {
        signatureScheme: signature.signatureScheme,
        signature: signature.signature.toString(),
        pubKey: signature.pubKey.toBase64(),
    };
}

export type EthosSignaturePubkeyPair = {
    signatureScheme: SignatureScheme;
    signature: string;
    pubKey: string;
};

export function deserializeSignaturePubkeyPair(
    signature: SerializedSignaturePubkeyPair
): EthosSignaturePubkeyPair {
    return {
        signatureScheme: signature.signatureScheme as SignatureScheme,
        signature: signature.signature,
        pubKey: signature.pubKey,
    };
}

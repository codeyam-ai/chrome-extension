// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Ed25519PublicKey } from '@mysten/sui.js';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';

import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { SerializedLedgerAccount } from '_src/shared/cryptography/LedgerAccount';

type UseDeriveLedgerAccountOptions = {
    numAccountsToDerive: number;
} & Pick<
    UseQueryOptions<SerializedLedgerAccount[], unknown>,
    'select' | 'onSuccess' | 'onError'
>;

export function useDeriveLedgerAccounts(
    options: UseDeriveLedgerAccountOptions
) {
    const { numAccountsToDerive, ...useQueryOptions } = options;
    const { suiLedgerClient } = useSuiLedgerClient();

    return useQuery(
        ['derive-ledger-accounts'],
        () => {
            if (!suiLedgerClient) {
                throw new Error(
                    "The Sui application isn't open on a connected Ledger device"
                );
            }
            return deriveAccountsFromLedger(
                suiLedgerClient,
                numAccountsToDerive
            );
        },
        {
            ...useQueryOptions,
            // NOTE: Unfortunately for security purposes, there's no way to uniquely identify a
            // Ledger device without making a request to the Sui application and returning some
            // unique identifier (or a public key which should guarantee uniqueness). Since we
            // can't provide a unique query key, we'll disable caching entirely.
            cacheTime: 0,
        }
    );
}

async function deriveAccountsFromLedger(
    suiLedgerClient: SuiLedgerClient,
    numAccountsToDerive: number
) {
    const ledgerAccounts: SerializedLedgerAccount[] = [];
    const derivationPaths = getDerivationPathsForLedger(numAccountsToDerive);

    for (let index = 0; index < derivationPaths.length; ++index) {
        const derivationPath = derivationPaths[index];
        const publicKeyResult = await suiLedgerClient.getPublicKey(
            derivationPath
        );
        console.log('derivationPath', derivationPath, publicKeyResult);

        const publicKey = new Ed25519PublicKey(publicKeyResult.publicKey);
        const suiAddress = publicKey.toSuiAddress();
        ledgerAccounts.push({
            address: suiAddress,
            derivationPath,
            index,
        });
    }

    return ledgerAccounts;
}

function getDerivationPathsForLedger(numDerivations: number) {
    return Array.from({
        length: numDerivations,
    }).map((_, index) => derivationPathForLedger(index));
}

export function derivationPathForLedger(index: number) {
    return `m/44'/784'/${index}'/0'/0'`;
}

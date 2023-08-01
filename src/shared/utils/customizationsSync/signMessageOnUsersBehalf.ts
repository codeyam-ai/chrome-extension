import {
    fromB64,
    type RawSigner,
    type SignedMessage,
    type SuiTransactionBlockResponse,
} from '@mysten/sui.js';

import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';

const signMessageOnUsersBehalf = async (
    signer: LedgerSigner | EthosSigner | RawSigner | null,
    message: string
) => {
    let txResult: SuiTransactionBlockResponse | SignedMessage | undefined =
        undefined;
    let txResultError: string | undefined;

    if (!signer) {
        throw new Error(`Signer not found`);
    }

    try {
        txResult = await signer.signMessage({
            message: fromB64(message),
        });
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        txResultError = (e as Error).message;
    }

    return txResult;
};

export default signMessageOnUsersBehalf;

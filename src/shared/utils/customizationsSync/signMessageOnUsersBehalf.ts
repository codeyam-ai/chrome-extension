import { fromB64 } from '@mysten/sui.js/utils';

import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import type { SignedMessage, WalletSigner } from '_src/shared/cryptography/WalletSigner';

const signMessageOnUsersBehalf = async (
    signer: WalletSigner | null,
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

import {
    fromB64,
    type SignedMessage,
    type SuiTransactionBlockResponse,
} from '@mysten/sui.js';

import { getSigner } from '_src/ui/app/helpers/getSigner';

import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

const signMessageOnUsersBehalf = async (
    connectToLedger: () => Promise<SuiLedgerClient>,
    message: string,
    passphrase: string | null,
    authentication: string | null,
    address: string | null,
    accountInfos: AccountInfo[],
    activeAccountIndex: number
) => {
    let txResult: SuiTransactionBlockResponse | SignedMessage | undefined =
        undefined;
    let txResultError: string | undefined;

    console.log('address :>> ', address);
    console.log('activeAccountIndex :>> ', activeAccountIndex);
    console.log('accountInfos :>> ', accountInfos);

    const signer = await getSigner(
        passphrase,
        accountInfos,
        address,
        authentication,
        activeAccountIndex,
        connectToLedger
    );

    if (!signer) {
        throw new Error(`Signer not found`);
    }

    try {
        txResult = await signer.signMessage({
            message: fromB64(message),
        });
    } catch (e) {
        txResultError = (e as Error).message;
    }

    return txResult;
};

export default signMessageOnUsersBehalf;

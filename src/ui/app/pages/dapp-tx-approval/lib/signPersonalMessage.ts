import { fromB64 } from '@mysten/sui.js/utils';

import { thunkExtras } from '_redux/store/thunk-extras';
import { getSigner } from '_src/ui/app/helpers/getSigner';

import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { SuiTransactionBlockResponse } from '@mysten/sui.js/client';
import type { SuiSignMessageOutput, SuiSignPersonalMessageOutput } from '@mysten/wallet-standard';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

const signPersonalMessage = async (
    connectToLedger: () => Promise<SuiLedgerClient>,
    message: string,
    txID: string | undefined,
    approved: boolean,
    passphrase: string | null,
    authentication: string | null,
    address: string | null,
    accountInfos: AccountInfo[],
    activeAccountIndex: number
) => {
    if (!txID) {
        throw new Error(`ApprovalRequest ${txID} not found`);
    }

    let txResult: SuiTransactionBlockResponse | SuiSignMessageOutput | undefined =
        undefined;
    let txResultError: string | undefined;

    if (approved) {
        const signer = await getSigner(
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex,
            connectToLedger
        );

        if (!signer) {
            throw new Error(`Signer not found for ${txID}`);
        }

        try {
            txResult = await signer.signMessage({
                message: fromB64(message),
            });
        } catch (e) {
            txResultError = (e as Error).message;
        }
    }

    thunkExtras.background.sendTransactionRequestResponse(
        txID,
        approved,
        txResult ? { bytes: txResult.messageBytes, signature: txResult.signature } : undefined,
        txResultError
    );
};

export default signPersonalMessage;

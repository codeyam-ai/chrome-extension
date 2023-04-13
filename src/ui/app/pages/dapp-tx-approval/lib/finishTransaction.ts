import { thunkExtras } from '_redux/store/thunk-extras';

import type {
    SignedTransaction,
    SuiTransactionBlockResponse,
    TransactionBlock,
} from '@mysten/sui.js';
import type { SuiSignAndExecuteTransactionBlockInput } from '@mysten/wallet-standard';

const finishTransaction = async (
    transactionBlock: TransactionBlock | null,
    txID: string | undefined,
    approved: boolean,
    authentication: string | null,
    address: string | null,
    activeAccountIndex: number,
    justSign?: boolean,
    options?: SuiSignAndExecuteTransactionBlockInput['options'],
    requestType?: SuiSignAndExecuteTransactionBlockInput['requestType']
) => {
    if (!transactionBlock) {
        // TODO: delete? doesn't seem like we got have gotten this far without txRequest
        throw new Error(`Transaction ${txID} not found`);
    }

    let txSigned: SignedTransaction | undefined = undefined;
    let txResult: SuiTransactionBlockResponse | undefined = undefined;
    let txResultError: string | undefined;
    if (approved) {
        let signer;
        if (authentication) {
            signer = thunkExtras.api.getEthosSignerInstance(
                address || '',
                authentication
            );
        } else {
            signer = thunkExtras.api.getSignerInstance(
                thunkExtras.keypairVault.getKeyPair(activeAccountIndex)
            );
        }

        try {
            if (justSign) {
                // Just a signing request, do not submit
                txSigned = await signer.signTransactionBlock({
                    transactionBlock,
                });
            } else {
                txResult = await signer.signAndExecuteTransactionBlock({
                    transactionBlock,
                    options: options,
                    requestType: requestType,
                });
            }
        } catch (e) {
            txResultError = (e as Error).message;
        }
    }

    thunkExtras.background.sendTransactionRequestResponse(
        // TODO: find a way to ensure txID can't be null. none of this page would work if it was!
        txID || '',
        approved,
        txResult,
        txResultError,
        txSigned
    );
};

export default finishTransaction;

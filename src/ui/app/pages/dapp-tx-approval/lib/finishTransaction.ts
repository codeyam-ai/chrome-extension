import { thunkExtras } from '_redux/store/thunk-extras';

import type {
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
    options?: SuiSignAndExecuteTransactionBlockInput['options'],
    requestType?: SuiSignAndExecuteTransactionBlockInput['requestType']
) => {
    if (!transactionBlock) {
        // TODO: delete? doesn't seem like we got have gotten this far without txRequest
        throw new Error(`Transaction ${txID} not found`);
    }

    let txResult: SuiTransactionBlockResponse | undefined = undefined;
    let tsResultError: string | undefined;
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
            txResult = await signer.signAndExecuteTransactionBlock({
                transactionBlock,
                options,
                requestType,
            });
        } catch (e) {
            tsResultError = (e as Error).message;
        }
    }

    thunkExtras.background.sendTransactionRequestResponse(
        // TODO: find a way to ensure txID can't be null. none of this page would work if it was!
        txID || '',
        approved,
        txResult,
        tsResultError
    );
};

export default finishTransaction;

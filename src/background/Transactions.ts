// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromB64, toB64 } from '@mysten/bcs';
import {
    Ed25519Keypair,
    JsonRpcProvider,
    RawSigner,
    Transaction,
} from '@mysten/sui.js';
import { filter, lastValueFrom, map, race, Subject, take } from 'rxjs';
import nacl from 'tweetnacl';
import { v4 as uuidV4 } from 'uuid';
import Browser from 'webextension-polyfill';

import Authentication from './Authentication';
import { Window } from './Window';
// import {
//     SUI_TYPE_ARG,
//     DEFAULT_GAS_BUDGET_FOR_PAY,
// } from '../ui/app/redux/slices/sui-objects/Coin';
import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import type {
    MoveCallCommand,
    SignedTransaction,
    SuiTransactionResponse,
} from '@mysten/sui.js';
import type {
    SuiSignAndExecuteTransactionOptions,
    SuiSignMessageOutput,
} from '@mysten/wallet-standard';
import type {
    PreapprovalRequest,
    PreapprovalResponse,
    SignMessageRequest,
    SuiSignTransactionSerialized,
} from '_payloads/transactions';
import type {
    TransactionDataType,
    ApprovalRequest,
} from '_payloads/transactions/ApprovalRequest';
import type { TransactionRequestResponse } from '_payloads/transactions/ui/TransactionRequestResponse';
import type { ContentScriptConnection } from '_src/background/connections/ContentScriptConnection';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

// type SimpleCoin = {
//     balance: number;
//     coinObjectId: string;
//     coinType: string;
// };

const TX_STORE_KEY = 'transactions';
const PREAPPROVAL_KEY = 'preapprovals';

function openTxWindow(txRequestId: string) {
    return new Window({
        url:
            Browser.runtime.getURL('ui.html') +
            `#/tx-approval/${encodeURIComponent(txRequestId)}`,
        height: 720,
    });
}

function openSignMessageWindow(txRequestId: string) {
    return new Window({
        url:
            Browser.runtime.getURL('ui.html') +
            `#/sign-message-approval/${encodeURIComponent(txRequestId)}`,
        height: 720,
    });
}

function openPermissionWindow(permissionID: string) {
    return new Window({
        url:
            Browser.runtime.getURL('ui.html') +
            `#/preapproval/${encodeURIComponent(permissionID)}`,
        height: 780,
    });
}

class Transactions {
    private _txResponseMessages = new Subject<TransactionRequestResponse>();
    private _preapprovalResponseMessages = new Subject<PreapprovalResponse>();

    public async executeOrSignTransaction(
        {
            tx,
            sign,
        }:
            | { tx: TransactionDataType; sign?: undefined }
            | {
                  tx?: undefined;
                  sign: SuiSignTransactionSerialized;
              },
        connection: ContentScriptConnection
    ): Promise<SuiTransactionResponse | SignedTransaction> {
        const { txResultError, txResult, txSigned } =
            await this.requestApproval(
                tx ?? {
                    type: 'transaction',
                    justSign: true,
                    data: sign.transaction,
                    account: sign.account,
                },
                false,
                connection.origin,
                connection.originFavIcon
            );
        if (txResultError) {
            throw new Error(
                `Transaction failed with the following error. ${txResultError}`
            );
        }
        if (tx) {
            if (!txResult || !('digest' in txResult)) {
                throw new Error(`Transaction result is empty ${txResult}`);
            }
            return txResult;
        }
        if (!txSigned) {
            throw new Error('Transaction signature is empty');
        }
        return txSigned;
    }

    private async findPreapprovalRequest({
        moveCall,
        preapproval,
    }: {
        moveCall?: MoveCallCommand;
        preapproval?: Preapproval;
    }) {
        const activeAccount = await this.getActiveAccount();

        const preapprovalRequests = await this.getPreapprovalRequests();

        for (const preapprovalRequest of Object.values(preapprovalRequests)) {
            const { preapproval: existingPreapproval } = preapprovalRequest;

            if (existingPreapproval.address !== activeAccount.address) continue;

            const found = moveCall
                ? moveCall.target === existingPreapproval.target &&
                  moveCall.arguments.find(
                      (a) =>
                          a.kind === 'Input' &&
                          a.value === existingPreapproval.objectId
                  )
                : preapproval?.target === existingPreapproval.target &&
                  preapproval?.objectId === existingPreapproval.objectId;

            if (found) {
                return preapprovalRequest;
            }
        }
    }

    private async tryDirectExecution(
        tx: Transaction,
        preapprovalRequest: PreapprovalRequest,
        options?: SuiSignAndExecuteTransactionOptions
    ) {
        try {
            const txDirectResult =
                await this.executeMoveCallTransactionDirectly({
                    tx,
                    options,
                });

            const { result, error } = txDirectResult;

            if (error) {
                return { error, effects: null };
            }

            const { preapproval } = preapprovalRequest;
            preapproval.maxTransactionCount -= 1;
            const { effects } = result.EffectsCert || result;
            const { computationCost, storageCost, storageRebate } =
                effects.effects.gasUsed;
            const gasUsed = computationCost + (storageCost - storageRebate);
            preapproval.totalGasLimit -= gasUsed;

            if (
                preapprovalRequest.preapproval.maxTransactionCount > 0 &&
                preapprovalRequest.preapproval.totalGasLimit > gasUsed * 1.5
            ) {
                this.storePreapprovalRequest(preapprovalRequest);
            } else {
                this.removePreapprovalRequest(preapprovalRequest.id as string);
            }

            return { effects, error: null };
        } catch (e) {
            return { error: e, effects: null };
        }
    }

    public async executeTransaction(
        tx: TransactionDataType,
        connection: ContentScriptConnection
    ) {
        const transaction = Transaction.from(tx.data);
        if (transaction) {
            throw new Error(
                `COMMANDS: ${transaction.transactionData.commands.length}`
            );
        }

        const txRequest = this.createTransactionRequest(
            tx,
            connection.origin,
            connection.originFavIcon
        );
        await this.storeTransactionRequest(txRequest);
        const popUp = openTxWindow(txRequest.id);
        const popUpClose = (await popUp.show()).pipe(
            take(1),
            map<number, false>(() => false)
        );
        const txResponseMessage = this._txResponseMessages.pipe(
            filter((msg) => msg.txID === txRequest.id),
            take(1)
        );
        return lastValueFrom(
            race(popUpClose, txResponseMessage).pipe(
                take(1),
                map(async (response) => {
                    if (response) {
                        const { approved, txResult } = response;
                        if (approved) {
                            txRequest.txResult = txResult;
                            // txRequest.txResultError = tsResultError;
                            await this.storeTransactionRequest(txRequest);
                            // if (tsResultError) {
                            //     throw new Error(
                            //         `Transaction failed with the following error. ${tsResultError}`
                            //     );
                            // }
                            if (!txResult) {
                                throw new Error(`Transaction result is empty`);
                            }
                            return txResult;
                        }
                    }
                    await this.removeTransactionRequest(txRequest.id);
                    throw new Error('Transaction rejected from user');
                })
            )
        );
    }

    public async signMessage(
        {
            accountAddress,
            message,
        }: Required<Pick<SignMessageRequest, 'args'>>['args'],
        connection: ContentScriptConnection
    ): Promise<SuiSignMessageOutput> {
        const { txResult, txResultError } = await this.requestApproval(
            { type: 'sign-message', accountAddress, message },
            true,
            connection.origin,
            connection.originFavIcon
        );
        if (txResultError) {
            throw new Error(
                `Signing message failed with the following error ${txResultError}`
            );
        }
        if (!txResult) {
            throw new Error('Sign message result is empty');
        }
        if (!('messageBytes' in txResult)) {
            throw new Error('Sign message error, unknown result');
        }
        return txResult;
    }

    private async executeMoveCallTransactionDirectly({
        tx,
        options,
    }: {
        tx: Transaction;
        options?: SuiSignAndExecuteTransactionOptions;
    }) {
        const callData = {};
        // const activeAccount = await this.getActiveAccount();

        // const callData = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         jsonrpc: '2.0',
        //         method: 'sui_moveCall',
        //         params: [
        //             activeAccount.address,
        //             tx.packageObjectId,
        //             tx.module,
        //             tx.function,
        //             tx.typeArguments,
        //             tx.arguments,
        //             tx.gasPayment,
        //             tx.gasBudget,
        //         ],
        //         id: 1,
        //     }),
        // };

        return this.executeTransactionDirectly({ callData, options });
    }

    private async executeTransactionDirectly({
        callData,
        options,
    }: {
        callData: RequestInit;
        options?: SuiSignAndExecuteTransactionOptions;
    }) {
        const activeAccount = await this.getActiveAccount();

        const { sui_Env } = await Browser.storage.local.get('sui_Env');
        const connection = api.getEndPoints(sui_Env);
        const response = await fetch(connection.fullnode, callData);
        const json = await response.json();

        if (json.error) {
            throw new Error(json.error.message);
        }

        const {
            result: { txBytes },
        } = json;

        const message = fromB64(txBytes);

        const intent = [0, 0, 0];
        const intentMessage = new Uint8Array(intent.length + message.length);
        intentMessage.set(intent);
        intentMessage.set(message, intent.length);

        let serializedSig;
        if (activeAccount.seed) {
            const seed = Uint8Array.from(
                activeAccount.seed.split(',').map((s) => parseInt(s))
            );

            const keypair = new Ed25519Keypair(
                nacl.sign.keyPair.fromSeed(new Uint8Array(seed))
            );

            const provider = new JsonRpcProvider(connection);
            const signer = new RawSigner(keypair, provider);

            serializedSig = await signer.signData(intentMessage);
        } else {
            serializedSig = await Authentication.sign(
                activeAccount.address,
                intentMessage
            );
        }

        if (!serializedSig) return;

        const data = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'sui_executeTransactionSerializedSig',
                params: [
                    toB64(message),
                    toB64(serializedSig),
                    options?.requestType || 'WaitForLocalExecution',
                ],
                id: 1,
            }),
        };

        const executeResponse = await fetch(connection.fullnode, data);

        const txResponse = await executeResponse.json();

        return txResponse;
    }

    public async requestPreapproval(
        preapproval: Preapproval,
        connection: ContentScriptConnection
    ): Promise<PreapprovalResponse> {
        const activeAccount = await this.getActiveAccount();
        preapproval.address = activeAccount.address;

        const existingPreapprovalRequest = await this.findPreapprovalRequest({
            preapproval,
        });

        if (existingPreapprovalRequest && existingPreapprovalRequest.approved) {
            return {
                type: 'preapproval-response',
                id: existingPreapprovalRequest.id as string,
                approved: existingPreapprovalRequest.approved as boolean,
                preapproval: existingPreapprovalRequest.preapproval,
            };
        }

        const preapprovalRequest =
            existingPreapprovalRequest ||
            (await this.createPreapprovalRequest(
                preapproval,
                connection.origin,
                connection.originTitle,
                connection.originFavIcon
            ));

        await this.storePreapprovalRequest(preapprovalRequest);
        const popUp = openPermissionWindow(preapprovalRequest.id as string);
        const popUpClose = (await popUp.show()).pipe(
            take(1),
            map<number, false>(() => false)
        );
        const preapprovalResponseMessage =
            this._preapprovalResponseMessages.pipe(
                filter((msg) => msg.id === (preapprovalRequest.id as string)),
                take(1)
            );

        return lastValueFrom(
            race(popUpClose, preapprovalResponseMessage).pipe(
                take(1),
                map(async (response) => {
                    if (response && response.approved) {
                        preapprovalRequest.approved = true;
                        preapprovalRequest.preapproval = response.preapproval;
                        await this.storePreapprovalRequest(preapprovalRequest);
                        if (!preapprovalRequest) {
                            throw new Error(`Preapproval result is empty`);
                        }
                        return {
                            type: 'preapproval-response',
                            id: preapprovalRequest.id as string,
                            approved: preapprovalRequest.approved,
                            preapproval: preapprovalRequest.preapproval,
                        };
                    }
                    await this.removePreapprovalRequest(
                        preapprovalRequest.id as string
                    );
                    throw new Error('Preapproval rejected by user');
                })
            )
        );
    }

    public async getTransactionRequests(): Promise<
        Record<string, ApprovalRequest>
    > {
        return (await Browser.storage.local.get({ [TX_STORE_KEY]: {} }))[
            TX_STORE_KEY
        ];
    }
    public async getPreapprovalRequests(): Promise<
        Record<string, PreapprovalRequest>
    > {
        const resultsString = await getEncrypted(PREAPPROVAL_KEY);
        return JSON.parse(resultsString || '{}');
    }

    public async getTransactionRequest(
        txRequestID: string
    ): Promise<ApprovalRequest | null> {
        return (await this.getTransactionRequests())[txRequestID] || null;
    }

    public handleTxMessage(msg: TransactionRequestResponse) {
        this._txResponseMessages.next(msg);
    }

    public handlePreapprovalMessage(msg: PreapprovalResponse) {
        this._preapprovalResponseMessages.next(msg);
    }

    private async getActiveAccount(): Promise<AccountInfo> {
        const locked = await getEncrypted('locked');
        if (locked) {
            throw new Error('Wallet is locked');
        }
        const passphrase = await getEncrypted('passphrase');
        const authentication = await getEncrypted('authentication');
        const activeAccountIndex = await getEncrypted(
            'activeAccountIndex',
            (passphrase || authentication) as string
        );
        let accountInfos;
        if (authentication) {
            Authentication.set(authentication);
            accountInfos = await Authentication.getAccountInfos();
        } else {
            const accountInfosString = await getEncrypted(
                'accountInfos',
                (passphrase || authentication) as string
            );
            accountInfos = JSON.parse(accountInfosString || '[]');
        }

        return accountInfos.find(
            (accountInfo: AccountInfo) =>
                (accountInfo.index || 0) === parseInt(activeAccountIndex || '0')
        );
    }

    private createTransactionRequest(
        tx: ApprovalRequest['tx'],
        origin: string,
        originFavIcon?: string
    ): ApprovalRequest {
        return {
            id: uuidV4(),
            approved: null,
            origin,
            originFavIcon,
            createdDate: new Date().toISOString(),
            tx,
        };
    }

    private async createPreapprovalRequest(
        preapproval: Preapproval,
        origin: string,
        originTitle?: string,
        originFavIcon?: string
    ): Promise<PreapprovalRequest> {
        return {
            type: 'preapproval-request',
            id: uuidV4(),
            origin,
            originTitle,
            originFavIcon,
            createdDate: new Date().toISOString(),
            preapproval,
        };
    }

    private async saveTransactionRequests(
        txRequests: Record<string, ApprovalRequest>
    ) {
        await Browser.storage.local.set({ [TX_STORE_KEY]: txRequests });
    }

    private async savePreapprovalRequests(
        requests: Record<string, PreapprovalRequest>
    ) {
        await setEncrypted(PREAPPROVAL_KEY, JSON.stringify(requests));
    }

    private async storeTransactionRequest(txRequest: ApprovalRequest) {
        const txs = await this.getTransactionRequests();
        txs[txRequest.id] = txRequest;
        await this.saveTransactionRequests(txs);
    }

    private async removeTransactionRequest(txID: string) {
        const txs = await this.getTransactionRequests();
        delete txs[txID];
        await this.saveTransactionRequests(txs);
    }

    public async removePreapprovalRequest(permissionID: string) {
        const permissions = await this.getPreapprovalRequests();
        delete permissions[permissionID];
        await this.savePreapprovalRequests(permissions);
    }

    private async storePreapprovalRequest(request: PreapprovalRequest) {
        const requests = await this.getPreapprovalRequests();

        // Limit active preapprovals to 10 to save user's local storage
        const requestIds = Object.keys(requests);
        if (requestIds.length > 10) {
            const oldestRequestId = requestIds[0];
            delete requests[oldestRequestId];
        }

        requests[request.id as string] = request;
        await this.savePreapprovalRequests(requests);
    }

    private async requestApproval(
        request: ApprovalRequest['tx'],
        sign: boolean,
        origin: string,
        favIcon?: string
    ) {
        const txRequest = this.createTransactionRequest(
            request,
            origin,
            favIcon
        );
        await this.storeTransactionRequest(txRequest);
        const popUp = sign
            ? openSignMessageWindow(txRequest.id)
            : openTxWindow(txRequest.id);
        const popUpClose = (await popUp.show()).pipe(
            take(1),
            map<number, false>(() => false)
        );
        const txResponseMessage = this._txResponseMessages.pipe(
            filter((msg) => msg.txID === txRequest.id),
            take(1)
        );
        return lastValueFrom(
            race(popUpClose, txResponseMessage).pipe(
                take(1),
                map(async (response) => {
                    if (response) {
                        const { approved, txResult, txSigned, txResultError } =
                            response;
                        if (approved) {
                            txRequest.approved = approved;
                            txRequest.txResult = txResult;
                            txRequest.txResultError = txResultError;
                            txRequest.txSigned = txSigned;
                            await this.storeTransactionRequest(txRequest);
                            return txRequest;
                        }
                    }
                    await this.removeTransactionRequest(txRequest.id);
                    throw new Error('Rejected from user');
                })
            )
        );
    }
}

const transactions = new Transactions();

export default transactions;

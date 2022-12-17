// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import {
    Base64DataBuffer,
    Ed25519Keypair,
    RawSigner,
    SIGNATURE_SCHEME_TO_FLAG,
} from '@mysten/sui.js';
import { filter, lastValueFrom, map, race, Subject, take } from 'rxjs';
import nacl from 'tweetnacl';
import { v4 as uuidV4 } from 'uuid';
import Browser from 'webextension-polyfill';

import Authentication from './Authentication';
import { Window } from './Window';
import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';

import type { MoveCallTransaction } from '@mysten/sui.js';
import type { TransactionDataType } from '_messages/payloads/transactions/ExecuteTransactionRequest';
import type {
    PreapprovalRequest,
    PreapprovalResponse,
    TransactionRequest,
} from '_payloads/transactions';
import type { TransactionRequestResponse } from '_payloads/transactions/ui/TransactionRequestResponse';
import type { ContentScriptConnection } from '_src/background/connections/ContentScriptConnection';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

const TX_STORE_KEY = 'transactions';
const PREAPPROVAL_KEY = 'preapprovals';

function openTxWindow(txRequestID: string) {
    return new Window({
        url:
            Browser.runtime.getURL('ui.html') +
            `#/tx-approval/${encodeURIComponent(txRequestID)}`,
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

    private async findPreapprovalRequest({
        moveCall,
        preapproval,
    }: {
        moveCall?: MoveCallTransaction;
        preapproval?: Preapproval;
    }) {
        const activeAccount = await this.getActiveAccount();

        const preapprovalRequests = await this.getPreapprovalRequests();

        for (const preapprovalRequest of Object.values(preapprovalRequests)) {
            const { preapproval: existingPreapproval } = preapprovalRequest;

            if (existingPreapproval.address !== activeAccount.address) continue;

            const found = moveCall
                ? moveCall.packageObjectId ===
                      existingPreapproval.packageObjectId &&
                  moveCall.function === existingPreapproval.function &&
                  moveCall.arguments.indexOf(existingPreapproval.objectId) > -1
                : preapproval?.packageObjectId ===
                      existingPreapproval.packageObjectId &&
                  preapproval?.function === existingPreapproval.function &&
                  preapproval?.objectId === existingPreapproval.objectId;

            if (found) {
                return preapprovalRequest;
            }
        }
    }

    private async tryDirectExecution(
        tx: MoveCallTransaction,
        preapprovalRequest: PreapprovalRequest
    ) {
        try {
            const txDirectResult = await this.executeTransactionDirectly({
                tx,
            });

            const { result, error } = txDirectResult;

            if (error) {
                return { error, effects: null };
            }

            const { preapproval } = preapprovalRequest;
            preapproval.maxTransactionCount -= 1;
            const { effects } = result.EffectsCert;
            const { computationCost, storageCost, storageRebate } =
                effects.effects.gasUsed;
            const gasUsed = computationCost + (storageCost - storageRebate);
            preapproval.totalGasLimit -= gasUsed;

            preapprovalRequest.preapproval.transactions.push({
                gasUsed,
            });
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
        if (tx.type === 'v2' || tx.type === 'move-call') {
            let moveCall: MoveCallTransaction | undefined;
            if (tx.type === 'v2') {
                if (tx.data.kind === 'moveCall') {
                    moveCall = tx.data.data;
                }
            } else {
                moveCall = tx.data;
            }

            if (moveCall) {
                const permissionRequest = await this.findPreapprovalRequest({
                    moveCall,
                });

                if (permissionRequest) {
                    const { effects, error } = await this.tryDirectExecution(
                        moveCall,
                        permissionRequest
                    );
                    if (effects) {
                        return effects;
                    }

                    if (error) {
                        throw new Error(error.message);
                    }
                }
            }
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
                        const { approved, txResult, tsResultError } = response;
                        if (approved) {
                            txRequest.approved = approved;
                            txRequest.txResult = txResult;
                            txRequest.txResultError = tsResultError;
                            await this.storeTransactionRequest(txRequest);
                            if (tsResultError) {
                                throw new Error(
                                    `Transaction failed with the following error. ${tsResultError}`
                                );
                            }
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

    private async executeTransactionDirectly({
        tx,
    }: {
        tx: MoveCallTransaction;
    }) {
        const activeAccount = await this.getActiveAccount();

        const endpoint = process.env.API_ENDPOINT_DEV_NET_FULLNODE || '';

        const callData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'sui_moveCall',
                params: [
                    activeAccount.address,
                    tx.packageObjectId,
                    tx.module,
                    tx.function,
                    tx.typeArguments,
                    tx.arguments,
                    tx.gasPayment,
                    tx.gasBudget,
                ],
                id: 1,
            }),
        };

        const response = await fetch(endpoint, callData);
        const json = await response.json();

        const {
            result: { txBytes },
        } = json;

        const txBytesBuffer = new Base64DataBuffer(txBytes);
        let signature;
        let publicKey;
        if (activeAccount.seed) {
            const seed = Uint8Array.from(
                activeAccount.seed.split(',').map((s) => parseInt(s))
            );

            const keypair = new Ed25519Keypair(
                nacl.sign.keyPair.fromSeed(new Uint8Array(seed))
            );

            const INTENT_BYTES = [0, 0, 0];
            const intentMessage = new Uint8Array(
                INTENT_BYTES.length + txBytesBuffer.getLength()
            );
            intentMessage.set(INTENT_BYTES);
            intentMessage.set(txBytesBuffer.getData(), INTENT_BYTES.length);

            const dataToSign = new Base64DataBuffer(intentMessage);

            const signer = new RawSigner(keypair);

            const signed = await signer.signData(dataToSign);
            signature = signed.signature;
            publicKey = signed.pubKey;
        } else {
            const signed = await Authentication.sign(
                activeAccount.address,
                txBytes
            );
            publicKey = signed?.pubKey;
            signature = signed?.signature;
        }

        if (!signature) return;

        const serializedSig = new Uint8Array(
            1 + signature.getLength() + publicKey.toBytes().length
        );
        serializedSig.set([SIGNATURE_SCHEME_TO_FLAG['ED25519']]);
        serializedSig.set(signature.getData(), 1);
        serializedSig.set(publicKey.toBytes(), 1 + signature.getLength());

        const data = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'sui_executeTransactionSerializedSig',
                params: [
                    txBytesBuffer.toString(),
                    new Base64DataBuffer(serializedSig).toString(),
                    'WaitForLocalExecution',
                ],
                id: 1,
            }),
        };

        const executeResponse = await fetch(endpoint, data);
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

        preapproval.transactions ||= [];

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
        Record<string, TransactionRequest>
    > {
        const requestsString = await getEncrypted(TX_STORE_KEY);
        return JSON.parse(requestsString || '{}');
    }

    public async getPreapprovalRequests(): Promise<
        Record<string, PreapprovalRequest>
    > {
        const resultsString = await getEncrypted(PREAPPROVAL_KEY);
        return JSON.parse(resultsString || '{}');
    }

    public async getTransactionRequest(
        txRequestID: string
    ): Promise<TransactionRequest | null> {
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

        // console.log(
        //     'accountInfos',
        //     passphrase,
        //     authentication,
        //     accountInfos,
        //     activeAccountIndex
        // );

        return accountInfos.find(
            (accountInfo: AccountInfo) =>
                (accountInfo.index || 0) === parseInt(activeAccountIndex || '0')
        );
    }

    private createTransactionRequest(
        tx: TransactionDataType,
        origin: string,
        originFavIcon?: string
    ): TransactionRequest {
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
        txRequests: Record<string, TransactionRequest>
    ) {
        await setEncrypted(TX_STORE_KEY, JSON.stringify(txRequests));
    }

    private async savePreapprovalRequests(
        requests: Record<string, PreapprovalRequest>
    ) {
        await setEncrypted(PREAPPROVAL_KEY, JSON.stringify(requests));
    }

    private async storeTransactionRequest(txRequest: TransactionRequest) {
        const txs = await this.getTransactionRequests();

        for (const id of Object.keys(txs)) {
            if (txs[id].txResult) delete txs[id];
        }

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
        requests[request.id as string] = request;
        await this.savePreapprovalRequests(requests);
    }
}

export default new Transactions();

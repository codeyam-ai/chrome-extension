// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { RawSigner } from '@mysten/sui.js';
import {
    SuiClient,
    type SuiTransactionBlockResponse,
} from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import {
    SUI_MAINNET_CHAIN,
    type IdentifierString,
    type SuiSignPersonalMessageOutput,
    type SuiSignAndExecuteTransactionBlockInput,
    SUI_TESTNET_CHAIN,
    SUI_DEVNET_CHAIN,
} from '@mysten/wallet-standard';
import { filter, lastValueFrom, map, race, Subject, take } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import Browser from 'webextension-polyfill';

import { Window } from './Window';
import { API_ENV } from '../ui/app/ApiProvider';
import { PREAPPROVAL_KEY, TX_STORE_KEY } from '_src/shared/constants';
import { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import { getEncrypted, setEncrypted } from '_src/shared/storagex/store';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import type { SignedTransaction } from '@mysten/sui.js';
import type {
    PreapprovalRequest,
    PreapprovalResponse,
    SignPersonalMessageRequest,
    SuiSignTransactionSerialized,
} from '_payloads/transactions';
import type {
    ApprovalRequest,
    TransactionDataType,
} from '_payloads/transactions/ApprovalRequest';
import type { TransactionRequestResponse } from '_payloads/transactions/ui/TransactionRequestResponse';
import type { ContentScriptConnection } from '_src/background/connections/ContentScriptConnection';
import type { Preapproval } from '_src/shared/messaging/messages/payloads/transactions/Preapproval';
import type { SeedInfo } from '_src/ui/app/KeypairVault';

function openTxWindow(txRequestId: string) {
    return new Window({
        url:
            Browser.runtime.getURL('ui.html') +
            `#/tx-approval/${encodeURIComponent(txRequestId)}`,
        height: 720,
    });
}

function openSignPersonalMessageWindow(txRequestId: string) {
    return new Window({
        url:
            Browser.runtime.getURL('ui.html') +
            `#/sign-personal-message-approval/${encodeURIComponent(
                txRequestId
            )}`,
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
    ): Promise<SuiTransactionBlockResponse | SignedTransaction> {
        if (tx) {
            const transactionBlock = TransactionBlock.from(tx.data);
            for (const command of transactionBlock.blockData.transactions) {
                if (command.kind === 'MoveCall') {
                    const objectIds: string[] = [];
                    for (const argument of command.arguments) {
                        if (
                            argument.kind === 'Input' &&
                            argument.type === 'object' &&
                            !!argument.value
                        ) {
                            objectIds.push(`${argument.value}`);
                        }
                    }

                    const preapproval = await this.findPreapprovalRequest({
                        target: command.target,
                        objectIds,
                        address: tx.account,
                        chain: tx.chain,
                    });

                    if (preapproval?.approved) {
                        const txResult = await this.tryDirectExecution(
                            transactionBlock,
                            tx.account,
                            tx.chain,
                            preapproval,
                            tx?.requestType,
                            tx?.options
                        );
                        if (txResult) {
                            return txResult;
                        }
                    }
                }
            }
        }
        const { txResultError, txResult, txSigned } =
            await this.requestApproval(
                tx ?? {
                    type: 'transaction',
                    justSign: true,
                    data: sign.transaction,
                    account: sign.account,
                    chain: sign.chain,
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
        target,
        objectIds,
        address,
        chain,
        preapproval,
    }: {
        target?: `${string}::${string}::${string}`;
        objectIds?: string[];
        address?: string;
        chain?: IdentifierString;
        preapproval?: Preapproval;
    }) {
        const preapprovalRequests = await this.getPreapprovalRequests();

        for (const preapprovalRequest of Object.values(preapprovalRequests)) {
            const { preapproval: existingPreapproval } = preapprovalRequest;

            const found = target
                ? target === existingPreapproval.target &&
                  objectIds?.includes(existingPreapproval.objectId) &&
                  address === existingPreapproval.address &&
                  chain === existingPreapproval.chain
                : preapproval?.target === existingPreapproval.target &&
                  preapproval?.objectId === existingPreapproval.objectId &&
                  preapproval?.address === existingPreapproval.address &&
                  preapproval?.chain === existingPreapproval.chain;

            if (found) {
                return preapprovalRequest;
            }
        }
    }

    private async tryDirectExecution(
        tx: TransactionBlock,
        address: string,
        chain: IdentifierString | undefined,
        preapprovalRequest: PreapprovalRequest,
        requestType?: SuiSignAndExecuteTransactionBlockInput['requestType'],
        options?: SuiSignAndExecuteTransactionBlockInput['options']
    ) {
        try {
            const txDirectResult = await this.executeTransactionDirectly({
                transactionBlock: tx,
                address,
                chain,
                options,
                requestType,
            });

            if (!txDirectResult?.effects) {
                return txDirectResult;
            }

            const { preapproval } = preapprovalRequest;
            preapproval.maxTransactionCount -= 1;

            const { computationCost, storageCost, storageRebate } =
                txDirectResult.effects.gasUsed;
            const gasUsed =
                Number(computationCost) +
                (Number(storageCost) - Number(storageRebate));
            preapproval.totalGasLimit -= gasUsed;

            if (
                preapprovalRequest.preapproval.maxTransactionCount > 0 &&
                preapprovalRequest.preapproval.totalGasLimit > gasUsed * 1.5
            ) {
                this.storePreapprovalRequest(preapprovalRequest);
            } else {
                this.removePreapprovalRequest(preapprovalRequest.id as string);
            }

            return txDirectResult;
        } catch (e) {
            return null;
        }
    }

    public async signPersonalMessage(
        {
            accountAddress,
            message,
        }: Required<Pick<SignPersonalMessageRequest, 'args'>>['args'],
        connection: ContentScriptConnection
    ): Promise<SuiSignPersonalMessageOutput> {
        const { txResult, txResultError } = await this.requestApproval(
            { type: 'sign-personal-message', accountAddress, message },
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
        if (!('bytes' in txResult)) {
            throw new Error('Sign message error, unknown result');
        }
        return txResult;
    }

    private async executeTransactionDirectly({
        transactionBlock,
        address,
        chain,
        requestType,
        options,
    }: {
        transactionBlock: TransactionBlock;
        address: string;
        chain?: IdentifierString;
        requestType?: SuiSignAndExecuteTransactionBlockInput['requestType'];
        options?: SuiSignAndExecuteTransactionBlockInput['options'];
    }) {
        let env;
        let envEndpoint;
        switch (chain) {
            case SUI_MAINNET_CHAIN:
                env = API_ENV.mainNet;
                break;
            case SUI_TESTNET_CHAIN:
                env = API_ENV.testNet;
                break;
            case SUI_DEVNET_CHAIN:
                env = API_ENV.devNet;
                break;
            case 'sui:local':
                env = API_ENV.local;
                break;
            case 'sui:custom':
                env = API_ENV.customRPC;
                break;
            default: {
                env = API_ENV.mainNet;
            }
        }

        const envInfo = await Browser.storage.local.get([
            'sui_Env',
            'sui_Env_RPC',
        ]);

        if (envInfo?.sui_Env === API_ENV.customRPC) {
            envEndpoint = envInfo?.sui_Env_RPC;
        }

        let url: string;
        if (envEndpoint) {
            url = envEndpoint;
        } else if (env) {
            url = api.getEndPoints(env);
        } else {
            throw new Error('No connection found');
        }

        if (!url) {
            throw new Error(
                'No url found with which to establish a SuiClient connection'
            );
        }

        const client = new SuiClient({ url });

        try {
            let signer;

            const authentication = await this.getAuthentication();
            if (authentication) {
                signer = new EthosSigner(address, authentication, client);
            } else {
                const activeSeed = await this.getActiveSeed();

                if (activeSeed.address !== address) {
                    throw new Error(
                        'Requested address for transaction is not active.'
                    );
                }

                const secretKey = Uint8Array.from(
                    activeSeed.seed.split(',').map((n) => parseInt(n))
                );
                const keypair = Ed25519Keypair.fromSecretKey(secretKey);
                signer = new RawSigner(keypair, client);
            }

            const txResponse = await signer.signAndExecuteTransactionBlock({
                transactionBlock,
                options,
                requestType,
            });

            return txResponse;
        } catch (e) {
            return null;
        }
    }

    public async requestPreapproval(
        preapproval: Preapproval,
        connection: ContentScriptConnection
    ): Promise<PreapprovalResponse> {
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
        const resultsString = await getEncrypted({
            key: TX_STORE_KEY,
            session: false,
            strong: false,
        });
        return JSON.parse(resultsString || '{}');
    }

    public async getPreapprovalRequests(): Promise<
        Record<string, PreapprovalRequest>
    > {
        const resultsString = await getEncrypted({
            key: PREAPPROVAL_KEY,
            session: true,
            strong: false,
        });
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

    private async getActiveSeed(): Promise<SeedInfo> {
        const activeSeedString = await getEncrypted({
            key: 'activeSeed',
            session: true,
            strong: false,
        });

        return JSON.parse(activeSeedString || '[]');
    }

    private async getAuthentication(): Promise<string | null> {
        const authentication = await getEncrypted({
            key: 'authentication',
            session: true,
            strong: false,
        });

        return authentication;
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
        await setEncrypted({
            key: TX_STORE_KEY,
            value: JSON.stringify(txRequests),
            strong: false,
            session: false,
        });

        Browser.storage.local.remove(TX_STORE_KEY);
    }

    private async savePreapprovalRequests(
        requests: Record<string, PreapprovalRequest>
    ) {
        await setEncrypted({
            key: PREAPPROVAL_KEY,
            value: JSON.stringify(requests),
            strong: false,
            session: true,
        });
    }

    private async storeTransactionRequest(txRequest: ApprovalRequest) {
        const txs = await this.getTransactionRequests();
        txs[txRequest.id] = txRequest;
        await this.saveTransactionRequests(txs);
    }

    public async removeTransactionRequest(txID: string) {
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
            ? openSignPersonalMessageWindow(txRequest.id)
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
                            await this.removeTransactionRequest(txRequest.id);
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

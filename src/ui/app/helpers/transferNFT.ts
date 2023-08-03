import { type JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';

import { getSigner } from './getSigner';
import transferObjectTransactionBlock from './transferObjectTransactionBlock';
import utils from './utils';

import type { AccountInfo } from '../KeypairVault';
import type { ExtendedSuiObjectData } from '../redux/slices/sui-objects';
import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';

const transferNFT = async ({
    connectToLedger,
    nft,
    passphrase,
    accountInfos,
    address,
    authentication,
    activeAccountIndex,
    recipientAddress,
    provider,
}: {
    connectToLedger: () => Promise<SuiLedgerClient>;
    nft: ExtendedSuiObjectData;
    passphrase: string | null;
    accountInfos: AccountInfo[];
    address: string | null;
    authentication: string | null;
    activeAccountIndex: number;
    recipientAddress: string;
    provider: JsonRpcProvider;
}) => {
    if (!nft) return;

    const signer = await getSigner(
        passphrase,
        accountInfos,
        address,
        authentication,
        activeAccountIndex,
        connectToLedger
    );

    if (!signer) return;

    let transactionBlock: TransactionBlock | null = new TransactionBlock();

    transactionBlock = await transferObjectTransactionBlock(
        transactionBlock,
        nft,
        recipientAddress,
        provider
    );

    if (!transactionBlock) return;

    const executedTransaction = await signer.signAndExecuteTransactionBlock({
        transactionBlock,
        options: {
            showEffects: true,
            showEvents: true,
            showInput: true,
        },
    });

    const txnResp = {
        timestamp_ms: utils.getTimestampFromTransactionResponse(
            executedTransaction.timestampMs
        ),
        status: utils.getExecutionStatusType(executedTransaction.effects),
        gasFee: utils.getTotalGasUsed(executedTransaction.effects).toString(),
        txId: executedTransaction.digest, //getTransactionDigest(executedTransaction),
    };

    return txnResp;
};

export default transferNFT;

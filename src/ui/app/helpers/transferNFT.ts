import { TransactionBlock } from '@mysten/sui.js/transactions';

import { getSigner } from './getSigner';
import transferObjectTransactionBlock from './transferObjectTransactionBlock';
import utils from './utils';

import type { AccountInfo } from '../KeypairVault';
import type { ZkData } from '../components/zklogin/ZKLogin';
import type { ExtendedSuiObjectData } from '../redux/slices/sui-objects';
import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { SuiClient } from '@mysten/sui.js/client';

const transferNFT = async ({
    connectToLedger,
    nft,
    passphrase,
    accountInfos,
    address,
    authentication,
    zkData,
    activeAccountIndex,
    recipientAddress,
    client,
}: {
    connectToLedger: () => Promise<SuiLedgerClient>;
    nft: ExtendedSuiObjectData;
    passphrase: string | null;
    accountInfos: AccountInfo[];
    address: string | null;
    authentication: string | null;
    zkData: ZkData | null;
    activeAccountIndex: number;
    recipientAddress: string;
    client: SuiClient;
}) => {
    if (!nft) return;

    const signer = await getSigner(
        passphrase,
        accountInfos,
        address,
        authentication,
        zkData,
        activeAccountIndex,
        connectToLedger
    );

    if (!signer) return;

    let transactionBlock: TransactionBlock | null = new TransactionBlock();

    transactionBlock = await transferObjectTransactionBlock(
        transactionBlock,
        nft,
        recipientAddress,
        client
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

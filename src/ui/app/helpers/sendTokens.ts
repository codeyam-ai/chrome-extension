import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';

import { getSigner } from './getSigner';
import { Coin } from '../redux/slices/sui-objects/Coin';

import type { AccountInfo } from '../KeypairVault';
import type { ZkData } from '../components/zklogin/ZKLogin';
import type SuiLedgerClient from '@mysten/ledgerjs-hw-app-sui';
import type { SuiMoveObject } from '@mysten/sui.js/client';

const sendTokens = async ({
    connectToLedger,
    allCoins,
    passphrase,
    accountInfos,
    address,
    authentication,
    zkData,
    activeAccountIndex,
    tokenTypeArg,
    amount,
    recipientAddress,
}: {
    connectToLedger: () => Promise<SuiLedgerClient>;
    allCoins: SuiMoveObject[];
    passphrase: string | null;
    accountInfos: AccountInfo[];
    address: string | null;
    authentication: string | null;
    zkData: ZkData | null;
    activeAccountIndex: number;
    tokenTypeArg: string;
    amount: bigint;
    recipientAddress: string;
}) => {
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

    const [primaryCoin, ...mergeCoins] = allCoins.filter(
        (coin) => coin.type === `0x2::coin::Coin<${tokenTypeArg}>`
    );

    const transactionBlock = new TransactionBlock();
    if (tokenTypeArg === SUI_TYPE_ARG) {
        const coinToTransfer = transactionBlock.splitCoins(
            transactionBlock.gas,
            [transactionBlock.pure(amount)]
        );
        transactionBlock.transferObjects(
            [coinToTransfer],
            transactionBlock.pure(recipientAddress)
        );
    } else {
        const primaryCoinInput = transactionBlock.object(
            Coin.getID(primaryCoin)
        );
        if (mergeCoins.length > 0) {
            transactionBlock.mergeCoins(
                primaryCoinInput,
                mergeCoins.map((mergeCoin) =>
                    transactionBlock.object(Coin.getID(mergeCoin))
                )
            );
        }
        const coinToTransfer = transactionBlock.splitCoins(primaryCoinInput, [
            transactionBlock.pure(amount),
        ]);
        transactionBlock.transferObjects(
            [coinToTransfer],
            transactionBlock.pure(recipientAddress)
        );
    }

    console.log('in sendTokens 🔥🔥🔥🔥');

    const response = await signer.signAndExecuteTransactionBlock({
        transactionBlock,
    });

    console.log(
        'response from signer.signAndExecuteTransactionBlock :>> ',
        response
    );

    return response;
};

export default sendTokens;

import { TransactionBlock } from '@mysten/sui.js';
import {
    SUI_DEVNET_CHAIN,
    SUI_MAINNET_CHAIN,
    SUI_TESTNET_CHAIN,
} from '@mysten/wallet-standard';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import IncorrectChain from './errors/IncorrectChain';
import IncorrectSigner from './errors/IncorrectSigner';
import LockedNFT from './errors/LockedNFT';
import NotEnoughGas from './errors/NotEnoughGas';
import UnknownError from './errors/UnknownError';
import analyzeChanges from './lib/analyzeChanges';
import finishTransaction from './lib/finishTransaction';
import resizeWindow from './lib/resizeWindow';
import Base from './types/Base';
import ComplexMoveCall from './types/ComplexMoveCall';
import SimpleAssetMint from './types/SimpleAssetMint';
import SimpleAssetSwap from './types/SimpleAssetSwap';
import SimpleAssetTransfer from './types/SimpleAssetTransfer';
import SimpleBase from './types/SimpleBase';
import SimpleCoinTransfer from './types/SimpleCoinTransfer';
import { useSuiLedgerClient } from '../../components/ledger/SuiLedgerClientProvider';
import { getSigner } from '../../helpers/getSigner';
import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { useAppSelector, useInitializedGuard } from '_hooks';
import { txRequestsSelectors } from '_redux/slices/transaction-requests';
import { useDependencies } from '_shared/utils/dependenciesContext';

import type { AnalyzeChangesResult } from './lib/analyzeChanges';
import type { RawSigner, SuiMoveNormalizedType } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';
import type { LedgerSigner } from '_src/shared/cryptography/LedgerSigner';
import type { ReactNode } from 'react';

export type Permission = {
    label: string;
    count: number;
};

export type DistilledEffect = {
    address?: string;
    module?: string;
    name?: string;
    type_arguments?: SuiMoveNormalizedType[];
};

export function DappTxApprovalPage() {
    const { connectToLedger } = useSuiLedgerClient();
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);

    const activeChain = useMemo(() => {
        switch (selectedApiEnv) {
            case 'customRPC':
                return 'sui:unknown';
            case 'local':
                return 'sui:local';
            case 'testNet':
                return SUI_TESTNET_CHAIN;
            case 'devNet':
                return SUI_DEVNET_CHAIN;
            default:
                return SUI_MAINNET_CHAIN;
        }
    }, [selectedApiEnv]);

    const [signer, setSigner] = useState<
        RawSigner | EthosSigner | LedgerSigner | undefined
    >();
    const {
        activeAccountIndex,
        address,
        authentication,
        accountInfos,
        passphrase,
    } = useAppSelector(({ account }) => account);

    const activeAccount = useMemo(
        () =>
            accountInfos.find(
                (accountInfo) => accountInfo.index === activeAccountIndex
            ),
        [accountInfos, activeAccountIndex]
    );

    const { txID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const txRequestsLoading = useAppSelector(
        ({ transactionRequests }) => !transactionRequests.initialized
    );

    const txRequestSelector = useMemo(
        () => (state: RootState) =>
            (txID && txRequestsSelectors.selectById(state, txID)) || null,
        [txID]
    );
    const txRequest = useAppSelector(txRequestSelector);

    const transactionBlock = useMemo(() => {
        if (!txRequest || !('data' in txRequest.tx)) return null;
        return TransactionBlock.from(txRequest.tx.data);
    }, [txRequest]);

    const [dryRunError, setDryRunError] = useState<string | undefined>();
    const [explicitError, setExplicitError] = useState<ReactNode | undefined>();
    const [done, setDone] = useState<boolean>(false);

    // const normalizedFunction = useNormalizedFunction(txRequest);

    const [analysis, setAnalysis] = useState<
        AnalyzeChangesResult | undefined | null
    >();

    const loading =
        guardLoading ||
        txRequestsLoading ||
        !txRequest ||
        !signer ||
        !address ||
        (activeAccount?.importedLedgerIndex === undefined &&
            analysis === undefined);

    useEffect(() => {
        window.onresize = () => {
            const content = document.getElementById('content');

            if (!content) return;

            content.style.height = 'auto';
            const contentHeight = content.offsetHeight;
            content.style.height = `${contentHeight}px`;
        };
    }, []);

    useEffect(() => {
        setSigner(undefined);
        setAnalysis(undefined);
        setDryRunError(undefined);
        resizeWindow();
    }, [selectedApiEnv]);

    useEffect(() => {
        if (signer) return;

        if (!accountInfos || accountInfos.length === 0) return;

        const retrieveSigner = async () => {
            const signer = await getSigner(
                passphrase,
                accountInfos,
                address,
                authentication,
                activeAccountIndex,
                connectToLedger
            );

            if (signer) {
                setSigner(signer);
            }
        };

        retrieveSigner();
    }, [
        accountInfos,
        activeAccount,
        activeAccountIndex,
        address,
        authentication,
        connectToLedger,
        passphrase,
        selectedApiEnv,
        signer,
    ]);

    const getTransactionInfo = useCallback(async () => {
        if (!accountInfos || accountInfos.length === 0) return;

        if (
            (txRequest &&
                'account' in txRequest.tx &&
                txRequest.tx.account &&
                address &&
                txRequest.tx.account !== address) ||
            (txRequest &&
                'chain' in txRequest.tx &&
                txRequest.tx.chain &&
                [
                    SUI_DEVNET_CHAIN,
                    SUI_TESTNET_CHAIN,
                    SUI_MAINNET_CHAIN,
                ].includes(txRequest.tx.chain) &&
                [
                    SUI_DEVNET_CHAIN,
                    SUI_TESTNET_CHAIN,
                    SUI_MAINNET_CHAIN,
                ].includes(activeChain) &&
                txRequest.tx.chain !== activeChain)
        ) {
            setAnalysis(null);
            return;
        }

        if (!signer || !transactionBlock || !activeAccount) return;

        // console.log('SERIALIZED', transactionBlock.serialize());

        try {
            const analysis = await analyzeChanges({
                signer,
                transactionBlock,
            });

            if ('type' in analysis) {
                if (
                    analysis.type === 'Insufficient Gas' &&
                    analysis.errorInfo &&
                    analysis.errorInfo.gasRequired &&
                    analysis.errorInfo.gasAvailable
                ) {
                    setExplicitError(
                        <NotEnoughGas
                            gasAvailable={analysis.errorInfo.gasAvailable}
                            gasRequired={analysis.errorInfo.gasRequired}
                        />
                    );
                } else if (analysis.type === 'NFT is locked') {
                    setExplicitError(<LockedNFT />);
                } else {
                    setDryRunError(analysis.message);
                }
                setAnalysis(null);
            } else {
                setAnalysis(analysis);
            }
        } catch (e: unknown) {
            setDryRunError(`${e}`);
            setAnalysis(null);
        }
    }, [
        accountInfos,
        activeAccount,
        activeChain,
        address,
        signer,
        transactionBlock,
        txRequest,
    ]);

    useEffect(() => {
        getTransactionInfo();
    }, [getTransactionInfo]);

    const closeWindow = useDependencies().closeWindow;

    useEffect(() => {
        if (done) {
            closeWindow();
        }
    }, [closeWindow, done]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (!signer) return;

            const justSign =
                txRequest?.tx && 'justSign' in txRequest.tx
                    ? txRequest.tx.justSign
                    : undefined;
            const options =
                txRequest?.tx && 'options' in txRequest.tx
                    ? txRequest.tx.options
                    : undefined;
            const requestType =
                txRequest?.tx && 'requestType' in txRequest.tx
                    ? txRequest.tx.requestType
                    : undefined;
            await finishTransaction(
                signer,
                transactionBlock ?? null,
                txID,
                approved,
                justSign,
                options,
                requestType
            );
            setDone(true);
        },
        [txRequest, signer, transactionBlock, txID]
    );

    const onApprove = useCallback(() => {
        handleOnSubmit(true);
    }, [handleOnSubmit]);

    const onComplete = useCallback(() => {
        handleOnSubmit(false);
    }, [handleOnSubmit]);

    const content = useMemo(() => {
        if (
            txRequest &&
            'account' in txRequest.tx &&
            txRequest.tx.account &&
            txRequest.tx.account !== address
        ) {
            return (
                <SimpleBase approval={txRequest} onComplete={onComplete}>
                    <div className="py-12">
                        <IncorrectSigner
                            txID={txID}
                            txRequest={txRequest}
                            correctAddress={txRequest.tx.account}
                        />
                    </div>
                </SimpleBase>
            );
        }

        if (
            txRequest &&
            'chain' in txRequest.tx &&
            txRequest.tx.chain &&
            [SUI_DEVNET_CHAIN, SUI_TESTNET_CHAIN, SUI_MAINNET_CHAIN].includes(
                txRequest.tx.chain
            ) &&
            [SUI_DEVNET_CHAIN, SUI_TESTNET_CHAIN, SUI_MAINNET_CHAIN].includes(
                activeChain
            ) &&
            txRequest.tx.chain !== activeChain
        ) {
            return (
                <SimpleBase approval={txRequest} onComplete={onComplete}>
                    <IncorrectChain
                        txID={txID}
                        txRequest={txRequest}
                        correctChain={txRequest.tx.chain}
                    />
                </SimpleBase>
            );
        }

        if (!signer || analysis === undefined) return <></>;

        if (analysis === null) {
            return (
                <SimpleBase approval={txRequest} onComplete={onComplete}>
                    <div className="p-6">
                        {explicitError || (
                            <UnknownError
                                selectedApiEnv={selectedApiEnv}
                                errorMessage={dryRunError || 'Unknown Error'}
                                txRequest={txRequest}
                                txID={txID}
                            />
                        )}
                    </div>
                </SimpleBase>
            );
        }

        try {
            if (
                analysis.moveCalls.length === 1 &&
                analysis.balanceAdditions.length === 1 &&
                analysis.balanceReductions.length === 1 &&
                analysis.assetTransfers.length === 0
            ) {
                return (
                    <SimpleBase approval={txRequest} onComplete={onComplete}>
                        <SimpleAssetSwap
                            signer={signer}
                            addition={analysis.balanceAdditions[0]}
                            reduction={analysis.balanceReductions[0]}
                            analysis={analysis}
                            onCancel={onComplete}
                            onApprove={onApprove}
                        />
                    </SimpleBase>
                );
            } else if (
                analysis.moveCalls.length === 1 &&
                analysis.assetMints.length === 1 &&
                analysis.assetTransfers.length === 0
            ) {
                return (
                    <SimpleBase approval={txRequest} onComplete={onComplete}>
                        <SimpleAssetMint
                            signer={signer}
                            assetMint={analysis.assetMints[0]}
                            analysis={analysis}
                            onCancel={onComplete}
                            onApprove={onApprove}
                        />
                    </SimpleBase>
                );
            } else if (
                analysis.moveCalls.length === 0 &&
                analysis.assetMints.length === 0 &&
                analysis.assetTransfers.length === 1 &&
                analysis.balanceReductions.length === 0
            ) {
                return (
                    <SimpleBase approval={txRequest} onComplete={onComplete}>
                        <SimpleAssetTransfer
                            signer={signer}
                            assetTransfer={analysis.assetTransfers[0]}
                            analysis={analysis}
                            onCancel={onComplete}
                            onApprove={onApprove}
                        />
                    </SimpleBase>
                );
            } else if (
                analysis.moveCalls.length === 0 &&
                analysis.assetMints.length === 0 &&
                analysis.assetTransfers.length === 0 &&
                analysis.balanceReductions.length === 1
            ) {
                return (
                    <SimpleBase approval={txRequest} onComplete={onComplete}>
                        <SimpleCoinTransfer
                            signer={signer}
                            reduction={analysis.balanceReductions[0]}
                            analysis={analysis}
                            onCancel={onComplete}
                            onApprove={onApprove}
                        />
                    </SimpleBase>
                );
            } else {
                return (
                    <SimpleBase approval={txRequest} onComplete={onComplete}>
                        <ComplexMoveCall
                            signer={signer}
                            analysis={analysis}
                            onCancel={onComplete}
                            onApprove={onApprove}
                        />
                    </SimpleBase>
                );
            }
        } catch (e: unknown) {
            // eslint-disable-next-line no-console
            console.log('Error displaying transaction', e);
        }

        return (
            <Base
                signer={signer}
                txID={txID}
                address={address}
                txRequest={txRequest}
                objectChanges={analysis?.dryRunResponse?.objectChanges}
                effects={analysis?.dryRunResponse?.effects}
                transactionBlock={transactionBlock}
                setDone={setDone}
            />
        );
    }, [
        activeChain,
        address,
        analysis,
        dryRunError,
        explicitError,
        onApprove,
        onComplete,
        selectedApiEnv,
        signer,
        transactionBlock,
        txID,
        txRequest,
    ]);

    return (
        <Loading loading={loading} big={true} resize={true} className="py-60">
            {content}
        </Loading>
    );
}

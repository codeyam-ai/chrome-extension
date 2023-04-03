import { TransactionBlock } from '@mysten/sui.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import IncorrectChain from './errors/IncorrectChain';
import IncorrectSigner from './errors/IncorrectSigner';
import MissingObject from './errors/MissingObject';
import analyzeChanges from './lib/analyzeChanges';
import finishTransaction from './lib/finishTransaction';
import resizeWindow from './lib/resizeWindow';
import Base from './types/Base';
import ComplexMoveCall from './types/ComplexMoveCall';
import SimpleAssetMint from './types/SimpleAssetMint';
import SimpleAssetTransfer from './types/SimpleAssetTransfer';
import SimpleBase from './types/SimpleBase';
import SimpleCoinTransfer from './types/SimpleCoinTransfer';
import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { useAppSelector, useInitializedGuard } from '_hooks';
import { txRequestsSelectors } from '_redux/slices/transaction-requests';
import { thunkExtras } from '_redux/store/thunk-extras';
import { useDependencies } from '_shared/utils/dependenciesContext';

import type { AnalyzeChangesResult } from './lib/analyzeChanges';
import type { RawSigner, SuiMoveNormalizedType } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { EthosSigner } from '_src/shared/cryptography/EthosSigner';

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
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);

    const activeChain = useMemo(() => {
        switch (selectedApiEnv) {
            case 'testNet':
                return 'sui:testnet';
            // case 'mainNet':
            //     return 'sui:mainnet';
            case 'local':
                return 'sui:local';
            default:
                return 'sui:devnet';
        }
    }, [selectedApiEnv]);

    const [signer, setSigner] = useState<RawSigner | EthosSigner | undefined>();
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);

    const { txID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const txRequestsLoading = useAppSelector(
        ({ transactionRequests }) => !transactionRequests.initialized
    );
    const { activeAccountIndex, address, authentication } = useAppSelector(
        ({ account }) => account
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
        analysis === undefined;

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
        resizeWindow();
    }, [selectedApiEnv]);

    useEffect(() => {
        if (!accountInfos || accountInfos.length === 0) return;

        let signer;
        if (authentication) {
            signer = thunkExtras.api.getEthosSignerInstance(
                address || '',
                authentication
            );
        } else {
            signer = thunkExtras.api.getSignerInstance(
                thunkExtras.keypairVault.getKeyPair(activeAccountIndex),
                true
            );
        }
        setSigner(signer);
    }, [
        accountInfos,
        activeAccountIndex,
        address,
        authentication,
        selectedApiEnv,
    ]);

    useEffect(() => {
        if (
            !signer ||
            !transactionBlock ||
            !accountInfos ||
            accountInfos.length === 0
        )
            return;

        const getTransactionInfo = async () => {
            if (!accountInfos || accountInfos.length === 0) return;

            // console.log('SERIALIZED', transactionBlock.serialize());

            try {
                // console.log('ANALYZE!');
                const analysis = await analyzeChanges({
                    signer,
                    transactionBlock,
                });

                // console.log('ANALYSIS', analysis);

                setAnalysis(analysis);
            } catch (e: unknown) {
                setDryRunError(`${e}`);
                setAnalysis(null);
            }
        };

        getTransactionInfo();
    }, [
        accountInfos,
        activeAccountIndex,
        address,
        authentication,
        signer,
        transactionBlock,
        selectedApiEnv,
    ]);

    const closeWindow = useDependencies().closeWindow;

    useEffect(() => {
        if (done) {
            closeWindow();
        }
    }, [closeWindow, done]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            const options =
                txRequest?.tx && 'options' in txRequest.tx
                    ? txRequest.tx.options
                    : undefined;
            const requestType =
                txRequest?.tx && 'requestType' in txRequest.tx
                    ? txRequest.tx.requestType
                    : undefined;
            await finishTransaction(
                transactionBlock ?? null,
                txID,
                approved,
                authentication ?? null,
                address,
                activeAccountIndex,
                options,
                requestType
            );
            setDone(true);
        },
        [
            txRequest?.tx,
            transactionBlock,
            txID,
            authentication,
            address,
            activeAccountIndex,
            setDone,
        ]
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
                <SimpleBase onComplete={onComplete}>
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
            txRequest.tx.chain !== activeChain
        ) {
            return (
                <SimpleBase onComplete={onComplete}>
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
                <SimpleBase onComplete={onComplete}>
                    <MissingObject
                        selectedApiEnv={selectedApiEnv}
                        errorMessage={dryRunError || 'Unknown Error'}
                        txRequest={txRequest}
                        txID={txID}
                    />
                </SimpleBase>
            );
        }

        try {
            if (
                analysis.assetMints.length === 1 &&
                analysis.assetTransfers.length === 0
            ) {
                return (
                    <SimpleBase onComplete={onComplete}>
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
                analysis.assetMints.length === 0 &&
                analysis.assetTransfers.length === 1 &&
                analysis.balanceReductions.length === 0
            ) {
                return (
                    <SimpleBase onComplete={onComplete}>
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
                analysis.assetMints.length === 0 &&
                analysis.assetTransfers.length === 0 &&
                analysis.balanceReductions.length === 1
            ) {
                return (
                    <SimpleBase onComplete={onComplete}>
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
                    <SimpleBase onComplete={onComplete}>
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
                txID={txID}
                address={address}
                txRequest={txRequest}
                objectChanges={analysis?.dryRunResponse?.objectChanges}
                effects={analysis?.dryRunResponse?.effects}
                authentication={authentication ?? null}
                activeAccountIndex={activeAccountIndex}
                transactionBlock={transactionBlock}
                setDone={setDone}
            />
        );
    }, [
        activeAccountIndex,
        activeChain,
        address,
        analysis,
        authentication,
        onApprove,
        onComplete,
        selectedApiEnv,
        signer,
        transactionBlock,
        txID,
        txRequest,
        dryRunError,
    ]);

    return (
        <Loading loading={loading} big={true} resize={true}>
            {content}
        </Loading>
    );
}

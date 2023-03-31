import { TransactionBlock } from '@mysten/sui.js';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import analyzeChanges from './lib/analyzeChanges';
import Base from './types/Base';
import { AppState } from '../../hooks/useInitializedGuard';
import Loading from '_components/loading';
import { useAppSelector, useInitializedGuard } from '_hooks';
import { txRequestsSelectors } from '_redux/slices/transaction-requests';
import { thunkExtras } from '_redux/store/thunk-extras';
import { useDependencies } from '_shared/utils/dependenciesContext';

import type {
    SuiMoveNormalizedType,
    SuiObjectChange,
    TransactionEffects,
} from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';

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
    // const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);
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

    const [done, setDone] = useState<boolean>(false);

    // const normalizedFunction = useNormalizedFunction(txRequest);

    const [effects, setEffects] = useState<
        TransactionEffects | undefined | null
    >();
    const [objectChanges, setObjectChanges] = useState<
        SuiObjectChange[] | undefined | null
    >();

    const loading =
        guardLoading ||
        txRequestsLoading ||
        !txRequest ||
        !address ||
        effects === undefined;

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
        if (!transactionBlock || !accountInfos || accountInfos.length === 0)
            return;

        const getTransactionInfo = async () => {
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

            try {
                const { effects, objectChanges } = await analyzeChanges({
                    signer,
                    transactionBlock,
                });

                setEffects(effects);
                setObjectChanges(objectChanges);
            } catch (e: unknown) {
                // setDryRunError(`${e}`);
                setEffects(null);
            }
        };

        getTransactionInfo();
    }, [
        accountInfos,
        activeAccountIndex,
        address,
        authentication,
        transactionBlock,
    ]);

    const closeWindow = useDependencies().closeWindow;

    useEffect(() => {
        if (done) {
            closeWindow();
        }
    }, [closeWindow, done]);

    const content = useMemo(() => {
        return (
            <Base
                txID={txID}
                address={address}
                txRequest={txRequest}
                objectChanges={objectChanges}
                effects={effects}
                authentication={authentication ?? null}
                activeAccountIndex={activeAccountIndex}
                transactionBlock={transactionBlock}
                setDone={setDone}
            />
        );
    }, [
        activeAccountIndex,
        address,
        authentication,
        effects,
        objectChanges,
        transactionBlock,
        txID,
        txRequest,
    ]);

    return (
        <Loading loading={loading} big={true} resize={true}>
            {content}
        </Loading>
    );
}

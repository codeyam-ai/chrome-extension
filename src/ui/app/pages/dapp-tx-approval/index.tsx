// import { fromB64 } from '@mysten/bcs';
import {
    // getTransactionEffects,
    SUI_TYPE_ARG,
    TransactionBlock,
} from '@mysten/sui.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import CopyAsset from './CopyAsset';
import FormattedCoin from './FormattedCoin';
import SectionElement from './SectionElement';
import TabElement from './TabElement';
import IncorrectSigner from './errors/IncorrectSigner';
// import MissingObject from './errors/MissingObject';
// import NotEnoughGas from './errors/NotEnoughGas';
import {
    // isErrorCausedByIncorrectSigner,
    // isErrorCausedByMissingObject,
    // isErrorCausedByUserNotHavingEnoughSuiToPayForGas,
    isErrorObjectVersionUnavailable,
    useCategorizedEvents,
    useCustomSummary,
    // useNormalizedFunction,
} from './lib';
// import { getGasDataFromError } from './lib/extractGasData';
import * as summaries from './summaries';
import truncateMiddle from '../../helpers/truncate-middle';
import { AppState } from '../../hooks/useInitializedGuard';
import Alert from '../../shared/feedback/Alert';
import AlertWithErrorExpand from '../../shared/feedback/AlertWithErrorExpand';
import Body from '../../shared/typography/Body';
import CopyBody from '../../shared/typography/CopyBody';
import EthosLink from '../../shared/typography/EthosLink';
import Loading from '_components/loading';
import { useAppSelector, useFormatCoin, useInitializedGuard } from '_hooks';
import { txRequestsSelectors } from '_redux/slices/transaction-requests';
import { thunkExtras } from '_redux/store/thunk-extras';
import { useDependencies } from '_shared/utils/dependenciesContext';
import { MAILTO_SUPPORT_URL } from '_src/shared/constants';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';

import type { Detail } from './DetailElement';
import type { Section } from './SectionElement';
import type { SmallDetail } from './SmallValue';
import type {
    SuiMoveNormalizedType,
    SuiObjectChange,
    SuiTransactionBlockResponse,
    TransactionEffects,
    TransactionEvents,
} from '@mysten/sui.js';
// import type { ApprovalRequest } from '_payloads/transactions';
import type { SuiSignAndExecuteTransactionBlockInput } from '@mysten/wallet-standard';
import type { RootState } from '_redux/RootReducer';
import type { ReactElement, ReactNode } from 'react';
import Base from './types/Base';
import finishTransaction from './lib/finishTransaction';

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

    const summaryKey = useCustomSummary(txRequest);

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
                const x = await signer.dryRunTransactionBlock({
                    transactionBlock,
                });
                console.log('x', x);

                const { effects, objectChanges, balanceChanges } = x;
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

    return (
        <Loading loading={loading} big={true} resize={true}>
            {txID &&
                address &&
                txRequest &&
                objectChanges &&
                effects &&
                transactionBlock && (
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
                )}
        </Loading>
    );
}

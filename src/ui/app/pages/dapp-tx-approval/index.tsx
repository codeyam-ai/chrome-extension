// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import AccountAddress from '../../components/account-address';
import { AddressMode } from '../../components/account-address/index';
import truncateMiddle from '../../helpers/truncate-middle';
import { AppState } from '../../hooks/useInitializedGuard';
import { saveActiveAccountIndex } from '../../redux/slices/account/index';
import { GAS_TYPE_ARG } from '../../redux/slices/sui-objects/Coin';
import Button from '../../shared/buttons/Button';
import Alert from '../../shared/feedback/Alert';
import AlertWithErrorExpand from '../../shared/feedback/AlertWithErrorExpand';
import Body from '../../shared/typography/Body';
import CopyBody from '../../shared/typography/CopyBody';
import EthosLink from '../../shared/typography/EthosLink';
import CopyAsset from './CopyAsset';
import FormattedCoin from './FormattedCoin';
import SectionElement from './SectionElement';
import TabElement from './TabElement';
import {
    isErrorCausedByIncorrectSigner,
    isErrorCausedByMissingObject,
    isErrorCausedByUserNotHavingEnoughSuiToPayForGas,
    isErrorObjectVersionUnavailable,
    useCategorizedEffects,
    useCustomSummary,
    useNormalizedFunction,
} from './lib';
import { getGasDataFromError } from './lib/extractGasData';
import getErrorDisplaySuiForMist from './lib/getErrorDisplaySuiForMist';
import * as summaries from './summaries';
import Loading from '_components/loading';
import {
    useAppDispatch,
    useAppSelector,
    useFormatCoin,
    useInitializedGuard,
} from '_hooks';
import {
    respondToTransactionRequest,
    txRequestsSelectors,
} from '_redux/slices/transaction-requests';
import { thunkExtras } from '_redux/store/thunk-extras';
import { useDependencies } from '_shared/utils/dependenciesContext';
import { MAILTO_SUPPORT_URL } from '_src/shared/constants';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';

import type { AccountInfo } from '../../KeypairVault';
import type { Detail } from './DetailElement';
import type { Section } from './SectionElement';
import type { SmallDetail } from './SmallValue';
import type { SuiMoveNormalizedType, TransactionEffects } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { ReactElement, ReactNode } from 'react';

export enum TxApprovalTab {
    SUMMARY = 'Summary',
    ASSETS = 'Assets',
    DETAILS = 'Details',
}

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

export type TabSections = {
    [key in TxApprovalTab]?: (Section | ReactElement)[];
};

export function DappTxApprovalPage() {
    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);

    const [tab, setTab] = useState(TxApprovalTab.SUMMARY);

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
    const dispatch = useAppDispatch();

    const normalizedFunction = useNormalizedFunction(txRequest);

    const [effects, setEffects] = useState<
        TransactionEffects | undefined | null
    >();
    const [dryRunError, setDryRunError] = useState<string | undefined>();
    const [explicitError, setExplicitError] = useState<ReactNode | undefined>();
    const [incorrectSigner, setIncorrectSigner] = useState<
        AccountInfo | undefined
    >();

    const loading =
        guardLoading ||
        txRequestsLoading ||
        (effects === undefined &&
            !dryRunError &&
            !explicitError &&
            !incorrectSigner);

    const summaryKey = useCustomSummary(txRequest);

    const gasUsed = effects?.gasUsed;
    const gas = gasUsed
        ? gasUsed.computationCost +
        (gasUsed.storageCost - gasUsed.storageRebate)
        : null;

    const { reading, mutating, creating, deleting, transferring, coinChanges } =
        useCategorizedEffects({ normalizedFunction, effects, address });

    const charges = useMemo(
        () => (coinChanges[GAS_TYPE_ARG] || 0) - (gas || 0),
        [coinChanges, gas]
    );
    const [formattedCharges, chargesSymbol, chargeDollars] = useFormatCoin(
        charges,
        GAS_TYPE_ARG
    );
    const [formattedGas, gasSymbol, gasDollars] = useFormatCoin(
        gas,
        GAS_TYPE_ARG
    );
    const [formattedTotal, totalSymbol, totalDollars] = useFormatCoin(
        coinChanges[GAS_TYPE_ARG],
        GAS_TYPE_ARG
    );

    useEffect(() => {
        window.onresize = () => {
            const content = document.getElementById('content');

            if (!content) return;

            content.style.height = 'auto';
            const contentHeight = content.offsetHeight;
            content.style.height = `${contentHeight}px`;
        };
    }, []);

    const transaction = txRequest?.tx;
    useEffect(() => {
        if (!accountInfos || accountInfos.length === 0) return;

        const getEffects = async () => {
            try {
                if (!transaction || transaction.type === 'move-call') {
                    setEffects(null);
                    return;
                }

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

                setDryRunError(undefined);
                setExplicitError(undefined);
                setIncorrectSigner(undefined);

                const { effects: transactionEffects } =
                    await signer.devInspectTransaction(transaction.data);

                if (transactionEffects.status.status === 'failure') {
                    if (
                        transactionEffects?.status?.error?.includes(
                            'quorum of validators'
                        )
                    ) {
                        setDryRunError(
                            'Sui Devnet is having technical issues. Please checkback later when these issues are resolved.'
                        );
                    } else {
                        setDryRunError(transactionEffects.status.error);
                    }
                } else {
                    setEffects(transactionEffects);
                }
            } catch (e) {
                const errorMessage = (e as Error).message;

                if (errorMessage === 'Account mnemonic is not set') {
                    // this is expected; it happens the first time we render because the redux state is not in good
                    // shape yet. we basically ingore it and expect the next re-render to work.
                    // TODO: this seems weird - it would be good to find a better way.
                } else {
                    if (isErrorCausedByIncorrectSigner(errorMessage)) {
                        const address = errorMessage
                            .match(
                                /is owned by account address (.*), but signer address is/
                            )?.[1]
                            .split(',')[0];
                        const accountInfo = accountInfos.find(
                            (account) => account.address === address
                        );
                        if (accountInfo) {
                            setIncorrectSigner(accountInfo);
                        } else {
                            setDryRunError(
                                'You are trying to sign this transaction with the wrong wallet address.'
                            );
                        }
                    } else if (isErrorCausedByMissingObject(errorMessage)) {
                        setExplicitError(
                            <div className="flex flex-col gap-6">
                                <AlertWithErrorExpand
                                    title="Missing Object or Contract"
                                    body={
                                        <Body>
                                            An object or the contract this
                                            transaction references does not
                                            exist on {selectedApiEnv}. Please
                                            ensure you are on the correct
                                            network or contact the creator of
                                            this app to report this error.
                                        </Body>
                                    }
                                    fullErrorText={errorMessage}
                                    txInfo={{
                                        dAppUrl: txRequest?.origin || '',
                                        txId: txID || '',
                                    }}
                                />
                            </div>
                        );
                    } else if (
                        isErrorCausedByUserNotHavingEnoughSuiToPayForGas(
                            errorMessage
                        )
                    ) {
                        const gasData = getGasDataFromError(errorMessage);
                        if (gasData) {
                            setExplicitError(
                                <div className="flex flex-col gap-6">
                                    <AlertWithErrorExpand
                                        title="You don't have enough SUI"
                                        body={
                                            <Body>
                                                It looks like your wallet
                                                doesn&apos;t have enough SUI to
                                                pay for the gas for this
                                                transaction. Gas required:{' '}
                                                {getErrorDisplaySuiForMist(
                                                    gasData.gasBudget
                                                )}{' '}
                                                SUI
                                            </Body>
                                        }
                                        fullErrorText={errorMessage}
                                        txInfo={{
                                            dAppUrl: txRequest?.origin || '',
                                            txId: txID || '',
                                        }}
                                    />
                                </div>
                            );
                        } else {
                            setExplicitError(
                                <div className="flex flex-col gap-6">
                                    <AlertWithErrorExpand
                                        title="You don't have enough SUI"
                                        body={
                                            <Body>
                                                It looks like your wallet
                                                doesn&apos;t have enough SUI to
                                                pay for the gas for this
                                                transaction.
                                            </Body>
                                        }
                                        fullErrorText={errorMessage}
                                        txInfo={{
                                            dAppUrl: txRequest?.origin || '',
                                            txId: txID || '',
                                        }}
                                    />
                                </div>
                            );
                        }
                    } else if (isErrorObjectVersionUnavailable(errorMessage)) {
                        setExplicitError(
                            <div className="flex flex-col gap-6">
                                <AlertWithErrorExpand
                                    title="Object or Coin In Use"
                                    body={
                                        <Body>
                                            One of the objects or coins in this
                                            transaction is already in use.
                                            Please wait a moment and try again.
                                        </Body>
                                    }
                                    fullErrorText={errorMessage}
                                    txInfo={{
                                        dAppUrl: txRequest?.origin || '',
                                        txId: txID || '',
                                    }}
                                />
                            </div>
                        );
                    } else {
                        setDryRunError(errorMessage);
                    }
                }
            }
        };

        getEffects();
    }, [
        transaction,
        activeAccountIndex,
        address,
        authentication,
        accountInfos,
        selectedApiEnv,
        txID,
        txRequest?.origin
    ]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (txRequest) {
                await dispatch(
                    respondToTransactionRequest({
                        approved,
                        txRequestID: txRequest.id,
                    })
                );
            }
        },
        [dispatch, txRequest]
    );

    const closeWindow = useDependencies().closeWindow;

    useEffect(() => {
        const finished =
            !txRequest || (txRequest && txRequest.approved !== null);
        if (!loading && finished) {
            closeWindow();
        }
    }, [loading, txRequest, closeWindow]);

    const content: TabSections = useMemo(() => {
        const txInfo = txRequest?.tx.data;

        const data = {
            address,
            txInfo,
            reading,
            mutating,
            creating,
            transferring,
            deleting,
            coinChanges,
            formattedCharges,
            chargesSymbol,
            chargeDollars,
            formattedGas,
            gasSymbol,
            gasDollars,
            formattedTotal,
            totalSymbol,
            totalDollars,
        };

        let summary;
        switch (summaryKey) {
            case 'redeem-ticket':
                summary = [
                    <summaries.RedeemTicket
                        key="redeem-ticket-summary"
                        {...data}
                    />,
                ];
                break;
            case 'capy-vote':
                summary = [
                    <summaries.CapyVote key="capy-vote-summary" {...data} />,
                ];
                break;
            case 'capy-nominate':
                summary = [
                    <summaries.CapyNominate
                        key="capy-nominate-summary"
                        {...data}
                    />,
                ];
                break;
            default:
                summary = summaries.standard(data);
        }

        const anyPermissionsRequested =
            reading.length > 0 ||
            mutating.length > 0 ||
            transferring.length > 0 ||
            deleting.length > 0 ||
            Object.keys(coinChanges).length > 0;

        const anyAssetEffects =
            creating.length > 0 ||
            mutating.length > 0 ||
            transferring.length > 0 ||
            deleting.length > 0 ||
            Object.keys(coinChanges).length > 0;

        const assets = [
            {
                title: 'Permissions Requested',
                subtitle: anyPermissionsRequested
                    ? 'This transaction has requested access to your assets:'
                    : null,
                details: anyPermissionsRequested
                    ? [
                        {
                            label: 'Reading',
                            content: `${reading.length} Assets`,
                            detail: reading.map((r, i) => (
                                <CopyAsset key={`reading-${i}`} {...r} />
                            )),
                        },
                        {
                            label: 'Modifying',
                            content: `${mutating.length} Assets`,
                            detail: mutating.map((m, i) => (
                                <CopyAsset key={`modifying-${i}`} {...m} />
                            )),
                        },
                        {
                            label: 'Transferring',
                            content: `${transferring.length} Assets`,
                            detail: transferring.map((t, i) => (
                                <CopyAsset key={`transferring-${i}`} {...t} />
                            )),
                        },
                        {
                            label: 'Full Access',
                            content: `${deleting.length} Assets`,
                            detail: deleting.map((d, i) => (
                                <CopyBody
                                    key={`deleting-${i}`}
                                    txt={d?.name || ''}
                                >
                                    {truncateMiddle(d?.name)}
                                </CopyBody>
                            )),
                        },
                        {
                            label: 'Coins',
                            content: `${Object.keys(coinChanges).length
                                } Coins`,
                            detail: Object.keys(coinChanges).map(
                                (c, index) => (
                                    <div
                                        key={`coin-detail-${index}`}
                                        className="text-xs"
                                    >
                                        <CopyBody
                                            key={`coins-${index}`}
                                            txt={c}
                                        >
                                            {truncateMiddle(c, 15)}
                                        </CopyBody>
                                    </div>
                                )
                            ),
                        },
                    ]
                    : [
                        {
                            label: 'No access requested.',
                        },
                    ],
            } as Section,
            {
                title: 'Asset Effects',
                subtitle: anyAssetEffects
                    ? 'This transaction have the following effects on your assets (including creating new assets):'
                    : null,
                details: anyAssetEffects
                    ? [
                        {
                            label: 'Creating',
                            content: `${creating.length} Assets`,
                            detail: creating.map((c, i) => (
                                <CopyAsset
                                    key={`asset-creating-${i}`}
                                    {...c}
                                />
                            )),
                        },
                        {
                            label: 'Modifying',
                            content: `${mutating.length} Assets`,
                            detail: mutating.map((m, i) => (
                                <CopyAsset
                                    key={`asset-modifying-${i}`}
                                    {...m}
                                />
                            )),
                        },
                        {
                            label: 'Transferring',
                            content: `${transferring.length} Assets`,
                            detail: transferring.map((t, i) => (
                                <CopyAsset
                                    key={`asset-transferring-${i}`}
                                    {...t}
                                />
                            )),
                        },
                        {
                            label: 'Deleting',
                            content: `${deleting.length} Assets`,
                            detail: deleting.map((d, i) => (
                                <CopyBody
                                    key={`asset-deleting-${i}`}
                                    txt={d?.name || ''}
                                >
                                    {truncateMiddle(d?.name)}
                                </CopyBody>
                            )),
                        },
                        {
                            label: 'Balances',
                            content: `${Object.keys(coinChanges).length
                                } Coins`,
                            detail: Object.keys(coinChanges).map(
                                (c, index) => (
                                    <FormattedCoin
                                        key={`coin-detail-${index}`}
                                        type={c}
                                        amount={coinChanges[c] * -1}
                                    />
                                )
                            ),
                        },
                    ]
                    : [
                        {
                            label: 'No effects on any of your assets.',
                        },
                    ],
            } as Section,
        ];

        const transactionDetails = {
            title: 'Transaction',
            details: [] as Detail[],
        };

        const details = [];

        if (txInfo && typeof txInfo !== 'string' && 'kind' in txInfo) {
            if (txInfo.kind === 'bytes') {
                details.push({
                    title: 'Transaction',
                    details: [
                        {
                            label: 'Bytes',
                            content: {
                                type: 'small',
                                content: txInfo.data.toLocaleString(),
                            } as SmallDetail,
                        },
                    ],
                } as Section);
            } else {
                const parsedData = JSON.parse(JSON.stringify(txInfo.data));
                for (const attribute of [
                    'packageObjectId',
                    'module',
                    'function',
                    'arguments',
                    'gasBudget',
                    'gasPayment',
                ]) {
                    if (attribute in txInfo.data) {
                        transactionDetails.details.push({
                            label: attribute,
                            content: {
                                type: 'small',
                                content: parsedData[attribute],
                                coinType: ['gasBudget', 'gasPayment'].includes(
                                    attribute
                                )
                                    ? GAS_TYPE_ARG
                                    : null,
                            } as SmallDetail,
                        });
                    }
                }
            }
        }

        details.push(transactionDetails);

        details.push({
            title: 'Gas',
            details: [
                {
                    label: 'Computation',
                    content: {
                        type: 'small',
                        content: gasUsed?.computationCost || '---',
                        coinType: GAS_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    label: 'Storage Cost',
                    content: {
                        type: 'small',
                        content: gasUsed?.storageCost || '---',
                        coinType: GAS_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    label: 'Storage Rebate',
                    content: {
                        type: 'small',
                        content: gasUsed?.storageRebate || '---',
                        coinType: GAS_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    break: true,
                },
                {
                    label: 'Total',
                    content: {
                        type: 'small',
                        content: gas,
                        coinType: GAS_TYPE_ARG,
                    } as SmallDetail,
                },
            ],
        });

        return {
            [TxApprovalTab.SUMMARY]: summary,
            [TxApprovalTab.ASSETS]: assets,
            [TxApprovalTab.DETAILS]: details,
        };
    }, [
        txRequest?.tx,
        formattedCharges,
        chargesSymbol,
        chargeDollars,
        formattedGas,
        gasSymbol,
        gasDollars,
        formattedTotal,
        totalSymbol,
        totalDollars,
        reading,
        creating,
        mutating,
        deleting,
        transferring,
        gas,
        gasUsed,
        coinChanges,
        address,
        summaryKey,
    ]);

    const switchSigner = useCallback(async () => {
        setIncorrectSigner(undefined);
        const index = accountInfos.findIndex(
            (accountInfo) => accountInfo === incorrectSigner
        );
        await dispatch(saveActiveAccountIndex(index));
    }, [dispatch, accountInfos, incorrectSigner]);

    const errorElement = useMemo(() => {
        if (explicitError)
            return <div className="px-6 pb-6">{explicitError}</div>;

        if (incorrectSigner)
            return (
                <div className="px-6 pb-6 flex flex-col gap-6 items-start justify-start">
                    <Alert
                        title="Wrong Wallet Address"
                        subtitle={
                            <Body as="div" className="flex flex-col gap-6 py-6">
                                <div>
                                    This transaction request needs to be signed
                                    with the wallet address:
                                </div>
                                <div className="flex gap-2 items-center">
                                    {incorrectSigner.color && (
                                        <WalletColorAndEmojiCircle
                                            {...incorrectSigner}
                                            circleSizeClasses="h-6 w-6 "
                                            emojiSizeInPx={12}
                                        />
                                    )}
                                    {incorrectSigner.name && (
                                        <div>{incorrectSigner.name}</div>
                                    )}
                                    <AccountAddress
                                        showName={false}
                                        showLink={false}
                                        mode={AddressMode.FADED}
                                    />
                                </div>
                                <div>
                                    Would you like to switch to this wallet
                                    address?
                                </div>
                                <Button
                                    buttonStyle="primary"
                                    onClick={switchSigner}
                                    removeContainerPadding={true}
                                >
                                    Switch
                                </Button>
                            </Body>
                        }
                    />
                </div>
            );

        if (dryRunError)
            return (
                <div className="px-6 pb-6 flex flex-col gap-6">
                    <AlertWithErrorExpand
                        title="Dry run error"
                        body={
                            <Body>
                                Your transaction couldn&apos;t be estimated.
                                Please try again later. If this issue persists,{' '}
                                <EthosLink
                                    type="external"
                                    to={MAILTO_SUPPORT_URL}
                                >
                                    contact Ethos
                                </EthosLink>
                                .
                            </Body>
                        }
                        fullErrorText={dryRunError}
                        txInfo={{
                            dAppUrl: txRequest?.origin || '',
                            txId: txID || '',
                        }}
                    />
                </div>
            );
    }, [incorrectSigner, explicitError, dryRunError, switchSigner, txID, txRequest?.origin]);

    return (
        <Loading loading={loading} big={true} resize={true}>
            {txRequest ? (
                <UserApproveContainer
                    title="Transaction Request"
                    origin={txRequest.origin}
                    originFavIcon={txRequest.originFavIcon}
                    approveTitle="Approve"
                    rejectTitle="Reject"
                    onSubmit={handleOnSubmit}
                    hasError={
                        !!dryRunError || !!explicitError || !!incorrectSigner
                    }
                    hideHeader={summaryKey !== 'standard'}
                >
                    {errorElement ? (
                        errorElement
                    ) : (
                        <div className="flex flex-col gap-6 pb-6">
                            <div className="flex flex-row gap-2 justify-between items-baseline px-6">
                                {[
                                    TxApprovalTab.SUMMARY,
                                    TxApprovalTab.ASSETS,
                                    TxApprovalTab.DETAILS,
                                ]
                                    .filter((t) => content[t])
                                    .map((t, index) => (
                                        <TabElement
                                            key={`tab-${index}`}
                                            type={t}
                                            isSelected={t === tab}
                                            setTab={setTab}
                                        />
                                    ))}
                            </div>

                            <div
                                id="content"
                                className="flex flex-col gap-6 w-full px-6 overflow-auto"
                            >
                                {(content[tab] || []).map(
                                    (section, sectionIndex) => (
                                        <SectionElement
                                            key={`section-${sectionIndex}`}
                                            section={section}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

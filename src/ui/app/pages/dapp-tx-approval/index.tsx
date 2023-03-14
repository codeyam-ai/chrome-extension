// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { fromB64 } from '@mysten/bcs';
import {
    getTransactionEffects,
    SUI_TYPE_ARG,
    Transaction,
} from '@mysten/sui.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import CopyAsset from './CopyAsset';
import FormattedCoin from './FormattedCoin';
import SectionElement from './SectionElement';
import TabElement from './TabElement';
import IncorrectSigner from './errors/IncorrectSigner';
import MissingObject from './errors/MissingObject';
import NotEnoughGas from './errors/NotEnoughGas';
import {
    isErrorCausedByIncorrectSigner,
    isErrorCausedByMissingObject,
    isErrorCausedByUserNotHavingEnoughSuiToPayForGas,
    isErrorObjectVersionUnavailable,
    useCategorizedEvents,
    useCustomSummary,
    useNormalizedFunction,
} from './lib';
import { getGasDataFromError } from './lib/extractGasData';
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
    SuiTransactionResponse,
    TransactionEffects,
    TransactionEvents,
} from '@mysten/sui.js';
import type { ApprovalRequest } from '_payloads/transactions';
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
    const signableTransaction = useMemo(() => {
        if (!txRequest || !('data' in txRequest.tx) ) return null;
        return Transaction.from(txRequest.tx.data);
    }, [txRequest]);

    const [done, setDone] = useState<boolean>(false);

    const normalizedFunction = useNormalizedFunction(txRequest);

    const [effects, setEffects] = useState<
        TransactionEffects | undefined | null
    >();
    const [events, setEvents] = useState<
        TransactionEvents | undefined | null
    >();
    const [dryRunError, setDryRunError] = useState<string | undefined>();
    const [explicitError, setExplicitError] = useState<ReactNode | undefined>();

    const loading =
        guardLoading ||
        txRequestsLoading ||
        (events === undefined && !dryRunError && !explicitError);

    const summaryKey = useCustomSummary(txRequest);

    const gasUsed = effects?.gasUsed;
    const gas = gasUsed
        ? gasUsed.computationCost +
          (gasUsed.storageCost - gasUsed.storageRebate)
        : null;

    const { reading, mutating, creating, deleting, transferring, coinChanges } =
        useCategorizedEvents({ normalizedFunction, events, address });

    const charges = useMemo(
        () => (coinChanges[SUI_TYPE_ARG] || 0) - (gas || 0),
        [coinChanges, gas]
    );
    const [formattedCharges, chargesSymbol, chargeDollars] = useFormatCoin(
        charges,
        SUI_TYPE_ARG
    );
    const [formattedGas, gasSymbol, gasDollars] = useFormatCoin(
        gas,
        SUI_TYPE_ARG
    );
    const [formattedTotal, totalSymbol, totalDollars] = useFormatCoin(
        coinChanges[SUI_TYPE_ARG],
        SUI_TYPE_ARG
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

    useEffect(() => {
        if (!signableTransaction || !accountInfos || accountInfos.length === 0)
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

            setDryRunError(undefined);
            setExplicitError(undefined);

            const { effects: transactionEffects, events: transactionEvents } =
                await signer.dryRunTransaction({
                    transaction: signableTransaction,
                });
            if (transactionEffects.status.status === 'failure') {
                if (
                    transactionEffects?.status?.error?.includes(
                        'quorum of validators'
                    )
                ) {
                    setDryRunError(
                        'Sui Devnet is having technical issues. Please check back later when these issues are resolved.'
                    );
                } else if (
                    isErrorObjectVersionUnavailable(
                        transactionEffects?.status?.error || ''
                    )
                ) {
                    setExplicitError(
                        <div className="flex flex-col gap-6">
                            <Alert
                                title="Object or Coin In Use"
                                subtitle="One of the objects or coins in this transaction is already in use. Please wait a moment and try again.    "
                            />
                            <Alert
                                title="Error Details"
                                subtitle={transactionEffects?.status?.error}
                            />
                        </div>
                    );
                } else {
                    setDryRunError(transactionEffects.status.error);
                }
            } else if (
                typeof transactionEffects.gasObject.owner === 'object' &&
                'AddressOwner' in transactionEffects.gasObject.owner &&
                transactionEffects.gasObject.owner.AddressOwner !== address
            ) {
                const gasAddress =
                    transactionEffects.gasObject.owner.AddressOwner;

                if (gasAddress !== address) {
                    setExplicitError(
                        <IncorrectSigner correctAddress={gasAddress} />
                    );
                } else {
                    setEvents(transactionEvents);
                    setEffects(transactionEffects);
                }
            } else {
                setEvents(transactionEvents);
                setEffects(transactionEffects);
            }
        };

        getTransactionInfo();
    }, [
        signableTransaction,
        activeAccountIndex,
        address,
        authentication,
        accountInfos,
        selectedApiEnv,
        txID,
        txRequest?.origin,
        txRequest,
    ]);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            await finishTransaction(
                signableTransaction,
                txID,
                approved,
                authentication,
                address,
                activeAccountIndex
            );
            setDone(true);
        },
        [signableTransaction, txID, authentication, address, activeAccountIndex]
    );

    const closeWindow = useDependencies().closeWindow;

    useEffect(() => {
        if (done) {
            closeWindow();
        }
    }, [closeWindow, done]);

    const content: TabSections = useMemo(() => {
        // const transaction = Transaction.from(txRequest?.tx.data);
        const transaction: Transaction = new Transaction();

        const data = {
            address,
            transaction,
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
                          //   {
                          //       label: 'Modifying',
                          //       content: `${mutating.length} Assets`,
                          //       detail: mutating.map((m, i) => (
                          //           <CopyAsset key={`modifying-${i}`} {...m} />
                          //       )),
                          //   },
                          //   {
                          //       label: 'Transferring',
                          //       content: `${transferring.length} Assets`,
                          //       detail: transferring.map((t, i) => (
                          //           <CopyAsset key={`transferring-${i}`} {...t} />
                          //       )),
                          //   },
                          //   {
                          //       label: 'Full Access',
                          //       content: `${deleting.length} Assets`,
                          //       detail: deleting.map((d, i) => (
                          //           <CopyBody
                          //               key={`deleting-${i}`}
                          //               txt={d?.name || ''}
                          //           >
                          //               {truncateMiddle(d?.name)}
                          //           </CopyBody>
                          //       )),
                          //   },
                          {
                              label: 'Coins',
                              content: `${
                                  Object.keys(coinChanges).length
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
                          // {
                          //     label: 'Creating',
                          //     content: `${creating.length} Assets`,
                          //     detail: creating.map((c, i) => (
                          //         <CopyAsset
                          //             key={`asset-creating-${i}`}
                          //             {...c}
                          //         />
                          //     )),
                          // },
                          // {
                          //     label: 'Modifying',
                          //     content: `${mutating.length} Assets`,
                          //     detail: mutating.map((m, i) => (
                          //         <CopyAsset
                          //             key={`asset-modifying-${i}`}
                          //             {...m}
                          //         />
                          //     )),
                          // },
                          // {
                          //     label: 'Transferring',
                          //     content: `${transferring.length} Assets`,
                          //     detail: transferring.map((t, i) => (
                          //         <CopyAsset
                          //             key={`asset-transferring-${i}`}
                          //             {...t}
                          //         />
                          //     )),
                          // },
                          // {
                          //     label: 'Deleting',
                          //     content: `${deleting.length} Assets`,
                          //     detail: deleting.map((d, i) => (
                          //         <CopyBody
                          //             key={`asset-deleting-${i}`}
                          //             txt={d?.name || ''}
                          //         >
                          //             {truncateMiddle(d?.name)}
                          //         </CopyBody>
                          //     )),
                          // },
                          {
                              label: 'Balances',
                              content: `${
                                  Object.keys(coinChanges).length
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

        if (transaction?.transactionData) {
            if (transaction.transactionData.gasConfig.budget) {
                transactionDetails.details.push({
                    label: 'Gas Budget',
                    content: {
                        type: 'small',
                        content: transaction.transactionData.gasConfig.budget,
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                });
                // } else if (transaction.transactionData.commands.)
                // for (const attribute of [
                //     'packageObjectId',
                //     'module',
                //     'function',
                //     'arguments',
                //     'gasBudget',
                //     'gasPayment',
                // ]) {
                //     if (attribute in txInfo.data) {
                //         transactionDetails.details.push({
                //             label: attribute,
                //             content: {
                //                 type: 'small',
                //                 content: parsedData[attribute],
                //                 coinType: ['gasBudget'].includes(attribute)
                //                     ? SUI_TYPE_ARG
                //                     : null,
                //             } as SmallDetail,
                //         });
                //     }
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
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    label: 'Storage Cost',
                    content: {
                        type: 'small',
                        content: gasUsed?.storageCost || '---',
                        coinType: SUI_TYPE_ARG,
                    } as SmallDetail,
                },
                {
                    label: 'Storage Rebate',
                    content: {
                        type: 'small',
                        content: gasUsed?.storageRebate || '---',
                        coinType: SUI_TYPE_ARG,
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
                        coinType: SUI_TYPE_ARG,
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

    const errorElement = useMemo(() => {
        if (explicitError)
            return <div className="px-6 pb-6">{explicitError}</div>;

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
                            txRequest,
                        }}
                    />
                </div>
            );
    }, [explicitError, dryRunError, txRequest, txID]);

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
                    hasError={!!dryRunError || !!explicitError}
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

async function finishTransaction(
    transaction: Transaction | null,
    txID: string | undefined,
    approved: boolean,
    authentication: string | null,
    address: string | null,
    activeAccountIndex: number
) {
    if (!transaction) {
        // TODO: delete? doesn't seem like we got have gotten this far without txRequest
        throw new Error(`Transaction ${txID} not found`);
    }

    let txResult: SuiTransactionResponse | undefined = undefined;
    let tsResultError: string | undefined;
    if (approved) {
        let signer;
        if (authentication) {
            signer = thunkExtras.api.getEthosSignerInstance(
                address || '',
                authentication
            );
        } else {
            signer = thunkExtras.api.getSignerInstance(
                thunkExtras.keypairVault.getKeyPair(activeAccountIndex)
            );
        }

        try {
            txResult = await signer.signAndExecuteTransaction({ transaction });
        } catch (e) {
            tsResultError = (e as Error).message;
        }
    }

    thunkExtras.background.sendTransactionRequestResponse(
        // TODO: find a way to ensure txID can't be null. none of this page would work if it was!
        txID || '',
        approved,
        txResult,
        tsResultError
    );
}

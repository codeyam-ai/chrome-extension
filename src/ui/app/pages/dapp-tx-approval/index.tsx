// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import truncateMiddle from '../../helpers/truncate-middle';
import { AppState } from '../../hooks/useInitializedGuard';
import SectionElement from './SectionElement';
import TabElement from './TabElement';
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
import UserApproveContainer from '_src/ui/app/components/user-approve-container';

import type { Detail } from './DetailElement';
import type { NumberedDetail } from './NumberedValue';
import type { Section } from './SectionElement';
import type { SmallDetail } from './SmallValue';
import type {
    SuiMoveNormalizedFunction,
    TransactionEffects,
} from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';

export enum TxApprovalTab {
    SUMMARY = 'Summary',
    ASSETS = 'Assets',
    DETAILS = 'Details',
}

export type TabSections = {
    [key in TxApprovalTab]?: Section[];
};

export function DappTxApprovalPage() {
    const [tab, setTab] = useState(TxApprovalTab.SUMMARY);

    const { txID } = useParams();
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);
    const txRequestsLoading = useAppSelector(
        ({ transactionRequests }) => !transactionRequests.initialized
    );
    const { activeAccountIndex } = useAppSelector(({ account }) => account);
    const txRequestSelector = useMemo(
        () => (state: RootState) =>
            (txID && txRequestsSelectors.selectById(state, txID)) || null,
        [txID]
    );
    const txRequest = useAppSelector(txRequestSelector);
    const dispatch = useAppDispatch();

    const [normalizedFunction, setNormalizedFunction] = useState<
        SuiMoveNormalizedFunction | undefined
    >();
    const [effects, setEffects] = useState<
        TransactionEffects | undefined | null
    >();
    const [dryRunError, setDryRunError] = useState<string | undefined>();

    const loading =
        guardLoading || txRequestsLoading || !(effects || dryRunError);

    const gasUsed = effects?.gasUsed;
    const gas = gasUsed
        ? gasUsed.computationCost +
          (gasUsed.storageCost - gasUsed.storageRebate)
        : null;

    const reading = useMemo(() => {
        if (!normalizedFunction) return [];

        const readObjects = normalizedFunction.parameters
            .filter(
                (param) => typeof param !== 'string' && 'Reference' in param
            )
            .map((param) => {
                if (typeof param !== 'string' && 'Reference' in param) {
                    const reference = param.Reference;
                    if (
                        typeof reference !== 'string' &&
                        'Struct' in reference
                    ) {
                        return reference.Struct;
                    }
                }
                return null;
            });
        return readObjects;
    }, [normalizedFunction]);

    const creating = useMemo(() => {
        if (!effects?.events) return [];

        const newEvents = effects.events.filter((event) => event.newObject);
        const creating = newEvents
            .map((event) => {
                const typeParts = event.newObject.objectType.split('::');
                return typeParts[2].split('<')[0];
            })
            .reduce((summed, name) => {
                const index = summed.findIndex(
                    (info: (string | number)[]) => info[0] === name
                );
                if (index !== -1) {
                    summed[index][1]++;
                } else {
                    summed.push([name, 1]);
                }
                return summed;
            }, []);

        return creating;
    }, [effects]);

    const mutating = useMemo(() => {
        if (!effects?.events) return [];

        const mutating = effects.events
            .filter((event) => {
                const mutation = event.mutateObject;
                return (
                    mutation &&
                    mutation.objectType.indexOf(mutation.packageId) > -1
                );
            })
            .map((event) => {
                const objectTypeParts =
                    event.mutateObject.objectType.split('::');
                return {
                    address: objectTypeParts[0],
                    module: objectTypeParts[1],
                    name: objectTypeParts[2].split('<')[0],
                };
            });

        return mutating;
    }, [effects]);

    const transferring = useMemo(() => {
        if (!effects?.events) return [];

        const transferring = effects.events
            .filter((event) => event.transferObject)
            .map((event) => {
                const objectTypeParts =
                    event.transferObject.objectType.split('::');
                return {
                    address: objectTypeParts[0],
                    module: objectTypeParts[1],
                    name: objectTypeParts[2].split('<')[0],
                };
            });

        return transferring;
    }, [effects]);

    const deleting = useMemo(() => {
        if (!effects?.events) return [];

        const deleting = effects.events
            .filter((event) => event.deleteObject)
            .map((event) => {
                return {
                    name: event.deleteObject.objectId,
                };
            });

        return deleting;
    }, [effects]);

    const suiSpent = useMemo(() => {
        if (!effects?.events) return 0;

        const coinBalanceChangeEvents = effects.events.filter(
            (e) =>
                e.coinBalanceChange &&
                e.coinBalanceChange.coinType === '0x2::sui::SUI'
        );

        return (
            coinBalanceChangeEvents.reduce(
                (total, e) => total + e.coinBalanceChange.amount,
                0
            ) * -1
        );
    }, [effects]);

    const charges = useMemo(() => suiSpent - (gas || 0), [suiSpent, gas]);
    const [formattedCharges, chargesSymbol, chargeDollars] = useFormatCoin(
        charges,
        '0x2::sui::SUI'
    );
    const [formattedGas, gasSymbol, gasDollars] = useFormatCoin(
        gas,
        '0x2::sui::SUI'
    );
    const [formattedTotal, totalSymbol, totalDollars] = useFormatCoin(
        suiSpent,
        '0x2::sui::SUI'
    );

    useEffect(() => {
        const getEffects = async () => {
            try {
                if (!txRequest || txRequest.tx.type === 'move-call') {
                    setEffects(null);
                    return;
                }

                const signer = thunkExtras.api.getSignerInstance(
                    thunkExtras.keypairVault.getKeyPair(activeAccountIndex)
                );
                const transactionEffects = await signer.dryRunTransaction(
                    txRequest.tx.data
                );
                setEffects(transactionEffects);
            } catch (e) {
                if ((e as Error).message === 'Account mnemonic is not set') {
                    setTimeout(getEffects, 100);
                } else {
                    setDryRunError((e as Error).message);
                }
            }
        };

        getEffects();
    }, [txRequest, activeAccountIndex]);

    useEffect(() => {
        const getNormalizedFunction = async () => {
            if (!txRequest) return [];
            if (txRequest.tx.type === 'move-call') return [];
            if (typeof txRequest.tx.data === 'string') return [];
            if (!('packageObjectId' in txRequest.tx.data.data)) return [];

            const {
                packageObjectId,
                module,
                function: func,
            } = txRequest.tx.data.data;

            const normalizedFunction =
                await thunkExtras.api.instance.fullNode.getNormalizedMoveFunction(
                    packageObjectId,
                    module,
                    func
                );
            setNormalizedFunction(normalizedFunction);
        };

        getNormalizedFunction();
    }, [txRequest]);

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

    useEffect(() => {
        if (
            !loading &&
            (!txRequest || (txRequest && txRequest.approved !== null))
        ) {
            window.close();
        }
    }, [loading, txRequest]);

    const content: TabSections = useMemo(() => {
        switch (txRequest?.tx.type) {
            case 'v2': {
                if (txRequest.tx.data.kind === 'moveCall') {
                    const permissions = [];
                    if (reading.length > 0) {
                        permissions.push({
                            label: 'Reading',
                            count: reading.length,
                        });
                    }

                    if (mutating.length > 0) {
                        permissions.push({
                            label: 'Modifying',
                            count: mutating.length,
                        });
                    }

                    if (transferring.length > 0) {
                        permissions.push({
                            label: 'Transferring',
                            count: transferring.length,
                        });
                    }

                    if (deleting.length > 0) {
                        permissions.push({
                            label: 'Deleting',
                            count: deleting.length,
                        });
                    }

                    if (permissions.length === 0) {
                        permissions.push({
                            label: 'None Requested',
                            count: 0,
                        });
                    }

                    const summary = [
                        {
                            title: 'Requesting Permission To Call',
                            details: [
                                {
                                    label: 'Contract',
                                    content: txRequest.tx.data.data.module,
                                },
                                {
                                    label: 'Function',
                                    content: txRequest.tx.data.data.function,
                                },
                                {
                                    label: 'Permissions',
                                    content: permissions,
                                },
                            ],
                        } as Section,
                    ];

                    if (
                        creating.length > 0 ||
                        mutating.length > 0 ||
                        transferring.length > 0 ||
                        deleting.length > 0
                    ) {
                        const effects = {
                            title: 'Effects',
                            tooltip:
                                'This transaction will have the following effects on the assets in your wallet.',
                            details: [] as Detail[],
                        } as Section;

                        if (creating.length > 0) {
                            effects.details.push({
                                label: 'Creating',
                                content: creating.map(
                                    (creating: (string | number)[]) =>
                                        ({
                                            label: creating[0],
                                            count: creating[1],
                                        } as NumberedDetail)
                                ),
                            });
                        }

                        if (mutating.length > 0) {
                            effects.details.push({
                                label: 'Mutating',
                                content: mutating.map(
                                    (mutating) =>
                                        ({
                                            label: mutating.name.toString(),
                                            count: 1,
                                        } as NumberedDetail)
                                ),
                            });
                        }

                        if (transferring.length > 0) {
                            effects.details.push({
                                label: 'Transferring',
                                content: transferring.map(
                                    (transferring) =>
                                        ({
                                            label: transferring.name.toString(),
                                            count: 1,
                                        } as NumberedDetail)
                                ),
                            });
                        }

                        if (deleting.length > 0) {
                            effects.details.push({
                                label: 'Deleting',
                                content: deleting.map(
                                    (deleting) =>
                                        ({
                                            label: truncateMiddle(
                                                deleting.name
                                            ),
                                            count: 1,
                                        } as NumberedDetail)
                                ),
                            });
                        }

                        summary.push(effects);
                    }

                    const costs = {
                        title: 'Costs',
                        details: [
                            {
                                label: 'Charges',
                                content: {
                                    value: formattedCharges,
                                    symbol: chargesSymbol,
                                    dollars: chargeDollars,
                                },
                            },
                            {
                                label: 'Gas',
                                content: {
                                    value: formattedGas,
                                    symbol: gasSymbol,
                                    dollars: gasDollars,
                                },
                            },
                            {
                                break: true,
                            },
                            {
                                label: 'Total',
                                content: {
                                    value: formattedTotal,
                                    symbol: totalSymbol,
                                    dollars: totalDollars,
                                    total: true,
                                },
                            },
                        ],
                    };

                    summary.push(costs);

                    const anyPermissionsRequested =
                        reading.length > 0 ||
                        mutating.length > 0 ||
                        transferring.length > 0 ||
                        deleting.length > 0;

                    const assets = [
                        {
                            title: 'Permissions Requested',
                            subtitle: anyPermissionsRequested
                                ? 'This transaction has requested access to your assets:'
                                : 'No access requested.',
                            details: anyPermissionsRequested
                                ? [
                                      {
                                          label: 'Reading',
                                          content: `${reading.length} Assets`,
                                          detail: reading.map(
                                              (r) =>
                                                  `${truncateMiddle(
                                                      r?.address
                                                  )}::${r?.module}::${r?.name}`
                                          ),
                                      },
                                      {
                                          label: 'Modifying',
                                          content: `${mutating.length} Assets`,
                                          detail: mutating.map(
                                              (m) =>
                                                  `${truncateMiddle(
                                                      m?.address
                                                  )}::${m?.module}::${m?.name}`
                                          ),
                                      },
                                      {
                                          label: 'Transferring',
                                          content: `${transferring.length} Assets`,
                                          detail: transferring.map(
                                              (t) =>
                                                  `${truncateMiddle(
                                                      t?.address
                                                  )}::${t?.module}::${t?.name}`
                                          ),
                                      },
                                      {
                                          label: 'Deleting',
                                          content: `${deleting.length} Assets`,
                                          detail: deleting.map((d) =>
                                              truncateMiddle(d?.name)
                                          ),
                                      },
                                  ]
                                : [],
                        } as Section,
                    ];

                    const { data: txRequestData } = txRequest.tx.data;
                    const details = [
                        {
                            title: 'Transaction',
                            details: [
                                {
                                    label: 'Package',
                                    content: {
                                        type: 'small',
                                        content: txRequestData.packageObjectId,
                                    } as SmallDetail,
                                },
                                {
                                    label: 'Module',
                                    content: {
                                        type: 'small',
                                        content: txRequestData.module,
                                    } as SmallDetail,
                                },
                                {
                                    label: 'Function',
                                    content: {
                                        type: 'small',
                                        content: txRequestData.function,
                                    } as SmallDetail,
                                },
                                {
                                    label: 'Arguments',
                                    content: {
                                        type: 'small',
                                        content: txRequestData.arguments,
                                    } as SmallDetail,
                                },
                                {
                                    label: 'Gas Budget',
                                    content: {
                                        type: 'small',
                                        content:
                                            txRequestData.gasBudget || '---',
                                    } as SmallDetail,
                                },
                                {
                                    label: 'Gas Payment',
                                    content: {
                                        type: 'small',
                                        content:
                                            txRequestData.gasPayment || '---',
                                    } as SmallDetail,
                                },
                            ],
                        },
                        {
                            title: 'Gas',
                            subtitle: 'All gas fees displayed in MIST',
                            details: [
                                {
                                    label: 'Computation',
                                    content: {
                                        type: 'small',
                                        content:
                                            gasUsed?.computationCost || '---',
                                    } as SmallDetail,
                                },
                                {
                                    label: 'Storage Cost',
                                    content: {
                                        type: 'small',
                                        content: gasUsed?.storageCost || '---',
                                    } as SmallDetail,
                                },
                                {
                                    label: 'Storage Rebate',
                                    content: {
                                        type: 'small',
                                        content:
                                            gasUsed?.storageRebate || '---',
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
                                    } as SmallDetail,
                                },
                            ],
                        } as Section,
                    ];

                    return {
                        [TxApprovalTab.SUMMARY]: summary,
                        [TxApprovalTab.ASSETS]: assets,
                        [TxApprovalTab.DETAILS]: details,
                    };
                } else {
                    return {};
                }
            }
            default:
                return {};
        }
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
    ]);

    return (
        <Loading loading={loading} big={true}>
            {txRequest ? (
                <UserApproveContainer
                    title="Transaction Request"
                    origin={txRequest.origin}
                    originFavIcon={txRequest.originFavIcon}
                    approveTitle="Approve"
                    rejectTitle="Reject"
                    onSubmit={handleOnSubmit}
                >
                    <div className="flex flex-row justify-between items-baseline text-lg pb-6">
                        {[
                            TxApprovalTab.SUMMARY,
                            TxApprovalTab.ASSETS,
                            TxApprovalTab.DETAILS,
                        ].map((t, index) => (
                            <TabElement
                                key={`tab-${index}`}
                                type={t}
                                isSelected={t === tab}
                                setTab={setTab}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col gap-6 grow">
                        <>
                            {(content[tab] || []).map(
                                (section, sectionIndex) => (
                                    <SectionElement
                                        key={`section-${sectionIndex}`}
                                        section={section}
                                    />
                                )
                            )}
                        </>
                    </div>
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

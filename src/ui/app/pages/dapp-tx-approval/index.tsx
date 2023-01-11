// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import truncateMiddle from '../../helpers/truncate-middle';
import { AppState } from '../../hooks/useInitializedGuard';
import { GAS_TYPE_ARG } from '../../redux/slices/sui-objects/Coin';
import Alert from '../../shared/feedback/Alert';
import Body from '../../shared/typography/Body';
import EthosLink from '../../shared/typography/EthosLink';
import { Dot } from './CostValue';
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
import { WindowContext } from '_shared/utils/windowContext';
import { MAILTO_SUPPORT_URL } from '_src/shared/constants';
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

const coinName = (coin: string) => coin.split('::')[2];

const cleanObjectId = (objectId: string) => {
    return objectId.replace('0x0', '').replace('0x', '');
};

const formatAddress = (address?: string) => {
    return truncateMiddle(address, 5);
};

export function DappTxApprovalPage() {
    const suiName = useMemo(() => coinName(GAS_TYPE_ARG), []);
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

    const [normalizedFunction, setNormalizedFunction] = useState<
        SuiMoveNormalizedFunction | undefined
    >();
    const [effects, setEffects] = useState<
        TransactionEffects | undefined | null
    >();
    const [dryRunError, setDryRunError] = useState<string | undefined>();
    const [userHasNoSuiError, setUserHasNoSuiError] = useState(false);

    const loading =
        guardLoading ||
        txRequestsLoading ||
        (effects === undefined && !dryRunError && !userHasNoSuiError);

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

        const newEvents = effects.events.filter(
            (event) =>
                'newObject' in event &&
                event.newObject &&
                typeof event.newObject.recipient !== 'string' &&
                'AddressOwner' in event.newObject.recipient &&
                event.newObject.recipient.AddressOwner === address
        );

        const creating = newEvents.map((event) => {
            if (!('newObject' in event)) return {};

            const objectTypeParts = event.newObject.objectType.split('::');
            return {
                address: objectTypeParts[0],
                module: objectTypeParts[1],
                name: objectTypeParts[2].split('<')[0],
            };
        });

        return creating;
    }, [effects, address]);

    const mutating = useMemo(() => {
        if (!effects?.events) return [];

        const mutating = effects.events
            .filter((event) => {
                if (!('mutateObject' in event)) return false;
                const mutation = event.mutateObject;
                const mutated = effects.mutated;
                return (
                    mutation &&
                    mutated &&
                    mutation.objectType.indexOf(
                        cleanObjectId(mutation.packageId)
                    ) > -1 &&
                    mutated.find(
                        (asset) =>
                            asset.reference.objectId === mutation.objectId &&
                            typeof asset.owner !== 'string' &&
                            'AddressOwner' in asset.owner &&
                            asset.owner.AddressOwner === address
                    )
                );
            })
            .map((event) => {
                if (!('mutateObject' in event)) return {};

                const objectTypeParts =
                    event.mutateObject.objectType.split('::');
                return {
                    address: objectTypeParts[0],
                    module: objectTypeParts[1],
                    name: objectTypeParts[2].split('<')[0],
                };
            });

        return mutating;
    }, [effects, address]);

    const transferring = useMemo(() => {
        if (!effects?.events) return [];

        const transferring = effects.events
            .filter(
                (event) =>
                    'transferObject' in event &&
                    event.transferObject &&
                    typeof event.transferObject.recipient !== 'string' &&
                    'AddressOwner' in event.transferObject.recipient &&
                    event.transferObject.recipient.AddressOwner
            )
            .map((event) => {
                if (!('transferObject' in event)) return {};

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
            .filter((event) => 'deleteObject' in event)
            .map((event) => {
                if (!('deleteObject' in event)) return {};
                return {
                    name: event.deleteObject.objectId,
                };
            });

        return deleting;
    }, [effects]);

    const coinChanges = useMemo(() => {
        const zero: Record<string, number> = {};

        if (!effects?.events) return zero;

        const coinBalanceChangeEvents = effects.events.filter(
            (e) => 'coinBalanceChange' in e
        );

        return coinBalanceChangeEvents.reduce((totals, e) => {
            if (!('coinBalanceChange' in e)) return totals;

            const { coinType, amount } = e.coinBalanceChange;
            const name = coinName(coinType);
            if (!totals[name]) totals[name] = 0;
            totals[name] += amount * -1;
            return totals;
        }, zero);
    }, [effects]);

    const charges = useMemo(
        () => coinChanges[suiName] - (gas || 0),
        [coinChanges, suiName, gas]
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
        coinChanges[suiName],
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

    const isErrorCausedByUserNotHavingEnoughSui = (errorMessage: string) => {
        return (
            errorMessage.includes('Cannot find gas coin for signer address') &&
            errorMessage.includes('with amount sufficient for the budget')
        );
    };

    useEffect(() => {
        const getEffects = async () => {
            try {
                if (!txRequest || txRequest.tx.type === 'move-call') {
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
                        thunkExtras.keypairVault.getKeyPair(activeAccountIndex)
                    );
                }
                const transactionEffects = await signer.dryRunTransaction(
                    txRequest.tx.data
                );

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
                    setTimeout(getEffects, 100);
                } else {
                    if (isErrorCausedByUserNotHavingEnoughSui(errorMessage)) {
                        setUserHasNoSuiError(true);
                    } else {
                        setDryRunError(errorMessage);
                    }
                }
            }
        };

        getEffects();
    }, [txRequest, activeAccountIndex, address, authentication]);

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

    const theWindow = useContext(WindowContext);

    useEffect(() => {
        const finished =
            !txRequest || (txRequest && txRequest.approved !== null);
        if (!loading && finished) {
            theWindow.close();
        }
    }, [loading, txRequest, theWindow]);

    const content: TabSections = useMemo(() => {
        switch (txRequest?.tx.type) {
            case 'v2': {
                const txInfo = txRequest.tx.data;

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
                        label: 'Full Access',
                        count: deleting.length,
                    });
                }

                if (permissions.length === 0) {
                    permissions.push({
                        label: 'None Requested',
                        count: 0,
                    });
                }

                let summary: Section[] = [];

                if (txInfo.kind === 'moveCall') {
                    summary = [
                        {
                            title: 'Requesting Permission To Call',
                            details: [
                                {
                                    label: 'Contract',
                                    content: txInfo.data.module,
                                },
                                {
                                    label: 'Function',
                                    content: txInfo.data.function,
                                },
                                {
                                    label: 'Permissions',
                                    content: permissions,
                                },
                            ],
                        } as Section,
                    ];
                } else if (txInfo.kind === 'transferObject') {
                    summary = [
                        {
                            title: 'Transfer Asset',
                            details: [
                                {
                                    label: 'Asset',
                                    content: transferring[0]?.name,
                                },
                                {
                                    label: 'Recipient',
                                    content: txInfo.data.recipient,
                                },
                            ],
                        },
                    ];
                } else if (txInfo.kind === 'transferSui') {
                    summary = [
                        {
                            title: 'Transfer Asset',
                            details: [
                                {
                                    label: 'Amount',
                                    content: txInfo.data.amount || '---',
                                },
                                {
                                    label: 'Recipient',
                                    content: txInfo.data.recipient,
                                },
                            ],
                        },
                    ];
                } else if (txInfo.kind === 'pay') {
                    summary = [
                        {
                            title: 'Transfer Asset',
                            details: [
                                {
                                    label: 'Amount',
                                    content: txInfo.data.amounts,
                                },
                                {
                                    label: 'Recipient',
                                    content: txInfo.data.recipients,
                                },
                            ],
                        },
                    ];
                } else if (txInfo.kind === 'paySui') {
                    summary = [
                        {
                            title: 'Transfer Asset',
                            details: [
                                {
                                    label: 'Amount',
                                    content: txInfo.data.amounts,
                                },
                                {
                                    label: 'Recipient',
                                    content: txInfo.data.recipients,
                                },
                            ],
                        },
                    ];
                } else if (txInfo.kind === 'payAllSui') {
                    summary = [
                        {
                            title: 'Transfer Asset',
                            details: [
                                {
                                    label: 'Amount',
                                    content: `${txInfo.data.inputCoins.length} Coins`,
                                },
                                {
                                    label: 'Recipient',
                                    content: txInfo.data.recipient,
                                },
                            ],
                        },
                    ];
                }

                if (summary.length === 0) {
                    summary = [
                        {
                            title: 'Transaction Summary',
                            details: [
                                {
                                    label: 'No summary available for this transaction yet.',
                                },
                            ],
                        },
                    ];
                }

                if (
                    creating.length > 0 ||
                    mutating.length > 0 ||
                    transferring.length > 0 ||
                    deleting.length > 0 ||
                    Object.keys(coinChanges).length > 1
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
                                (creating) =>
                                    ({
                                        label: (
                                            creating?.name || ''
                                        ).toString(),
                                        count: 1,
                                    } as NumberedDetail)
                            ),
                        });
                    }

                    if (mutating.length > 0) {
                        effects.details.push({
                            label: 'Modifying',
                            content: mutating.map(
                                (mutating) =>
                                    ({
                                        label: (
                                            mutating?.name ?? ''
                                        ).toString(),
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
                                        label: (
                                            transferring?.name || ''
                                        ).toString(),
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
                                        label: truncateMiddle(deleting.name),
                                        count: 1,
                                    } as NumberedDetail)
                            ),
                        });
                    }

                    if (Object.keys(coinChanges).length > 1) {
                        effects.details.push({
                            label: 'Coins',
                            content: Object.keys(coinChanges)
                                .filter(
                                    (name) => name !== coinName(GAS_TYPE_ARG)
                                )
                                .map(
                                    (coinName) =>
                                        ({
                                            label: coinName,
                                            count: `${
                                                coinChanges[coinName] > 0
                                                    ? ''
                                                    : '+'
                                            }${coinChanges[coinName] * -1}`,
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
                                      detail: reading.map(
                                          (r) =>
                                              `${formatAddress(r?.address)}::${
                                                  r?.module
                                              }::${r?.name}`
                                      ),
                                  },
                                  {
                                      label: 'Modifying',
                                      content: `${mutating.length} Assets`,
                                      detail: mutating.map(
                                          (m) =>
                                              `${formatAddress(m?.address)}::${
                                                  m?.module
                                              }::${m?.name}`
                                      ),
                                  },
                                  {
                                      label: 'Transferring',
                                      content: `${transferring.length} Assets`,
                                      detail: transferring.map(
                                          (t) =>
                                              `${formatAddress(t?.address)}::${
                                                  t?.module
                                              }::${t?.name}`
                                      ),
                                  },
                                  {
                                      label: 'Full Access',
                                      content: `${deleting.length} Assets`,
                                      detail: deleting.map((d) =>
                                          truncateMiddle(d?.name)
                                      ),
                                  },
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
                                                  <div>{c}</div>
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
                                      detail: creating.map(
                                          (c) =>
                                              `${formatAddress(c?.address)}::${
                                                  c?.module
                                              }::${c?.name}`
                                      ),
                                  },
                                  {
                                      label: 'Modifying',
                                      content: `${mutating.length} Assets`,
                                      detail: mutating.map(
                                          (m) =>
                                              `${formatAddress(m?.address)}::${
                                                  m?.module
                                              }::${m?.name}`
                                      ),
                                  },
                                  {
                                      label: 'Transferring',
                                      content: `${transferring.length} Assets`,
                                      detail: transferring.map(
                                          (t) =>
                                              `${formatAddress(t?.address)}::${
                                                  t?.module
                                              }::${t?.name}`
                                      ),
                                  },
                                  {
                                      label: 'Deleting',
                                      content: `${deleting.length} Assets`,
                                      detail: deleting.map((d) =>
                                          truncateMiddle(d?.name)
                                      ),
                                  },
                                  {
                                      label: 'Balances',
                                      content: `${
                                          Object.keys(coinChanges).length
                                      } Coins`,
                                      detail: Object.keys(coinChanges).map(
                                          (c, index) => (
                                              <div
                                                  key={`coin-detail-${index}`}
                                                  className="text-xs flex gap-1 justify-end items-center"
                                              >
                                                  <div>{c}</div>
                                                  <Dot />
                                                  <div className="text-slate-500">
                                                      {coinChanges[c] > 0
                                                          ? ''
                                                          : '+'}
                                                      {coinChanges[c] * -1}
                                                  </div>
                                              </div>
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
                                    content: JSON.parse(
                                        JSON.stringify(txInfo.data)
                                    )[attribute],
                                } as SmallDetail,
                            });
                        }
                    }
                }

                details.push(transactionDetails);

                details.push({
                    title: 'Gas',
                    subtitle: 'All gas fees displayed in MIST',
                    details: [
                        {
                            label: 'Computation',
                            content: {
                                type: 'small',
                                content: gasUsed?.computationCost || '---',
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
                                content: gasUsed?.storageRebate || '---',
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
                });

                return {
                    [TxApprovalTab.SUMMARY]: summary,
                    [TxApprovalTab.ASSETS]: assets,
                    [TxApprovalTab.DETAILS]: details,
                };
            }
            case 'move-call':
                return {
                    [TxApprovalTab.SUMMARY]: [
                        {
                            title: 'Transaction',
                            details: [
                                {
                                    label: 'Transaction Type',
                                    content: 'MoveCall',
                                },
                                {
                                    label: 'Function',
                                    content: txRequest.tx.data.function,
                                },
                                {
                                    label: 'Gas Fees',
                                    content: txRequest.tx.data.gasBudget,
                                },
                            ],
                        },
                    ],
                };
            case 'serialized-move-call':
                return {
                    [TxApprovalTab.SUMMARY]: [
                        {
                            title: 'Transaction',
                            details: [
                                {
                                    label: 'Transaction Type',
                                    content: 'SerializedMoveCall',
                                },
                                {
                                    label: 'Contents',
                                    content: txRequest?.tx?.data,
                                },
                            ],
                        },
                    ],
                };
            default:
                return {
                    [TxApprovalTab.DETAILS]: [
                        {
                            title: 'Transaction Information',
                            details: [
                                {
                                    label: 'No transaction information available',
                                },
                            ],
                        },
                    ],
                };
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
        coinChanges,
    ]);

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
                    hasError={!!dryRunError || !!userHasNoSuiError}
                >
                    {dryRunError || userHasNoSuiError ? (
                        <>
                            {userHasNoSuiError ? (
                                <div className="px-6 pb-6">
                                    <Alert
                                        title="You don't have enough SUI"
                                        subtitle="It looks like your wallet doesn't have enough SUI to pay for the gas for this transaction."
                                    />
                                </div>
                            ) : (
                                <div className="px-6 pb-6 flex flex-col gap-6">
                                    <Alert
                                        title="Dry run error"
                                        subtitle={
                                            <Body>
                                                Your transaction couldn&apos;t
                                                be estimated. Please try again
                                                later. If this issue persists,{' '}
                                                <EthosLink
                                                    type="external"
                                                    to={MAILTO_SUPPORT_URL}
                                                >
                                                    contact Ethos
                                                </EthosLink>
                                                .
                                            </Body>
                                        }
                                    />
                                    <Alert
                                        title="Error details"
                                        subtitle={<Body>{dryRunError}</Body>}
                                    />
                                </div>
                            )}
                        </>
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

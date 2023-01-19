// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import AccountAddress from '../../components/account-address';
import { AddressMode } from '../../components/account-address/index';
import truncateMiddle from '../../helpers/truncate-middle';
import { AppState } from '../../hooks/useInitializedGuard';
import { saveActiveAccountIndex } from '../../redux/slices/account/index';
import { GAS_TYPE_ARG } from '../../redux/slices/sui-objects/Coin';
import Button from '../../shared/buttons/Button';
import Alert from '../../shared/feedback/Alert';
import Body from '../../shared/typography/Body';
import CopyBody from '../../shared/typography/CopyBody';
import EthosLink from '../../shared/typography/EthosLink';
import CopyAsset from './CopyAsset';
import FormattedCoin from './FormattedCoin';
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
import WalletColorAndEmojiCircle from '_src/ui/app/shared/WalletColorAndEmojiCircle';

import type { AccountInfo } from '../../KeypairVault';
import type { Detail } from './DetailElement';
import type { NumberedDetail } from './NumberedValue';
import type { Section } from './SectionElement';
import type { SmallDetail } from './SmallValue';
import type {
    SuiMoveNormalizedFunction,
    TransactionEffects,
} from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';
import type { ReactNode } from 'react';

export enum TxApprovalTab {
    SUMMARY = 'Summary',
    ASSETS = 'Assets',
    DETAILS = 'Details',
}

export type TabSections = {
    [key in TxApprovalTab]?: Section[];
};

const cleanObjectId = (objectId: string) => {
    return objectId.replace('0x0', '').replace('0x', '');
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

    const [normalizedFunction, setNormalizedFunction] = useState<
        SuiMoveNormalizedFunction | undefined
    >();
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
            (e) =>
                'coinBalanceChange' in e &&
                typeof e.coinBalanceChange.owner !== 'string' &&
                'AddressOwner' in e.coinBalanceChange.owner &&
                e.coinBalanceChange.owner.AddressOwner === address
        );

        return coinBalanceChangeEvents.reduce((totals, e) => {
            if (!('coinBalanceChange' in e)) return totals;

            const { coinType, amount } = e.coinBalanceChange;
            if (!totals[coinType]) totals[coinType] = 0;
            totals[coinType] += amount * -1;
            return totals;
        }, zero);
    }, [effects, address]);

    const charges = useMemo(
        () => coinChanges[GAS_TYPE_ARG] - (gas || 0),
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

    const isErrorCausedByUserNotHavingEnoughSui = (errorMessage: string) => {
        return (
            errorMessage.includes('Cannot find gas coin for signer address') &&
            errorMessage.includes('with amount sufficient for the budget')
        );
    };

    const isErrorCausedByIncorrectSigner = (errorMessage: string) => {
        return (
            errorMessage.includes('IncorrectSigner') &&
            errorMessage.includes('but signer address is')
        );
    };

    const isErrorCausedByMissingObject = (errorMessage: string) => {
        return errorMessage.includes(
            'Error: RPC Error: Could not find the referenced object'
        );
    };

    useEffect(() => {
        if (!accountInfos || accountInfos.length === 0) return;

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
                        thunkExtras.keypairVault.getKeyPair(activeAccountIndex),
                        true
                    );
                }

                setDryRunError(undefined);
                setExplicitError(undefined);
                setIncorrectSigner(undefined);
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
                    if (isErrorCausedByIncorrectSigner(errorMessage)) {
                        const address = errorMessage.match(
                            /is owned by account address (.*), but signer address is/
                        )?.[1];
                        const accountInfo = accountInfos.find(
                            (account) => account.address === address
                        );
                        setIncorrectSigner(accountInfo);
                    } else if (isErrorCausedByMissingObject(errorMessage)) {
                        setExplicitError(
                            <Alert
                                title="Missing Contract"
                                subtitle={`The contract this transaction references does not exist on ${selectedApiEnv}. Please ensure you are on the correct network or contact the creator of this app to report this error.`}
                            />
                        );
                    } else if (
                        isErrorCausedByUserNotHavingEnoughSui(errorMessage)
                    ) {
                        setExplicitError(
                            <Alert
                                title="You don't have enough SUI"
                                subtitle="It looks like your wallet doesn't have enough SUI to pay for the gas for this transaction."
                            />
                        );
                    } else {
                        setDryRunError(errorMessage);
                    }
                }
            }
        };

        getEffects();
    }, [
        txRequest,
        activeAccountIndex,
        address,
        authentication,
        accountInfos,
        selectedApiEnv,
    ]);

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
        const txInfo = txRequest?.tx.data;

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

        if (txInfo && typeof txInfo !== 'string' && 'kind' in txInfo) {
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
                                label: (creating?.name || '').toString(),
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
                                label: (mutating?.name ?? '').toString(),
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
                                label: (transferring?.name || '').toString(),
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
                                label: deleting.name,
                                truncate: true,
                                count: 1,
                            } as NumberedDetail)
                    ),
                });
            }

            if (Object.keys(coinChanges).length > 1) {
                effects.details.push({
                    label: 'Coins',
                    content: Object.keys(coinChanges)
                        .filter((name) => name !== GAS_TYPE_ARG)
                        .map(
                            (coinName) =>
                                ({
                                    label: coinName,
                                    count: `${
                                        coinChanges[coinName] > 0 ? '' : '+'
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
                            <Body as="div" className="flex flex-col gap-3">
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
                    <Alert
                        title="Dry run error"
                        subtitle={
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
                    />
                    <Alert
                        title="Error details"
                        subtitle={<Body>{dryRunError}</Body>}
                    />
                </div>
            );
    }, [incorrectSigner, explicitError, dryRunError, switchSigner]);

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

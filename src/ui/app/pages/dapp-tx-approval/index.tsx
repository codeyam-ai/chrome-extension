// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Tooltip from '../../components/Tooltip';
import { AppState } from '../../hooks/useInitializedGuard';
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

import type { SuiJsonValue, TypeTag, TransactionEffects } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';

import st from './DappTxApprovalPage.module.scss';

const truncateMiddle = (s = '', length = 6) =>
    s.length > length * 2.5
        ? `${s.slice(0, length)}...${s.slice(length * -1)}`
        : s;

function toList(items: SuiJsonValue[] | TypeTag[]) {
    if (!items?.length) {
        return '-';
    }
    return (
        <ul className={st.list}>
            {items.map((anItem) => {
                const val = JSON.stringify(anItem, null, 4);
                return (
                    <li key={val} title={val} className="text-right">
                        {truncateMiddle(val, 8)}
                    </li>
                );
            })}
        </ul>
    );
}

export enum TxApprovalTab {
    SUMMARY = 'Summary',
    ASSETS = 'Assets',
    DETAILS = 'Details',
}

export type Detail = {
    label?: string;
    content?: string | number;
    count?: number;
    title?: string;
};

export type Section = {
    title: string;
    tooltip?: string;
    details: Detail[];
};

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
    const { activeAccountIndex, address } = useAppSelector(
        ({ account }) => account
    );
    const txRequestSelector = useMemo(
        () => (state: RootState) =>
            (txID && txRequestsSelectors.selectById(state, txID)) || null,
        [txID]
    );
    const txRequest = useAppSelector(txRequestSelector);
    const dispatch = useAppDispatch();

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

    const ownedCreating = useMemo(() => {
        if (!effects?.events) return [];

        const newEvents = effects.events.filter((event) => event.newObject);
        const ownedCreating = newEvents
            .map((event) => {
                const typeParts = event.newObject.objectType.split('::');
                return typeParts[2];
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

        console.log('ownedCreating', ownedCreating);
        return ownedCreating;
    }, [effects]);

    const ownedMutated = useMemo(() => {
        if (!effects?.mutated) return [];

        const ownedMutated = effects.mutated.filter((object) => {
            if (typeof object.owner === 'string') {
                return false;
            }
            if ('AddressOwner' in object.owner) {
                if (object.owner.AddressOwner !== address) {
                    return false;
                }
            } else {
                return false;
            }
            if (
                object.reference.objectId ===
                effects.gasObject.reference.objectId
            ) {
                return false;
            }

            return true;
        });

        return ownedMutated;
    }, [effects, address]);

    const ownedTransferred = useMemo(() => {
        if (!effects?.events) return [];

        const ownedTransferred = effects.events.filter(
            (event) => event.transferObject
        );

        return ownedTransferred;
    }, [effects]);

    const ownedDeleted = useMemo(() => {
        if (!effects?.deleted) return [];

        const ownedDeleted: string[] = [];
        // effects.deleted.filter(

        // );
        console.log('DELETED', effects.deleted);

        return ownedDeleted;
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
    console.log('Effects', effects);

    useEffect(() => {
        const getNormalizedFunction = async () => {
            if (!txRequest) return;
            if (txRequest.tx.type === 'move-call') return;
            if (typeof txRequest.tx.data === 'string') return;
            if (!('packageObjectId' in txRequest.tx.data.data)) return;

            const {
                packageObjectId,
                module,
                function: f,
            } = txRequest.tx.data.data;

            const normalizedP =
                await thunkExtras.api.instance.fullNode.getNormalizedMoveModulesByPackage(
                    packageObjectId
                );
            console.log('getNormalizedMoveModulesByPackage', normalizedP);

            const normalizedM =
                await thunkExtras.api.instance.fullNode.getNormalizedMoveModule(
                    packageObjectId,
                    module
                );
            console.log('getNormalizedMoveModule', normalizedM);

            const normalizedF =
                await thunkExtras.api.instance.fullNode.getNormalizedMoveFunction(
                    packageObjectId,
                    module,
                    f
                );
            console.log('getNormalizedFunction', normalizedF);
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

    const NumberedValue = ({
        label,
        count,
    }: {
        label: string;
        count: number;
    }) => {
        return (
            <div className="flex flex-row items-center gap-1">
                <div>{label}</div>
                <div className="w-5 h-5 flex justify-center items-center font-normal bg-slate-200 text-slate-600 rounded-full">
                    {count}
                </div>
            </div>
        );
    };

    const CostValue = ({
        value,
        symbol,
        dollars,
        bold,
    }: {
        value: string;
        symbol: string;
        dollars: string;
        bold?: boolean;
    }) => {
        return (
            <div
                className={`flex flex-row items-center gap-1 py-1 ${
                    bold ? 'font-semibold' : ''
                }`}
            >
                <div className="font-normal text-slate-500">
                    {value} {symbol}
                </div>
                <Dot />
                <div className="font-normal">${dollars}</div>
            </div>
        );
    };

    const TabElement = ({ type }: { type: TxApprovalTab }) => {
        const _setTab = useCallback(() => setTab(type), [type]);

        const selected =
            tab === type ? 'border-b-purple-800 text-purple-800' : '';

        return (
            <div
                className={`border-b ${selected} font-semibold px-3 py-1`}
                onClick={_setTab}
            >
                {type}
            </div>
        );
    };

    const DetailElement = ({ detail }: { detail: Detail }) => {
        const contents = Array.isArray(detail.content)
            ? detail.content
            : [detail.content];
        return (
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <div className="text-gray-500 dark:text-gray-400">
                        {detail.label}
                    </div>
                </div>
                <div className="dark:text-gray-400 font-semibold">
                    {contents.map((content, index) =>
                        content.count ? (
                            <NumberedValue
                                key={`detail-content-${index}`}
                                {...content}
                            />
                        ) : (
                            <div key={`detail-content-${index}`}>{content}</div>
                        )
                    )}
                </div>
            </div>
        );
    };

    const Dot = () => (
        <svg
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.02983 5.13068C2.62879 5.13068 2.26255 5.03291 1.93111 4.83736C1.59967 4.63849 1.33452 4.37334 1.13565 4.0419C0.940104 3.71046 0.84233 3.34422 0.84233 2.94318C0.84233 2.53883 0.940104 2.17259 1.13565 1.84446C1.33452 1.51302 1.59967 1.24953 1.93111 1.05398C2.26255 0.855113 2.62879 0.755682 3.02983 0.755682C3.43419 0.755682 3.80043 0.855113 4.12855 1.05398C4.45999 1.24953 4.72348 1.51302 4.91903 1.84446C5.1179 2.17259 5.21733 2.53883 5.21733 2.94318C5.21733 3.34422 5.1179 3.71046 4.91903 4.0419C4.72348 4.37334 4.45999 4.63849 4.12855 4.83736C3.80043 5.03291 3.43419 5.13068 3.02983 5.13068Z"
                fill="#74777C"
            />
        </svg>
    );

    // const CostTotal = () => (
    //     <>
    //         <hr />
    //         <DetailElement
    //             label={
    //                 <div className="font-semibold text-slate-800">Total:</div>
    //             }
    //             content={
    //                 <CostValue
    //                     value={formattedTotal}
    //                     symbol={totalSymbol}
    //                     dollars={totalDollars}
    //                     bold={true}
    //                 />
    //             }
    //         />
    //     </>
    // );

    const content: TabSections = useMemo(() => {
        switch (txRequest?.tx.type) {
            case 'v2': {
                if (txRequest.tx.data.kind === 'moveCall') {
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
                                    content: 'Assets',
                                    count: 3,
                                },
                            ],
                        } as Section,
                    ];

                    if (ownedCreating.length > 0) {
                        const effects = {
                            title: 'Effects',
                            tooltip:
                                'This transaction will have the following effects on the assets in your wallet.',
                            details: [] as Detail[],
                        } as Section;

                        if (ownedCreating.length > 0) {
                            effects.details.push({
                                label: 'Creating',
                                content: ownedCreating.map(
                                    (creating: (string | number)[]) => ({
                                        label: creating[0],
                                        count: creating[1],
                                    })
                                ),
                            });
                        }

                        summary.push(effects);

                        // const costs = {
                        //     title: 'Costs',
                        //     details: [
                        //         {
                        //             label: 'Charges',
                        //             content: (
                        //                 <CostValue
                        //                     value={formattedCharges}
                        //                     symbol={chargesSymbol}
                        //                     dollars={chargeDollars}
                        //                 />
                        //             ),
                        //         },
                        //         {
                        //             label: 'Gas',
                        //             content: (
                        //                 <CostValue
                        //                     value={formattedGas}
                        //                     symbol={gasSymbol}
                        //                     dollars={gasDollars}
                        //                 />
                        //             ),
                        //         },
                        //     ],
                        // };

                        // summary.push(costs);
                    }
                    return {
                        [TxApprovalTab.SUMMARY]: summary,
                    };
                } else {
                    return {};
                }
            }
            default:
                return {};
        }
    }, [txRequest?.tx, ownedCreating]);

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
                        ].map((tab, index) => (
                            <TabElement key={`tab-${index}`} type={tab} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-6 grow">
                        <>
                            {(content[tab] || []).map(
                                ({ title, details }, sectionIndex) => (
                                    <div
                                        key={`section-${sectionIndex}`}
                                        className="flex flex-col gap-2"
                                    >
                                        <div className="text-base">{title}</div>
                                        <div className="flex flex-col text-sm gap-2">
                                            {details.map(
                                                (detail, detailIndex) => (
                                                    <DetailElement
                                                        key={`details-${detailIndex}`}
                                                        detail={detail}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </>
                    </div>
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

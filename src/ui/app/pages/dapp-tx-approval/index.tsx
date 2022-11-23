// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import Tooltip from '../../components/Tooltip';
import { AppState } from '../../hooks/useInitializedGuard';
import Check from '../../shared/svg/Check';
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

export type Detail = {
    label: string;
    content: string | number | JSX.Element;
    title?: string;
    detail?: JSX.Element;
};

export function DappTxApprovalPage() {
    const { txID } = useParams();
    const [details, setDetails] = useState<boolean>(false);
    const toggleDetails = useCallback(() => setDetails((prev) => !prev), []);
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
    const loading = guardLoading || txRequestsLoading;
    const dispatch = useAppDispatch();

    const [effects, setEffects] = useState<
        TransactionEffects | undefined | null
    >();
    const [dryRunError, setDryRunError] = useState<string | undefined>();

    const gasUsed = effects?.gasUsed;
    const gas = gasUsed
        ? gasUsed.computationCost +
          (gasUsed.storageCost - gasUsed.storageRebate)
        : null;

    const ownedCreating = useMemo(() => {
        if (!effects?.events) return [];

        const newEvents = effects.events.filter((event) => event.newObject);
        const ownedCreating = newEvents.map((event) => {
            const typeParts = event.newObject.objectType.split('::');
            return {
                name: typeParts[2],
            };
        });

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

    // const sharedMutated = useMemo(() => {
    //     if (!effects?.mutated) return [];

    //     const sharedMutated = effects.mutated.filter((object) => {
    //         if (typeof object.owner === 'string') {
    //             return false;
    //         }
    //         return 'Shared' in object.owner;
    //     });

    //     return sharedMutated;
    // }, [effects]);

    const suiChange = useMemo(() => {
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

    const charges = useMemo(() => suiChange - (gas || 0), [suiChange, gas]);
    const [formattedCharges, chargesSymbol, chargeDollars] = useFormatCoin(
        charges,
        '0x2::sui::SUI'
    );
    const [formattedGas, gasSymbol, gasDollars] = useFormatCoin(
        gas,
        '0x2::sui::SUI'
    );
    const [formattedTotal, totalSymbol, totalDollars] = useFormatCoin(
        suiChange,
        '0x2::sui::SUI'
    );

    console.log(
        'OWNED',
        'created',
        ownedCreating,
        'mutatede',
        ownedMutated,
        'transferred',
        ownedTransferred,
        'deleted',
        ownedDeleted,
        gas,
        gasDollars,
        formattedGas
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

    const NumberedDetails = ({
        count,
        label,
    }: {
        count: number;
        label: string;
    }) => {
        return (
            <div className="flex flex-row items-center gap-1">
                <div className="w-6 h-6 flex justify-center items-center bg-slate-200 rounded-full">
                    {count}
                </div>
                <div>{label}</div>
            </div>
        );
    };

    const valuesContent: Detail[] = useMemo(() => {
        switch (txRequest?.tx.type) {
            case 'v2': {
                if (txRequest.tx.data.kind === 'moveCall') {
                    return [
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
                            content: (
                                <NumberedDetails count={3} label="Assets" />
                            ),
                            detail: <div>HI</div>,
                        },
                    ];
                } else {
                    return [];
                }
            }
            case 'move-call':
                return [
                    { label: 'Transaction Type', content: 'MoveCall' },
                    {
                        label: 'Function',
                        content: txRequest.tx.data.function,
                    },
                    {
                        label: 'Gas Fees',
                        content: txRequest.tx.data.gasBudget,
                    },
                ];
            case 'serialized-move-call':
                return [
                    {
                        label: 'Transaction Type',
                        content: 'SerializedMoveCall',
                    },
                    { label: 'Contents', content: txRequest?.tx?.data },
                ];
            default:
                return [];
        }
    }, [txRequest]);

    const detailedValuesContent = useMemo(() => {
        switch (txRequest?.tx.type) {
            case 'v2': {
                let contents: Detail[] = [
                    {
                        label: 'Transaction Type',
                        content: txRequest.tx.data.kind.toString(),
                    },
                ];

                if (txRequest.tx.data.kind === 'moveCall') {
                    contents = contents.concat([
                        {
                            label: 'Function',
                            content: txRequest.tx.data.data.function,
                        },
                        {
                            label: 'Package',
                            content: (
                                <a
                                    href={`https://explorer.sui.io/objects/${txRequest.tx.data.data.packageObjectId}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    {truncateMiddle(
                                        txRequest.tx.data.data.packageObjectId,
                                        8
                                    )}
                                </a>
                            ),
                            title: txRequest.tx.data.data.packageObjectId,
                        },
                        {
                            label: 'Module',
                            content: txRequest.tx.data.data.module,
                        },
                        {
                            label: 'Arguments',
                            content: toList(txRequest.tx.data.data.arguments),
                        },
                        {
                            label: 'Type arguments',
                            content: toList(
                                txRequest.tx.data.data.typeArguments
                            ),
                        },
                        {
                            label: 'Computation Fees',
                            content: gasUsed?.computationCost || '-',
                        },
                        {
                            label: 'Storage Fees',
                            content: gasUsed
                                ? gasUsed.storageCost - gasUsed.storageRebate
                                : '-',
                        },
                    ]);
                } else if (txRequest.tx.data.kind === 'pay') {
                    const plural = txRequest.tx.data.data.recipients.length > 1;
                    contents.push({
                        label: `Recipient${plural ? 's' : ''}`,
                        content: plural
                            ? toList(txRequest.tx.data.data.recipients)
                            : truncateMiddle(
                                  txRequest.tx.data.data.recipients[0],
                                  12
                              ),
                    });

                    const plural2 = txRequest.tx.data.data.amounts.length > 1;
                    contents.push({
                        label: `Amount${plural2 ? 's' : ''}`,
                        content: plural2
                            ? toList(txRequest.tx.data.data.amounts)
                            : txRequest.tx.data.data.amounts[0],
                    });
                }

                if (txRequest.tx.data.kind === 'pay') {
                    return [
                        {
                            label: 'Coins',
                            content: toList(txRequest.tx.data.data.inputCoins),
                        },
                    ];
                }

                return contents;
            }
            case 'move-call':
                return [
                    {
                        label: 'Package',
                        content: truncateMiddle(
                            txRequest.tx.data.packageObjectId,
                            8
                        ),
                        title: txRequest.tx.data.packageObjectId,
                    },
                    {
                        label: 'Type arguments',
                        content: toList(txRequest.tx.data.typeArguments),
                    },
                ];
            case 'serialized-move-call':
                return null;
            default:
                return null;
        }
    }, [txRequest, gasUsed]);

    const Detail = ({
        label,
        value,
        detail,
    }: {
        label: string | JSX.Element;
        value: string | number | JSX.Element;
        detail?: JSX.Element;
    }) => {
        const [showDetail, setShowDetail] = useState(false);

        const _toggle = useCallback(() => setShowDetail((prev) => !prev), []);
        return (
            <div>
                <div className="flex justify-between" onClick={_toggle}>
                    <div className="flex items-center gap-1">
                        <div className="text-gray-500 dark:text-gray-400">
                            {typeof label === 'string' ? `${label}:` : label}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <div className="dark:text-gray-400">{value}</div>
                    </div>
                </div>
                {detail && showDetail && detail}
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
                        <div className="border-b-2 border-b-black px-3 py-1">
                            Summary
                        </div>
                        <div className="border-b-2 border-b-slate-400 text-slate-400 px-3 py-1">
                            Assets
                        </div>
                        <div className="border-b-2 border-b-slate-400 text-slate-400 px-3 py-1">
                            Details
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 grow">
                        {valuesContent.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <div className="text-lg">
                                    Requesting permission to call:
                                </div>
                                <div className="flex flex-col text-sm gap-2">
                                    {valuesContent.map(
                                        ({ label, content, detail }) => (
                                            <Fragment key={label}>
                                                <Detail
                                                    label={label}
                                                    value={content}
                                                    detail={detail}
                                                />
                                            </Fragment>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {effects !== null && (
                            <Loading
                                loading={effects === undefined && !dryRunError}
                                big={true}
                                className="flex justify-center"
                            >
                                {dryRunError ? (
                                    <div className="bg-red-50 p-6">
                                        <div className="font-semibold mb-3">
                                            Error
                                        </div>
                                        <div>
                                            There was an error doing a dry run
                                            of this transaction: {dryRunError}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-lg flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <div className="text-md flex flex-row gap-1 items-center">
                                                Effects
                                                <Tooltip
                                                    tooltipText={
                                                        'This transaction will have the following effects on the assets in your wallet.'
                                                    }
                                                >
                                                    <div className="cursor-help flex justify-center items-center rounded-full bg-gray-400 text-white text-xs h-5 w-5 scale-75">
                                                        ?
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            <div className="text-sm flex flex-col gap-2">
                                                {ownedCreating.length > 0 && (
                                                    <Detail
                                                        label="Creating"
                                                        value={
                                                            <NumberedDetails
                                                                count={
                                                                    ownedCreating.length
                                                                }
                                                                label={
                                                                    ownedCreating[0]
                                                                        .name
                                                                }
                                                            />
                                                        }
                                                    />
                                                )}
                                                {ownedCreating.length > 0 && (
                                                    <Detail
                                                        label="Modifying"
                                                        value={
                                                            <NumberedDetails
                                                                count={
                                                                    ownedCreating.length
                                                                }
                                                                label="Leaderboard"
                                                            />
                                                        }
                                                    />
                                                )}

                                                {ownedTransferred.length >
                                                    0 && (
                                                    <Detail
                                                        label="Transferring"
                                                        value={`${ownedTransferred.length} Transferred`}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <div className="text-md">Cost</div>
                                            <div className="text-sm">
                                                <Detail
                                                    label="Charges"
                                                    value={
                                                        <div className="flex flex-row items-center gap-1 py-1">
                                                            <div>
                                                                {
                                                                    formattedCharges
                                                                }{' '}
                                                                {chargesSymbol}
                                                            </div>
                                                            <Dot />
                                                            <div>
                                                                ${chargeDollars}
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                                <Detail
                                                    label="Gas Fees"
                                                    value={
                                                        <div className="flex flex-row items-center gap-1 py-1">
                                                            <div>
                                                                {formattedGas}{' '}
                                                                {gasSymbol}
                                                            </div>
                                                            <Dot />
                                                            <div>
                                                                ${gasDollars}
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                                <hr />
                                                <Detail
                                                    label={
                                                        <div className="font-semibold text-slate-800">
                                                            Total:
                                                        </div>
                                                    }
                                                    value={
                                                        <div className="flex flex-row items-center gap-1 py-1 font-semibold text-slate-600">
                                                            <div>
                                                                {formattedTotal}{' '}
                                                                {totalSymbol}
                                                            </div>
                                                            <Dot />
                                                            <div className="font-semibold text-slate-800">
                                                                ${totalDollars}
                                                            </div>
                                                        </div>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* {detailedValuesContent &&
                                    detailedValuesContent.length > 0 && (
                                        <div>
                                            <div
                                                className="cursor-pointer py-1 dark:text-gray-400"
                                                onClick={toggleDetails}
                                            >
                                                {details ? '▼ Hide' : '▶ Show'}{' '}
                                                Details
                                            </div>

                                            {details && (
                                                <div className="text-xs mt-3 flex flex-col gap-3 dark:text-gray-400">
                                                    {detailedValuesContent.map(
                                                        ({
                                                            label,
                                                            content,
                                                            title,
                                                        }) => (
                                                            <Fragment
                                                                key={label}
                                                            >
                                                                <div className="flex justify-between">
                                                                    <label className="text-gray-500 dark:text-gray-400">
                                                                        {label}
                                                                    </label>
                                                                    <div
                                                                        className={
                                                                            st.value +
                                                                            ' dark:text-gray-400'
                                                                        }
                                                                        title={
                                                                            title
                                                                        }
                                                                    >
                                                                        {
                                                                            content
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Fragment>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )} */}
                            </Loading>
                        )}
                    </div>
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

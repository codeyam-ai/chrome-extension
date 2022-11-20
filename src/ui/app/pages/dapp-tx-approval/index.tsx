// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

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

enum ImpactIcon {
    SAFE = 'safe',
    WARNING = 'warning',
    DANGER = 'danger',
}

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

    const [effects, setEffects] = useState<TransactionEffects | null>(null);

    const gasUsed = effects?.gasUsed;
    const gas = gasUsed ? gasUsed.computationCost + gasUsed.storageCost : null;
    const [formattedGas, symbol] = useFormatCoin(gas, '0x2::sui::SUI');

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

    const sharedMutated = useMemo(() => {
        if (!effects?.mutated) return [];

        const sharedMutated = effects.mutated.filter((object) => {
            if (typeof object.owner === 'string') {
                return false;
            }
            return 'Shared' in object.owner;
        });

        return sharedMutated;
    }, [effects]);

    console.log('MUTATED', ownedMutated, sharedMutated);

    useEffect(() => {
        const getEffects = async () => {
            try {
                if (!txRequest) return;
                if (txRequest.tx.type === 'move-call') return;

                const signer = thunkExtras.api.getSignerInstance(
                    thunkExtras.keypairVault.getKeyPair(activeAccountIndex)
                );
                const transactionEffects = await signer.dryRunTransaction(
                    txRequest.tx.data
                );
                setEffects(transactionEffects);
            } catch (e) {
                setTimeout(getEffects, 100);
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

    const valuesContent = useMemo(() => {
        switch (txRequest?.tx.type) {
            case 'v2': {
                const contents: Detail[] = [
                    {
                        label: 'Transaction Type',
                        content: txRequest.tx.data.kind.toString(),
                    },
                ];

                if (txRequest.tx.data.kind === 'moveCall') {
                    contents.push({
                        label: 'Function',
                        content: txRequest.tx.data.data.function,
                    });
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

                return contents;
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
                if (txRequest.tx.data.kind === 'moveCall') {
                    return [
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
                    ];
                } else if (txRequest.tx.data.kind === 'pay') {
                    return [
                        {
                            label: 'Coins',
                            content: toList(txRequest.tx.data.data.inputCoins),
                        },
                    ];
                }

                return null;
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
        icon,
    }: {
        label: string;
        value: string | number | JSX.Element;
        icon?: string;
    }) => {
        return (
            <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                    {icon === ImpactIcon.SAFE && <Check color="green" />}
                    {icon === ImpactIcon.WARNING && <Check color="yellow" />}
                    {icon === ImpactIcon.DANGER && <Check color="red" />}
                    <div className="text-gray-500 dark:text-gray-400">
                        {label}:
                    </div>
                </div>
                <div className={st.value + ' dark:text-gray-400'}>{value}</div>
            </div>
        );
    };

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
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="text-lg">Request</div>
                            {valuesContent.map(({ label, content }) => (
                                <Fragment key={label}>
                                    <Detail label={label} value={content} />
                                </Fragment>
                            ))}
                        </div>

                        <Loading
                            loading={effects === null}
                            big={true}
                            className="flex justify-center"
                        >
                            <div className="text-lg flex flex-col gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="text-md">Impact</div>
                                    <Detail
                                        label="Your Assets"
                                        value={
                                            ownedMutated.length === 0
                                                ? 'None Impacted'
                                                : `${ownedMutated.length} Impacted`
                                        }
                                        icon={
                                            ownedMutated.length === 0
                                                ? ImpactIcon.SAFE
                                                : ImpactIcon.WARNING
                                        }
                                    />
                                    <Detail
                                        label="Shared Objects"
                                        value={
                                            sharedMutated.length === 0
                                                ? 'None Impacted'
                                                : `${sharedMutated.length} Impacted`
                                        }
                                        icon={
                                            sharedMutated.length === 0
                                                ? ImpactIcon.SAFE
                                                : ImpactIcon.WARNING
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="text-md">Cost</div>
                                    <Detail
                                        label="Charges"
                                        value={`0 ${symbol}`}
                                    />
                                    <Detail
                                        label="Gas Fees"
                                        value={`${formattedGas} ${symbol}`}
                                    />
                                    <Detail
                                        label="Total"
                                        value={`${formattedGas} ${symbol}`}
                                    />
                                </div>
                            </div>

                            {detailedValuesContent && (
                                <div className="pb-6">
                                    <div
                                        className="cursor-pointer py-1 dark:text-gray-400"
                                        onClick={toggleDetails}
                                    >
                                        {details ? '▼ Hide' : '▶ Show'} Details
                                    </div>

                                    {details && (
                                        <div className="mt-3 flex flex-col gap-3 dark:text-gray-400">
                                            {detailedValuesContent.map(
                                                ({ label, content, title }) => (
                                                    <Fragment key={label}>
                                                        <div className="flex justify-between">
                                                            <label className="text-gray-500 dark:text-gray-400 text-sm">
                                                                {label}
                                                            </label>
                                                            <div
                                                                className={
                                                                    st.value +
                                                                    ' dark:text-gray-400'
                                                                }
                                                                title={title}
                                                            >
                                                                {content}
                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Loading>
                    </div>
                </UserApproveContainer>
            ) : null}
        </Loading>
    );
}

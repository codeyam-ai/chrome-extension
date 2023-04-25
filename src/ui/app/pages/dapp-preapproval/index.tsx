// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import BodyLarge from '../../shared/typography/BodyLarge';
import Loading from '_components/loading';
import {
    useAppDispatch,
    useAppSelector,
    useInitializedGuard,
    useNFTBasicData,
} from '_hooks';
import {
    preapprovalRequestsSelectors,
    respondToPreapprovalRequest,
} from '_redux/slices/preapproval-requests';
import { useDependencies } from '_src/shared/utils/dependenciesContext';
import Tooltip from '_src/ui/app/components/Tooltip';
import UserApproveContainer from '_src/ui/app/components/user-approve-container';
import { AppState } from '_src/ui/app/hooks/useInitializedGuard';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Accordion from '_src/ui/app/shared/content/Accordion';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import Alert from '_src/ui/app/shared/feedback/Alert';
import Body from '_src/ui/app/shared/typography/Body';

import type { KeyNameAndValue } from '../../shared/content/rows-and-lists/KeyValueList';
import type { SuiObjectData as SuiObject } from '@mysten/sui.js';
import type { RootState } from '_redux/RootReducer';

const truncateMiddle = (s = '', length = 6) =>
    s.length > length * 2.5
        ? `${s.slice(0, length)}...${s.slice(length * -1)}`
        : s;

type SuiMutableReference = {
    Struct: SuiStruct;
};

type SuiStruct = {
    address: string;
    module: string;
    name: string;
};

type SuiParameter = {
    MutableReference?: SuiMutableReference;
};

type PermissionInputArgs = {
    property: string;
    title: string;
    denomination?: string;
    description?: string;
    defaultValue: string;
    onChange: (field: string, value: string) => void;
};

interface EnhancedSuiObject extends SuiObject {
    objectName: string;
    action: string;
}

const NftDisplay = ({ nft }: { nft: SuiObject }) => {
    const { filePath, nftFields, fileExtentionType } = useNFTBasicData(nft);

    if (!filePath) return <></>;

    return (
        <div className="flex flex-col gap-3 items-center">
            <img
                className={'w-24 h-24 mr-2 rounded-sm'}
                src={filePath}
                alt={fileExtentionType?.name || 'NFT'}
            />
            <div className="text-sm">{nftFields?.title}</div>
        </div>
    );
};

const PermissionInput = ({
    property,
    title,
    denomination,
    description,
    defaultValue,
    onChange,
}: PermissionInputArgs) => {
    const [value, setValue] = useState<string>(defaultValue);

    const _handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            onChange(property, e.target.value);
        },
        [onChange, property]
    );

    return (
        <div className="flex flex-col gap-2 px-6 pb-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Body isSemibold>{title}</Body>
                    {description && (
                        <Tooltip tooltipText={description}>
                            <QuestionMarkCircleIcon className="w-5 h-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                        </Tooltip>
                    )}
                </div>
                <div className="flex justify-end items-center bg-ethos-pale-purple text-base pl-3 text-right border rounded-md w-[150px]">
                    <input
                        onChange={_handleChange}
                        value={value}
                        type="text"
                        className="bg-transparent border-none outline-none focus:border-none focus:ring-0 pr-3 py-2 text-right w-[90px]"
                    />
                    {denomination && (
                        <BodyLarge isSemibold className="pr-3">
                            {denomination}
                        </BodyLarge>
                    )}
                </div>
            </div>
        </div>
    );
};

export function DappPreapprovalPage() {
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);

    const { closeWindow } = useDependencies();

    const { preapprovalRequestID } = useParams();

    const dispatch = useAppDispatch();

    const preapprovalRequestsLoading = useAppSelector(
        ({ preapprovalRequests }) => !preapprovalRequests.initialized
    );
    const preapprovalRequestSelector = useMemo(
        () => (state: RootState) =>
            (preapprovalRequestID &&
                preapprovalRequestsSelectors.selectById(
                    state,
                    preapprovalRequestID
                )) ||
            null,
        [preapprovalRequestID]
    );
    const preapprovalRequest = useAppSelector(preapprovalRequestSelector);
    const preapproval = preapprovalRequest?.preapproval;

    const loading = guardLoading || preapprovalRequestsLoading;

    const [changes, setChanges] = useState<Record<string, string>>({});
    const [nft, setNft] = useState<EnhancedSuiObject | null>(null);
    const [showError, setShowError] = useState<boolean>(false);

    const onChange = useCallback((key: string, value: string) => {
        setChanges((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const handleOnSubmit = useCallback(
        async (approved: boolean) => {
            if (showError) {
                approved = false;
            }
            if (preapprovalRequest?.id) {
                await dispatch(
                    respondToPreapprovalRequest({
                        approved,
                        changes,
                        preapprovalRequestID: preapprovalRequest.id,
                    })
                );
                closeWindow();
            }
        },
        [showError, preapprovalRequest, dispatch, changes, closeWindow]
    );

    useEffect(() => {
        if (!preapproval) return;

        const retrieveDetails = async () => {
            const [packageObjectId, module, fun] =
                preapproval.target.split('::');
            const provider = api.instance.fullNode;
            const functionDetails = await provider.getNormalizedMoveFunction({
                package: packageObjectId,
                module,
                function: fun,
            });

            const onchainInfo = {
                action: '',
                objectName: '',
            };

            let mutableCount = 0;
            functionDetails.parameters.forEach((parameter) => {
                let key;
                let struct;
                for (key of Object.keys(parameter)) {
                    if (!struct && key === 'MutableReference') {
                        struct = (
                            (parameter as SuiParameter)[
                                key
                            ] as SuiMutableReference
                        )?.Struct;
                        mutableCount += 1;
                    }
                }

                const affectsObject =
                    struct?.address === packageObjectId &&
                    struct?.module === module;

                if (affectsObject) {
                    onchainInfo.action = key || '';
                    onchainInfo.objectName = struct?.name || '';
                }
            });

            if (mutableCount !== 2) {
                setShowError(true);
                return;
            }

            const object = await provider.getObject({
                id: preapproval.objectId,
                options: { showContent: true, showDisplay: true },
            });

            const nft = {
                ...onchainInfo,
                ...(object.data as SuiObject),
            };

            setNft(nft);
        };

        retrieveDetails();
    }, [preapproval]);

    const permissionInputs = useMemo(
        () => [
            {
                property: 'maxTransactionCount',
                title: 'Max Transactions',
                description:
                    'Only this # of transactions will be pre-approved.',
                defaultValue: (
                    preapproval?.maxTransactionCount as number
                ).toString(),
                onChange,
            },
            {
                property: 'totalGasLimit',
                title: 'Total Gas Limit',
                denomination: 'SUI',
                description:
                    'Pre-approved transactions will not exceed this gas amount.',
                defaultValue: new BigNumber(preapproval?.totalGasLimit ?? '0')
                    .shiftedBy(-9)
                    .toString(),
                onChange: (property: string, value: string) => {
                    onChange(
                        property,
                        new BigNumber(value).shiftedBy(9).toString()
                    );
                },
            },
        ],
        [onChange, preapproval]
    );

    const Details = () => {
        const [packageObjectId, module, fun] = (
            preapproval?.target || ''
        ).split('::');
        const keyValueListItems: KeyNameAndValue[] = [
            {
                keyName: 'Target',
                value: module || '',
            },
            {
                keyName: 'Object',
                value: truncateMiddle(preapproval?.objectId, 6),
            },
            {
                keyName: 'Function',
                value: fun || '',
            },
            {
                keyName: 'Package',
                value: truncateMiddle(packageObjectId || '', 6),
            },
        ];

        return (
            <Accordion title="View Details">
                <KeyValueList keyNamesAndValues={keyValueListItems} />
            </Accordion>
        );
    };

    let modifier;
    switch (nft?.action) {
        case 'MutableReference':
            modifier = 'modify';
            break;
        default:
            modifier = 'read';
    }

    return (
        <Loading loading={loading} big={true} resize={true}>
            {preapprovalRequest ? (
                <UserApproveContainer
                    title="Pre-Approve Transactions"
                    origin={preapprovalRequest.origin || ''}
                    originFavIcon={preapprovalRequest.originFavIcon}
                    approveTitle={showError ? '' : 'Approve'}
                    rejectTitle="Reject"
                    onSubmit={handleOnSubmit}
                >
                    {showError ? (
                        <div className="px-6 pb-6">
                            <Alert
                                title="Error"
                                subtitle="Only one object can be mutated in a pre-approved transaction."
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col justify-center items-center gap-2 bg-ethos-pale-purple mx-6 p-3 rounded-xl">
                                <Body isTextColorMedium>
                                    Transactions can only {modifier} this NFT:
                                </Body>
                                {nft && (
                                    <div className="text-center px-6">
                                        <NftDisplay nft={nft} />
                                        <Body isTextColorMedium>
                                            {truncateMiddle(
                                                preapproval?.objectId || '',
                                                12
                                            )}
                                        </Body>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col px-6">
                                <Body isSemibold>Description</Body>
                                <Body isTextColorMedium>
                                    {preapproval?.description}
                                </Body>
                            </div>
                            <div className="flex flex-col">
                                {permissionInputs.map((info, index) => (
                                    <PermissionInput
                                        key={`permission-input-${index}`}
                                        {...info}
                                    />
                                ))}
                                <Details />
                            </div>
                        </div>
                    )}
                </UserApproveContainer>
            ) : (
                <></>
            )}
        </Loading>
    );
}

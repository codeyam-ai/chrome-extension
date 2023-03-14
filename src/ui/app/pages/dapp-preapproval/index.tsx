// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Tooltip from '../../components/Tooltip';
import { AppState } from '../../hooks/useInitializedGuard';
import { api } from '../../redux/store/thunk-extras';
import Accordion from '../../shared/content/Accordion';
import KeyValueList from '../../shared/content/rows-and-lists/KeyValueList';
import Alert from '../../shared/feedback/Alert';
import Input from '../../shared/inputs/Input';
import Body from '../../shared/typography/Body';
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
import UserApproveContainer from '_src/ui/app/components/user-approve-container';

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
                <Input
                    onChange={_handleChange}
                    value={value}
                    isTextAlignRight
                    className="!px-0 !py-0 max-w-[112px]"
                />
            </div>
        </div>
    );
};

export function DappPreapprovalPage() {
    const guardLoading = useInitializedGuard([
        AppState.MNEMONIC,
        AppState.HOSTED,
    ]);

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

    // const nfts = useAppSelector(accountNftsSelector);
    // console.log('NFTS', nfts);
    // const nft = useMemo(() => {
    //     const selectedNFT = nfts.filter(
    //         (nftItem) =>
    //             getObjectId(nftItem.reference) === preapproval?.objectId
    //     )[0];
    //     return selectedNFT;
    // }, [nfts, preapproval?.objectId]);

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
                window.close();
            }
        },
        [dispatch, preapprovalRequest, changes, showError]
    );

    useEffect(() => {
        if (!preapproval) return;

        const retrieveDetails = async () => {
            const provider = api.instance.fullNode;
            const functionDetails = await provider.getNormalizedMoveFunction(
                preapproval.packageObjectId,
                preapproval.module,
                preapproval.function
            );

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
                    struct?.address === preapproval.packageObjectId &&
                    struct?.module === preapproval.module;

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
                options: { showContent: true },
            });
            const nft = {
                ...onchainInfo,
                ...(object.details as SuiObject),
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
            },
            {
                property: 'totalGasLimit',
                title: 'Total Gas Limit',
                description:
                    'Pre-approved transactions will not exceed this gas amount.',
                defaultValue: (preapproval?.totalGasLimit as number).toString(),
            },
        ],
        [preapproval]
    );

    const Details = () => {
        const keyValueListItems: KeyNameAndValue[] = [
            {
                keyName: 'Module',
                value: preapproval?.module || '',
            },
            {
                keyName: 'Object',
                value: truncateMiddle(preapproval?.objectId, 6),
            },
            {
                keyName: 'Function',
                value: preapproval?.function || '',
            },
            {
                keyName: 'Package',
                value: truncateMiddle(preapproval?.packageObjectId || '', 6),
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
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col justify-center items-center gap-2">
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
                                        onChange={onChange}
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

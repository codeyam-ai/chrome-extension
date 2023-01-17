// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback } from 'react';

import { Content } from '_app/shared/bottom-menu-layout';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import { AssetCard } from '_src/ui/app/shared/nfts/AssetCard';
import Body from '_src/ui/app/shared/typography/Body';
import Header from '_src/ui/app/shared/typography/Header';

// import type { EnhancedSuiObject } from '../../../dapp-preapproval/index';
import type { SuiObject } from '@mysten/sui.js';

import 'react-toastify/dist/ReactToastify.css';

export type TransferNFTFormProps = {
    formData: {
        from: string;
        to: string;
        nftId: string;
        gasFee: string | undefined;
    };
    nftobj: SuiObject;
    transferNft: () => void;
    submitted: boolean;
};

function TransferNftReviewForm({
    formData,
    nftobj,
    transferNft,
    submitted,
}: TransferNFTFormProps) {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    let address;
    if (
        nftobj &&
        typeof nftobj.owner !== 'string' &&
        'AddressOwner' in nftobj.owner
    ) {
        address = nftobj.owner.AddressOwner;
    }

    let fields;
    if (nftobj && 'fields' in nftobj.data) {
        fields = nftobj.data.fields;
    }

    const onSubmit = useCallback(() => {
        transferNft();
    }, [transferNft]);

    return (
        <div>
            <Content>
                <div>
                    {nftobj && (
                        <div>
                            <div className={'pb-8 px-6 pt-6 text-center'}>
                                <AssetCard
                                    isFunc={false}
                                    isNft={true}
                                    imgUrl={fields?.url ? fields.url : ''}
                                    name={fields?.name}
                                />
                                <Body isTextColorMedium>Sending</Body>
                                <Header
                                    className={'font-weight-ethos-subheader'}
                                >
                                    {fields?.name}
                                </Header>
                            </div>

                            <div className={'text-left'}>
                                <KeyValueList
                                    keyNamesAndValues={[
                                        {
                                            keyName: 'From',
                                            value: accountInfo?.name
                                                ? accountInfo?.name
                                                : truncateMiddle(address || ''),
                                        },
                                        {
                                            keyName: 'To',
                                            value: truncateMiddle(formData.to),
                                        },
                                        {
                                            keyName: 'NFT',
                                            value: fields?.name,
                                        },
                                        {
                                            keyName: 'Transaction Fee',
                                            value: formData.gasFee,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    )}

                    <div
                        className={
                            'bg-ethos-light-background-default dark:bg-ethos-dark-background-default absolute bottom-0 w-full p-6 left-0 right-0 rounded-b-2xl'
                        }
                    >
                        <Button
                            disabled={submitted}
                            isInline
                            removeContainerPadding
                            buttonStyle="primary"
                            type="submit"
                            onClick={onSubmit}
                            className={'mt-[50px] mb-0'}
                        >
                            Confirm & Send
                        </Button>
                    </div>
                </div>
            </Content>
        </div>
    );
}

export default memo(TransferNftReviewForm);

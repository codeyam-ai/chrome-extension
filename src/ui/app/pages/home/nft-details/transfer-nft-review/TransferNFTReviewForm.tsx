// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { memo, useCallback } from 'react';

import { Content } from '_app/shared/bottom-menu-layout';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import WalletTo from '_src/ui/app/components/wallet-to';
import getDisplay from '_src/ui/app/helpers/getDisplay';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import { AssetCard } from '_src/ui/app/shared/nfts/AssetCard';
import Body from '_src/ui/app/shared/typography/Body';
import Header from '_src/ui/app/shared/typography/Header';

// import type { EnhancedSuiObject } from '../../../dapp-preapproval/index';
import type { SuiObjectData } from '@mysten/sui.js';

import 'react-toastify/dist/ReactToastify.css';

export type TransferNFTFormProps = {
    formData: {
        from: string;
        to: string;
        nftId: string;
        gasFee: string | undefined;
    };
    nftobj: SuiObjectData;
    transferNft: () => void;
    submitted: boolean;
};

function TransferNftReviewForm({
    formData,
    nftobj,
    transferNft,
    submitted,
}: TransferNFTFormProps) {
    const walletTo = useAppSelector(({ account: { accountInfos } }) =>
        accountInfos.find((accountInfo) => accountInfo.address === formData.to)
    );

    const contactTo = useAppSelector(({ contacts: { contacts } }) =>
        contacts.find((contact) => contact.address === formData.to)
    );

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const onSubmit = useCallback(() => {
        transferNft();
    }, [transferNft]);

    if (!nftobj) return <></>;

    let address;
    if (
        nftobj.owner &&
        typeof nftobj.owner !== 'string' &&
        'AddressOwner' in nftobj.owner
    ) {
        address = nftobj.owner.AddressOwner;
    }

    let fields;
    if (nftobj.content && 'fields' in nftobj.content) {
        fields = nftobj.content.fields;
    }

    const nftDisplay = getDisplay(nftobj.display);
    const display = {
        name: nftDisplay?.name ?? fields?.name,
        description: nftDisplay?.description ?? fields?.description,
        url: nftDisplay?.image_url ?? fields?.url,
    };

    return (
        <div>
            <Content>
                <div>
                    {nftobj && (
                        <div>
                            <div className={'pb-8 px-6 pt-6 text-center'}>
                                <AssetCard
                                    txType="nft"
                                    imgUrl={display.url ?? ''}
                                    name={display.name ?? ''}
                                />
                                <Body isTextColorMedium>Transfer</Body>
                                <Header
                                    className={'font-weight-ethos-subheader'}
                                >
                                    {display?.name}
                                </Header>
                            </div>

                            <div className={'text-left'}>
                                <KeyValueList
                                    keyNamesAndValues={[
                                        {
                                            keyName: 'From',
                                            shortValue: (
                                                <WalletTo
                                                    addressTo={address}
                                                    walletTo={accountInfo}
                                                    noTo={true}
                                                />
                                            ),
                                            value: address || '',
                                        },
                                        {
                                            keyName: 'To',
                                            shortValue: (
                                                <WalletTo
                                                    addressTo={formData.to}
                                                    walletTo={
                                                        walletTo
                                                            ? walletTo
                                                            : contactTo
                                                            ? contactTo
                                                            : undefined
                                                    }
                                                    noTo={true}
                                                />
                                            ),
                                            value: formData.to,
                                        },
                                        {
                                            keyName: 'NFT',
                                            value: display?.name,
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

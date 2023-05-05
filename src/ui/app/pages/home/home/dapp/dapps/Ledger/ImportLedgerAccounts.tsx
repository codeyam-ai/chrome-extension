// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import {
//     LedgerAccountList,
// } from './LedgerAccountList';
import { toast } from 'react-toastify';

import { useDeriveLedgerAccounts } from './hooks/useDeriveLedgerAccounts';
import Loading from '_src/ui/app/components/loading';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useAppSelector } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import WalletButton from '_src/ui/app/shared/wallet-list/WalletButton';

import type { SerializedLedgerAccount } from '_src/shared/cryptography/LedgerAccount';
import Button from '_src/ui/app/shared/buttons/Button';

const numLedgerAccountsToDeriveByDefault = 10;

const LEDGER_HOME = '/home/ledger';

const LedgerItem = ({
    account,
    selected,
    index,
    onSelect,
}: {
    account: any;
    selected: boolean;
    index: number;
    onSelect: (account: any) => void;
}) => {
    const wallet = useMemo(() => {
        return {
            index,
            address: account.address,
            name: `Ledger ${index + 1}`,
            color: getNextWalletColor(index + 1),
            emoji: getNextEmoji(index + 1),
        };
    }, [account, index]);

    const handleSelect = useCallback(() => {
        onSelect(account);
    }, [account, onSelect]);

    return (
        <WalletButton
            wallet={wallet}
            isActive={selected}
            isWalletEditing={false}
            onClick={handleSelect}
        />
    );
};

export function ImportLedgerAccounts() {
    const navigate = useNavigate();

    const { accountInfos } = useAppSelector(({ account }) => account);
    const [selectedLedgerAccounts, setSelectedLedgerAccounts] = useState<
        SerializedLedgerAccount[]
    >([]);

    const {
        data: ledgerAccounts,
        isLoading: areLedgerAccountsLoading,
        isError: encounteredDerviceAccountsError,
    } = useDeriveLedgerAccounts({
        numAccountsToDerive: numLedgerAccountsToDeriveByDefault,
        select: (ledgerAccounts) => {
            return ledgerAccounts.filter(
                ({ address }) =>
                    !accountInfos.some((account) => account.address === address)
            );
        },
        onError: (error) => {
            toast.error(`Something went wrong. ${error}`);
            navigate(LEDGER_HOME);
        },
    });

    const onAccountClick = useCallback(
        (targetAccount: any) => {
            if (targetAccount.isSelected) {
                setSelectedLedgerAccounts((prevState) =>
                    prevState.filter((ledgerAccount) => {
                        return ledgerAccount.address !== targetAccount.address;
                    })
                );
            } else {
                setSelectedLedgerAccounts((prevState) => [
                    ...prevState,
                    targetAccount,
                ]);
            }
        },
        [setSelectedLedgerAccounts]
    );

    const addSelected = useCallback(() => {
        console.log(selectedLedgerAccounts);
    }, [selectedLedgerAccounts]);

    return (
        <Loading
            loading={areLedgerAccountsLoading}
            big
            className="flex justify-center py-12"
        >
            <div className="flex flex-col gap-3 py-6">
                <Subheader>Select A Ledger Account</Subheader>
                <Body>Click on an account to import it.</Body>
                <Body>Click &#34;Save&#34; at the bottom when complete.</Body>
                <Body isTextColorMedium>
                    (colors and emojis are generated randomly)
                </Body>
                {(ledgerAccounts ?? []).map((account, index) => (
                    <LedgerItem
                        key={account.address}
                        account={account}
                        index={index}
                        selected={selectedLedgerAccounts.includes(account)}
                        onSelect={onAccountClick}
                    />
                ))}
                <div className="flex flex-col py-3">
                    <Button buttonStyle="primary" onClick={addSelected}>
                        Save
                    </Button>
                </div>
            </div>
        </Loading>
    );

    // return (
    //     <Overlay
    //         showModal
    //         title="Import Accounts"
    //         closeOverlay={() => {
    //             navigate(accountsUrl);
    //         }}
    //     >
    //         <div className="w-full flex flex-col gap-5">
    //             <div className="h-full bg-white flex flex-col border border-solid border-gray-45 rounded-2xl">
    //                 <div className="text-center bg-gray-40 py-2.5 rounded-t-2xl">
    //                     <Text
    //                         variant="captionSmall"
    //                         weight="bold"
    //                         color="steel-darker"
    //                         truncate
    //                     >
    //                         {areAllAccountsImported
    //                             ? 'Ledger Accounts '
    //                             : 'Connect Ledger Accounts'}
    //                     </Text>
    //                 </div>
    //                 <div className="grow px-4 py-2">{summaryCardBody}</div>
    //                 <div className="w-full rounded-b-2xl border-x-0 border-b-0 border-t border-solid border-gray-40 text-center pt-3 pb-4">
    //                     <div className="w-fit ml-auto mr-auto">
    //                         <Link
    //                             text="Select All Accounts"
    //                             color="heroDark"
    //                             weight="medium"
    //                             onClick={() => {
    //                                 if (ledgerAccounts) {
    //                                     setSelectedLedgerAccounts(
    //                                         ledgerAccounts
    //                                     );
    //                                 }
    //                             }}
    //                             disabled={isSelectAllButtonDisabled}
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //             <div>
    //                 <Button
    //                     variant="primary"
    //                     size="tall"
    //                     before={<UnlockedLockIcon />}
    //                     text="Unlock"
    //                     loading={importLedgerAccountsMutation.isLoading}
    //                     disabled={isUnlockButtonDisabled}
    //                     onClick={() =>
    //                         importLedgerAccountsMutation.mutate(
    //                             selectedLedgerAccounts
    //                         )
    //                     }
    //                 />
    //             </div>
    //         </div>
    //     </Overlay>
    // );
}

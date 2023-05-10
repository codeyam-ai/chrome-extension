// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
    derivationPathForLedger,
    useDeriveLedgerAccounts,
} from './hooks/useDeriveLedgerAccounts';
import Loading from '_src/ui/app/components/loading';
import getNextEmoji from '_src/ui/app/helpers/getNextEmoji';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import humanReadableTransactionErrors from '_src/ui/app/helpers/humanReadableTransactionError';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import { saveAccountInfos } from '_src/ui/app/redux/slices/account';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import WalletButton from '_src/ui/app/shared/wallet-list/WalletButton';

import type { SerializedLedgerAccount } from '_src/shared/cryptography/LedgerAccount';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

const numLedgerAccountsToDeriveByDefault = 10;

const LEDGER_HOME = '/home/ledger';
const LEDGER_OFFSET = 100_000_000;

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
            color: getNextWalletColor(index),
            emoji: getNextEmoji(index),
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
    const dispatch = useAppDispatch();

    const { accountInfos } = useAppSelector(({ account }) => account);

    const { data: ledgerAccounts, isLoading: areLedgerAccountsLoading } =
        useDeriveLedgerAccounts({
            numAccountsToDerive: numLedgerAccountsToDeriveByDefault,
            onError: (error) => {
                toast.error(humanReadableTransactionErrors(`${error}`));
                navigate(LEDGER_HOME);
            },
        });

    const [selectedLedgerAccounts, setSelectedLedgerAccounts] = useState<
        SerializedLedgerAccount[]
    >([]);

    useEffect(() => {
        if (!ledgerAccounts) return;
        const _selected = accountInfos
            .filter(
                ({ address }) =>
                    !!ledgerAccounts.find(
                        (ledgerAccount) => ledgerAccount.address === address
                    )
            )
            .map((accountInfo) => ({
                address: accountInfo.address,
                index: accountInfo.importedLedgerIndex ?? 0,
                derivationPath: derivationPathForLedger(
                    accountInfo.importedLedgerIndex ?? 0
                ),
            }));

        setSelectedLedgerAccounts(_selected);
    }, [accountInfos, ledgerAccounts]);

    const onAccountClick = useCallback(
        (targetAccount: any) => {
            setSelectedLedgerAccounts((prevState) => {
                const existing = prevState.find(
                    (ledgerAccount) =>
                        ledgerAccount.address === targetAccount.address
                );

                if (existing) {
                    return prevState.filter(
                        (ledgerAccount) =>
                            ledgerAccount.address !== targetAccount.address
                    );
                } else {
                    return [...prevState, targetAccount];
                }
            });
        },
        [setSelectedLedgerAccounts]
    );

    const addSelected = useCallback(async () => {
        let mutableAccountInfos: AccountInfo[] = JSON.parse(
            JSON.stringify(accountInfos)
        );

        mutableAccountInfos = mutableAccountInfos.filter(
            (account) => account.importedLedgerIndex === undefined
        );

        for (const account of selectedLedgerAccounts) {
            const { index, address } = account;
            const rawIndex = LEDGER_OFFSET + index;
            mutableAccountInfos.push({
                index: rawIndex,
                address,
                importedLedgerIndex: index,
                color: getNextWalletColor(index),
                emoji: getNextEmoji(index),
                name: `Ledger ${index + 1}`,
            });
        }

        await dispatch(saveAccountInfos(mutableAccountInfos));
        navigate(LEDGER_HOME);
    }, [accountInfos, dispatch, navigate, selectedLedgerAccounts]);

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
                        selected={
                            !!selectedLedgerAccounts.find(
                                (selected) =>
                                    account.address === selected.address
                            )
                        }
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

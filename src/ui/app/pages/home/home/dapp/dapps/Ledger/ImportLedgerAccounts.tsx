// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { HandThumbUpIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import {
//     LedgerAccountList,
// } from './LedgerAccountList';
import { toast } from 'react-toastify';

import { useDeriveLedgerAccounts } from './hooks/useDeriveLedgerAccounts';
import { useImportLedgerAccountsMutation } from './hooks/useImportLedgerAccountsMutation';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { useAppSelector } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';

import type { SerializedLedgerAccount } from '_src/shared/cryptography/LedgerAccount';

const numLedgerAccountsToDeriveByDefault = 10;

const LEDGER_HOME = "/home/ledger";

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
                    !accountInfos.some(
                        (account) => account.address === address
                    )
            );
        },
        onError: (error) => {
            toast.error(
                `Something went wrong. ${error}`
            );
            navigate(LEDGER_HOME);
        },
    });

    const importLedgerAccountsMutation = useImportLedgerAccountsMutation({
        onSuccess: () => navigate(LEDGER_HOME),
        onError: () => {
            toast.error('There was an issue importing your Ledger accounts.');
        },
    });

    const onAccountClick = useCallback(
        (targetAccount: SelectableLedgerAccount) => {
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

    const numImportableAccounts = ledgerAccounts?.length;
    const numSelectedAccounts = selectedLedgerAccounts.length;

    const areAllAccountsImported = numImportableAccounts === 0;
    const areAllAccountsSelected =
        numSelectedAccounts === numImportableAccounts;

    const isUnlockButtonDisabled = numSelectedAccounts === 0;
    const isSelectAllButtonDisabled =
        areAllAccountsImported || areAllAccountsSelected;

    let summaryCardBody: JSX.Element | null = null;
    if (areLedgerAccountsLoading) {
        summaryCardBody = (
            <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                <LoadingIndicator />
                <Body>
                    Looking for accounts
                </Body>
            </div>
        );
    } else if (areAllAccountsImported) {
        summaryCardBody = (
            <div className="w-full h-full flex flex-col justify-center items-center gap-2">
                <HandThumbUpIcon width={30} />
                <Body>
                    All Ledger accounts have been imported.
                </Body>
            </div>
        );
    } else if (!encounteredDerviceAccountsError) {
        const selectedLedgerAddresses = selectedLedgerAccounts.map(
            ({ address }) => address
        );
        summaryCardBody = (
            <div className="max-h-[272px] -mr-2 mt-1 pr-2 overflow-auto custom-scrollbar">
                <LedgerAccountList
                    accounts={ledgerAccounts.map((ledgerAccount) => ({
                        ...ledgerAccount,
                        isSelected: selectedLedgerAddresses.includes(
                            ledgerAccount.address
                        ),
                    }))}
                    onAccountClick={onAccountClick}
                />
            </div>
        );
    }

    return (
        <OveOvrlay
            showModal
            title="Import Accounts"
            closeOverlay={() => {
                navigate(accountsUrl);
            }}
        >
            <div className="w-full flex flex-col gap-5">
                <div className="h-full bg-white flex flex-col border border-solid border-gray-45 rounded-2xl">
                    <div className="text-center bg-gray-40 py-2.5 rounded-t-2xl">
                        <Text
                            variant="captionSmall"
                            weight="bold"
                            color="steel-darker"
                            truncate
                        >
                            {areAllAccountsImported
                                ? 'Ledger Accounts '
                                : 'Connect Ledger Accounts'}
                        </Text>
                    </div>
                    <div className="grow px-4 py-2">{summaryCardBody}</div>
                    <div className="w-full rounded-b-2xl border-x-0 border-b-0 border-t border-solid border-gray-40 text-center pt-3 pb-4">
                        <div className="w-fit ml-auto mr-auto">
                            <Link
                                text="Select All Accounts"
                                color="heroDark"
                                weight="medium"
                                onClick={() => {
                                    if (ledgerAccounts) {
                                        setSelectedLedgerAccounts(
                                            ledgerAccounts
                                        );
                                    }
                                }}
                                disabled={isSelectAllButtonDisabled}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        variant="primary"
                        size="tall"
                        before={<UnlockedLockIcon />}
                        text="Unlock"
                        loading={importLedgerAccountsMutation.isLoading}
                        disabled={isUnlockButtonDisabled}
                        onClick={() =>
                            importLedgerAccountsMutation.mutate(
                                selectedLedgerAccounts
                            )
                        }
                    />
                </div>
            </div>
        </Overlay>
    );
}

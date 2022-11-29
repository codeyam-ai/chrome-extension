import { useCallback, useEffect, useState } from 'react';

import { useNextSettingsUrl } from '../../settings-menu/hooks';
import Transactions from '_src/background/Transactions';
import { useAppSelector, useMiddleEllipsis } from '_src/ui/app/hooks';
import NavBarWithBackAndTitle from '_src/ui/app/shared/navigation/nav-bar/NavBarWithBackAndTitle';

import type { PreapprovalRequest } from '_src/shared/messaging/messages/payloads/transactions';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

type GroupedPreapprovals = {
    name: string;
    address: string;
    color: string;
    preapprovals: PreapprovalRequest[];
};

export default function Preapprovals() {
    const mainMenuUrl = useNextSettingsUrl(true, '/');

    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const [preapprovals, setPreapprovals] = useState<PreapprovalRequest[]>([]);
    const [groupedPreapprovals, setGroupedPreapprovals] = useState<Record<
        string,
        GroupedPreapprovals
    > | null>(null);

    const getPreapprovals = useCallback(async () => {
        const _preapprovals = await Transactions.getPreapprovalRequests();
        setPreapprovals(Object.values(_preapprovals));
    }, []);

    useEffect(() => {
        getPreapprovals();
    }, [getPreapprovals]);

    useEffect(() => {
        const groupPreapprovals = async () => {
            const findAccountInfo = (address: string) =>
                accountInfos.find(
                    (accountInfo: AccountInfo) =>
                        accountInfo.address === address
                );

            const _groupedPreapprovals = preapprovals.reduce(
                (groups, preapprovalRequest) => {
                    const address = preapprovalRequest.preapproval.address;
                    const defaultWallet = { name: 'Wallet', color: '#7E23CA' };
                    const { name: accountName, color: accountColor } =
                        findAccountInfo(address) || defaultWallet;
                    const name = accountName || defaultWallet.name;
                    const color = accountColor || defaultWallet.color;
                    const group = groups[name] || {
                        name,
                        address,
                        color,
                        preapprovals: [],
                    };
                    group.preapprovals.push(preapprovalRequest);
                    groups[name] = group;
                    return groups;
                },
                {} as Record<string, GroupedPreapprovals>
            );

            setGroupedPreapprovals(_groupedPreapprovals);
        };

        groupPreapprovals();
    }, [accountInfos, preapprovals]);

    const Preapproval = ({
        preapprovalRequest,
        onRevoke,
    }: {
        preapprovalRequest: PreapprovalRequest;
        onRevoke: () => void;
    }) => {
        const { maxTransactionCount, totalGasLimit, transactions } =
            preapprovalRequest.preapproval;

        const [showDetails, setShowDetails] = useState(false);

        const _toggleDetails = useCallback(() => {
            setShowDetails((prev) => !prev);
        }, []);

        const _handleRevoke = useCallback(async () => {
            await Transactions.removePreapprovalRequest(
                preapprovalRequest.id as string
            );

            onRevoke();
        }, [preapprovalRequest.id, onRevoke]);

        return (
            <div className="mb-6 p-3 rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm dark:border-gray-500 dark:bg-gray-700">
                <div className="flex gap-3 items-center justify-between">
                    <div className="mt-1">
                        {preapprovalRequest.originFavIcon && (
                            <img
                                className="w-9 h-9 rounded-sm"
                                src={preapprovalRequest.originFavIcon}
                                alt="Site favicon"
                            />
                        )}
                    </div>

                    <div className="truncate">
                        <div className="text-base">
                            {preapprovalRequest.originTitle ||
                                preapprovalRequest.origin}
                        </div>
                        <div className="">
                            {preapprovalRequest.preapproval.module}:{' '}
                            {preapprovalRequest.preapproval.function}
                        </div>
                    </div>

                    <div className="flex-shrink-0">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-500 border-red-500 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:text-white dark:border-none dark:hover:border-none"
                            onClick={_handleRevoke}
                        >
                            Revoke
                        </button>
                    </div>
                </div>
                <div
                    className="text-xs pt-2 cursor-pointer"
                    onClick={_toggleDetails}
                >
                    {showDetails ? '▼' : '▶'} Show Details
                    {showDetails && (
                        <div className="mt-1">
                            <div className="p-1 flex justify-between bg-white dark:bg-gray-600">
                                <div>Transactions Remaining:</div>
                                <div>{maxTransactionCount}</div>
                            </div>
                            <div className="p-1 flex justify-between bg-gray-50 dark:bg-gray-700">
                                <div>Gas Remaining:</div>
                                <div>{totalGasLimit}</div>
                            </div>
                            <div className="p-1 flex justify-between bg-white dark:bg-gray-600">
                                <div>Transactions Executed:</div>
                                <div>{transactions.length}</div>
                            </div>
                            <div className="p-1 flex justify-between bg-gray-50 dark:bg-gray-700">
                                <div>Total Gas Used:</div>
                                <div>
                                    {transactions.reduce(
                                        (total, transaction) =>
                                            total + transaction.gasUsed,
                                        0
                                    )}
                                </div>
                            </div>
                            <div className="p-1 flex justify-between bg-white dark:bg-gray-600">
                                <div>Avg Gas / Transaction:</div>
                                <div>
                                    {Math.round(
                                        (transactions.reduce(
                                            (total, transaction) =>
                                                total + transaction.gasUsed,
                                            0
                                        ) /
                                            transactions.length) *
                                            100
                                    ) / 100}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const PreapprovalGroup = ({
        info,
        onRevoke,
    }: {
        info: GroupedPreapprovals;
        onRevoke: () => void;
    }) => {
        const { name, color, address, preapprovals } = info;

        const truncatedAddress = useMiddleEllipsis(address);
        return (
            <div key={`wallet-connections-${name}`} className="mb-12">
                <div className="flex gap-3 items-center mb-3">
                    <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <div className="flex flex-col">
                        <div className="text-lg">{name}</div>
                        <div>{truncatedAddress}</div>
                    </div>
                </div>
                <ul className="grid grid-cols-1 gap-2">
                    {preapprovals.map(
                        (
                            preapprovalRequest: PreapprovalRequest,
                            index: number
                        ) => (
                            <Preapproval
                                key={`revoke-${index}`}
                                preapprovalRequest={preapprovalRequest}
                                onRevoke={onRevoke}
                            />
                        )
                    )}
                </ul>
            </div>
        );
    };

    return (
        <>
            <NavBarWithBackAndTitle
                title="Pre-Approved Transactions"
                backLink={mainMenuUrl}
            />
            <div className="px-6 text-left">
                {Object.keys(groupedPreapprovals || {})
                    .sort()
                    .map((walletName, index) => (
                        <PreapprovalGroup
                            key={`permission-revoke-group-${index}`}
                            info={(groupedPreapprovals || {})[walletName]}
                            onRevoke={getPreapprovals}
                        />
                    ))}
            </div>
        </>
    );
}

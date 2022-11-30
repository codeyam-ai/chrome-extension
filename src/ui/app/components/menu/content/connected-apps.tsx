import { useCallback, useEffect, useState } from 'react';

import Permissions from '../../../../../background/Permissions';
import formatUrl from '_src/ui/app/helpers/format-url';
import truncateString from '_src/ui/app/helpers/truncate-string';
import { useAppSelector, useMiddleEllipsis } from '_src/ui/app/hooks';

import type { Permission } from '_src/shared/messaging/messages/payloads/permissions';
import type { AccountInfo } from '_src/ui/app/KeypairVault';

type GroupedPermissions = {
    name: string;
    address: string;
    color: string;
    permissions: Permission[];
};

export default function ConnectedApps() {
    const accountInfos = useAppSelector(({ account }) => account.accountInfos);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [groupedPermissions, setGroupedPermissions] = useState<Record<
        string,
        GroupedPermissions
    > | null>(null);

    const revokePermissions = useCallback(
        async (origin: string) => {
            await Permissions.revokeAllPermissions(origin);
            // remove site from UI (thinking about how I can do this by having state keep track of current permissions instead)
            const updatedPermissions = permissions.filter(
                (p) => p.origin !== origin
            );
            setPermissions(updatedPermissions);
        },
        [permissions]
    );

    useEffect(() => {
        const getPermissions = async () => {
            const permissions = Object.values(
                await Permissions.getPermissions()
            );
            setPermissions(permissions);
        };
        getPermissions();
    }, []);

    useEffect(() => {
        const groupPermissions = async () => {
            const findAccountInfo = (address: string) =>
                accountInfos.find(
                    (accountInfo: AccountInfo) =>
                        accountInfo.address === address
                );

            const _groupedPermissions = permissions.reduce(
                (groups, permission) => {
                    const address = permission.accounts[0];
                    const defaultWallet = { name: 'Wallet', color: '#7E23CA' };
                    const { name: accountName, color: accountColor } =
                        findAccountInfo(address) || defaultWallet;
                    const name = accountName || defaultWallet.name;
                    const color = accountColor || defaultWallet.color;
                    const group = groups[name] || {
                        name,
                        address,
                        color,
                        permissions: [],
                    };
                    group.permissions.push(permission);
                    groups[name] = group;
                    return groups;
                },
                {} as Record<string, GroupedPermissions>
            );

            setGroupedPermissions(_groupedPermissions);
        };

        groupPermissions();
    }, [accountInfos, permissions]);

    const PermissionRevoke = ({ permission }: { permission: Permission }) => {
        // With the current implementation in `Permissions.ts`, we
        // remove a permission by updating the "permissions" field
        // to be empty.

        const _handleRevoke = useCallback(() => {
            revokePermissions(permission.origin);
        }, [permission.origin]);

        if (permission.permissions.length > 0) {
            return (
                <li
                    key={permission.origin}
                    className="col-span-1 flex rounded-md shadow-sm"
                >
                    <div className="flex flex-1 relative truncate items-center space-x-4 rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm dark:border-gray-500 dark:bg-gray-700">
                        <div className="flex-1 flex items-center gap-2">
                            {permission.favIcon && (
                                <img
                                    className="w-6 h-6 rounded-sm"
                                    src={permission.favIcon}
                                    alt="Site favicon"
                                />
                            )}
                            <div className="flex-1 flex flex-col w-1/2 truncate text-sm">
                                {permission.title && (
                                    <a
                                        href={permission.origin}
                                        target="_blank"
                                        className="block"
                                        rel="noreferrer"
                                    >
                                        {truncateString(
                                            formatUrl(permission.title),
                                            24
                                        )}
                                    </a>
                                )}
                                <a
                                    href={permission.origin}
                                    target="_blank"
                                    className="block underline text-xs"
                                    rel="noreferrer"
                                >
                                    {formatUrl(permission.origin)}
                                </a>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-500 border-red-500 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-600 dark:bg-red-500 dark:hover:bg-red-600 dark:text-white dark:border-none dark:hover:border-none"
                                onClick={_handleRevoke}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </li>
            );
        }

        return <></>;
    };

    const PermissionRevokeGroup = ({ info }: { info: GroupedPermissions }) => {
        const { name, color, address, permissions } = info;

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
                    {permissions.map(
                        (permission: Permission, index: number) => (
                            <PermissionRevoke
                                key={`revoke-${index}`}
                                permission={permission}
                            />
                        )
                    )}
                </ul>
            </div>
        );
    };

    return (
        <>
            <div className="px-6">
                {Object.keys(groupedPermissions || {})
                    .sort()
                    .map((walletName, index) => (
                        <PermissionRevokeGroup
                            key={`permission-revoke-group-${index}`}
                            info={(groupedPermissions || {})[walletName]}
                        />
                    ))}
            </div>
        </>
    );
}

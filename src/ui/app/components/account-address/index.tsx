// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from 'classnames';

import CopyToClipboard from '_components/copy-to-clipboard';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import { useAppSelector, useMiddleEllipsis } from '_hooks';

import type { AccountInfo } from '../../KeypairVault';

import st from './AccountAddress.module.scss';

export enum AddressMode {
    SMALL = 'small',
    NORMAL = 'base',
    FADED = 'faded',
}

type AccountAddressProps = {
    className?: string;
    showName?: boolean;
    showLink?: boolean;
    shorten?: boolean;
    mode?: AddressMode;
};

function AccountAddress({
    className,
    showName = true,
    showLink = true,
    shorten = true,
    mode = AddressMode.NORMAL,
}: AccountAddressProps) {
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );
    const address = useAppSelector(({ account }) => account.address);

    const shortenAddress = useMiddleEllipsis(address, 10, 6);
    const cpIconMode = mode === AddressMode.NORMAL ? 'normal' : 'highlighted';
    const dotSize = mode === AddressMode.SMALL ? 'h-3 w-3' : 'h-5 w-5';
    const textSize = mode === AddressMode.SMALL ? 'text-xs' : 'text-sm';
    return (
        <div className="flex gap-1 justify-center items-center">
            {showName && accountInfo && (
                <>
                    <div
                        className={`${dotSize} rounded-full flex items-center justify-center`}
                        style={{
                            backgroundColor: accountInfo.color || '#7E23CA',
                        }}
                    >
                        {/* {editWallet && (
                        <svg
                            viewBox="0 0 24 24"
                            width="12"
                            height="12"
                            stroke="white"
                            strokeWidth="2"
                            fill="black"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={_selectWallet}
                        >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    )} */}
                    </div>
                    <div className={textSize}>
                        {accountInfo.name || 'Wallet'}:
                    </div>
                </>
            )}
            {address ? (
                <span className={cl(st.addressContainer, className)}>
                    <CopyToClipboard txt={address} mode={cpIconMode}>
                        <span
                            className={`${textSize} font-medium break-words flex-1 min-w-0 text-gray-700 dark:text-gray-400`}
                        >
                            {shorten ? shortenAddress : address}
                        </span>
                    </CopyToClipboard>
                    {showLink ? (
                        <ExplorerLink
                            type={ExplorerLinkType.address}
                            useActiveAddress={true}
                            title="View account on Sui Explorer"
                            className={st.explorerLink}
                        />
                    ) : null}
                </span>
            ) : (
                <></>
            )}
        </div>
    );
}

export default AccountAddress;

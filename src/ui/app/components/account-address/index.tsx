// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import cl from 'classnames';

import CopyToClipboard from '_components/copy-to-clipboard';
import ExplorerLink from '_components/explorer-link';
import { ExplorerLinkType } from '_components/explorer-link/ExplorerLinkType';
import { useAppSelector, useMiddleEllipsis } from '_hooks';
import { TextColor } from '_src/enums/Typography';

import type { AccountInfo } from '../../KeypairVault';
import Body from '../../shared/typography/Body';

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
                    ></div>
                    <Body>{accountInfo.name || 'Wallet'}:</Body>
                </>
            )}
            {address ? (
                <span className={cl(st.addressContainer, className)}>
                    <CopyToClipboard txt={address} mode={cpIconMode}>
                        <Body textColor={TextColor.Medium}>
                            {shorten ? shortenAddress : address}
                        </Body>
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

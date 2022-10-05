// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CoinBalance from './coin-balance';
import AccountAddress, { AddressMode } from '_components/account-address';
import Alert from '_components/alert';
import Loading from '_components/loading';
import { useAppSelector, useObjectsState } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import { TextColor, LinkType } from '_src/enums/TypographyEnums';
import { DASHBOARD_LINK } from '_src/shared/constants';
import { useNextMenuUrl } from '_src/ui/app/components/menu/hooks';
import Divider from '_src/ui/app/shared/Divider';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

import st from './TokensPage.module.scss';

function TokensPage() {
    const [editWallet, setEditWallet] = useState<boolean>(false);

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const { loading, error, showError } = useObjectsState();
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const suiBalance = balances[GAS_TYPE_ARG] || BigInt(0);
    const otherCoinTypes = useMemo(
        () => Object.keys(balances).filter((aType) => aType !== GAS_TYPE_ARG),
        [balances]
    );

    const switchWalletUrl = useNextMenuUrl(true, '/switch-wallet');
    const navigate = useNavigate();

    const _selectWallet = useCallback(() => {
        navigate(switchWalletUrl);
    }, [navigate, switchWalletUrl]);

    const _showEdit = useCallback(() => {
        setEditWallet(true);
    }, []);

    const _hideEdit = useCallback(() => {
        setEditWallet(false);
    }, []);

    return (
        <div className="flex h-full max-w-full flex-col">
            {showError && error ? (
                <Alert className={st.alert}>
                    <strong>Sync error (data might be outdated).</strong>{' '}
                    <small>{error.message}</small>
                </Alert>
            ) : null}
            <div className="flex items-center gap-1 cursor-pointer">
                <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={_selectWallet}
                    onMouseOver={_showEdit}
                    onMouseOut={_hideEdit}
                >
                    <div
                        className="h-5 w-5 rounded-full flex items-center justify-center"
                        style={{
                            backgroundColor: accountInfo?.color || '#7E23CA',
                        }}
                    >
                        {editWallet && (
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
                        )}
                    </div>
                    <div>{accountInfo?.name || 'Wallet'}:</div>
                </div>
                <AccountAddress
                    showName={false}
                    showLink={false}
                    mode={AddressMode.FADED}
                />
            </div>
            <div className="my-6">
                <Divider />
            </div>
            <div className="text-3xl">
                <Loading loading={loading}>
                    <CoinBalance
                        balance={suiBalance}
                        type={GAS_TYPE_ARG}
                        mode="standalone"
                    />
                </Loading>
            </div>
            <div className="my-6">
                <Divider />
            </div>
            {/* <div className={st.actions}>
                <IconLink
                    icon={SuiIcons.Coins}
                    to="/"
                    disabled={true}
                    text="Buy, Sell & Swap"
                />
                <IconLink
                    icon={SuiIcons.HandCoins}
                    to="/"
                    disabled={true}
                    text="Send & Receive"
                />
                <IconLink
                    icon={SuiIcons.PercentagePolygon}
                    to="/stake-new"
                    disabled={process.env.NODE_ENV !== 'development'}
                    text="Stake & Earn"
                />
            </div> */}
            <Loading loading={loading} className={st.othersLoader}>
                {otherCoinTypes.length ? (
                    otherCoinTypes.map((aCoinType) => {
                        const aCoinBalance = balances[aCoinType];
                        return (
                            <>
                                <div className={st.title}>OTHER COINS</div>
                                <CoinBalance
                                    type={aCoinType}
                                    balance={aCoinBalance}
                                    key={aCoinType}
                                />
                            </>
                        );
                    })
                ) : (
                    <>
                        <BodyLarge as="h3">Get started with Sui</BodyLarge>
                        <Body as="p" textColor={TextColor.Medium}>
                            Interested in Sui but don&apos;t know where to
                            start? We&apos;ve got you covered.
                        </Body>
                        <Body>
                            <EthosLink
                                type={LinkType.External}
                                to={DASHBOARD_LINK}
                            >
                                Discover new apps →
                            </EthosLink>
                        </Body>
                    </>
                )}
            </Loading>
        </div>
    );
}

export default TokensPage;

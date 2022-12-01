// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import CoinList from './CoinList';
import Loading from '_components/loading';
import { useAppSelector, useObjectsState } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import { LinkType } from '_src/enums/LinkType';
import { DASHBOARD_LINK } from '_src/shared/constants';
import SendReceiveButtonGroup from '_src/ui/app/shared/buttons/SendReceiveButtonGroup';
import Alert from '_src/ui/app/shared/feedback/Alert';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import { AccountInfo } from '_src/ui/app/KeypairVault';
import WalletBalanceAndIconHomeView from './WalletBalanceAndIconHomeView';
import { useMemo } from 'react';

function TokensPage() {
    const { loading, error, showError } = useObjectsState();
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const mistBalance = balances[GAS_TYPE_ARG] || BigInt(0);
    // TODO: make this an actual calculation
    const dollarValue = useMemo(
        () => Number(mistBalance / BigInt(10000000)),
        [mistBalance]
    );
    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    return (
        <>
            {false && showError && error ? (
                <div className="px-6 py-6">
                    <Alert
                        title="Something's wrong"
                        subtitle="You've lost connection with the network. Sui DevNet may be unstable. Please refresh or try again later."
                    />
                </div>
            ) : (
                <>
                    <Loading
                        loading={loading}
                        big={true}
                        className="flex py-6 justify-center items-center"
                    >
                        <WalletBalanceAndIconHomeView
                            accountInfo={accountInfo!}
                            dollarValue={dollarValue}
                        />
                        <SendReceiveButtonGroup mistBalance={mistBalance} />
                        <div className="flex flex-col gap-6 pb-6 overflow-auto">
                            <ContentBlock>
                                <CoinList balances={balances} />

                                {(!balances ||
                                    Object.keys(balances).length < 2) && (
                                    <>
                                        <Subheader as="h3">
                                            Get started with Sui
                                        </Subheader>
                                        <Body as="p" isTextColorMedium>
                                            Interested in SUI but not sure where
                                            to start?
                                        </Body>
                                        <Body as="p" isTextColorMedium>
                                            <EthosLink
                                                type={LinkType.External}
                                                to={DASHBOARD_LINK}
                                            >
                                                Discover New Apps →
                                            </EthosLink>
                                        </Body>
                                    </>
                                )}
                            </ContentBlock>
                        </div>
                    </Loading>
                </>
            )}
        </>
    );
}

export default TokensPage;

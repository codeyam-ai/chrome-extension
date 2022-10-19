// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';

import CoinBalance from './CoinBalance';
import Alert from '_components/alert';
import Loading from '_components/loading';
import { useAppSelector, useObjectsState } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import { LinkType } from '_src/enums/LinkType';
import { TextColor } from '_src/enums/Typography';
import { DASHBOARD_LINK, MIST_PER_SUI } from '_src/shared/constants';
import SendReceiveButtonGroup from '_src/ui/app/shared/buttons/SendReceiveButtonGroup';
import AmountRow from '_src/ui/app/shared/content/rows-and-lists/AmountRow';
import WalletRow from '_src/ui/app/shared/content/rows-and-lists/WalletRow';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

function TokensPage() {
    const { loading, error, showError } = useObjectsState();
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const mistBalance = balances[GAS_TYPE_ARG] || BigInt(0);
    const otherCoinTypes = useMemo(
        () => Object.keys(balances).filter((aType) => aType !== GAS_TYPE_ARG),
        [balances]
    );

    return (
        <div>
            {showError && error ? (
                <Alert>
                    <strong>Sync error (data might be outdated).</strong>{' '}
                    <small>{error.message}</small>
                </Alert>
            ) : null}
            <WalletRow />
            <Loading loading={loading}>
                <AmountRow
                    balance={Number(mistBalance) / MIST_PER_SUI}
                    type={GAS_TYPE_ARG}
                />
                <SendReceiveButtonGroup mistBalance={mistBalance} />

                {otherCoinTypes.length ? (
                    otherCoinTypes.map((aCoinType) => {
                        const aCoinBalance = balances[aCoinType];
                        return (
                            <>
                                <div className="">OTHER COINS</div>
                                <CoinBalance
                                    type={aCoinType}
                                    balance={aCoinBalance}
                                    key={aCoinType}
                                />
                            </>
                        );
                    })
                ) : (
                    <ContentBlock>
                        <Subheader as="h3">Get started with Sui</Subheader>
                        <Body as="p" textColor={TextColor.Medium}>
                            Interested in SUI but not sure where to start?
                        </Body>
                        <Body>
                            <EthosLink
                                type={LinkType.External}
                                to={DASHBOARD_LINK}
                            >
                                Discover New Apps →
                            </EthosLink>
                        </Body>
                    </ContentBlock>
                )}
            </Loading>
        </div>
    );
}

export default TokensPage;

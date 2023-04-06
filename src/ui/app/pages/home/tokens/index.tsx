// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SUI_TYPE_ARG } from '@mysten/sui.js';

import CoinList from './CoinList';
import WalletBalanceAndIconHomeView from './WalletBalanceAndIconHomeView';
import { DappList } from './dapp/DappList';
import { sampleData } from './dapp/dappData';
import { useAppSelector, useExplorerPermission, useFormatCoin } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { LinkType } from '_src/enums/LinkType';
import { DASHBOARD_LINK } from '_src/shared/constants';
import { sumCoinBalances } from '_src/ui/app/helpers/sumCoinBalances';
import SendReceiveButtonGroup from '_src/ui/app/shared/buttons/SendReceiveButtonGroup';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

function TokensPage() {
    const setExplorerPermission = useExplorerPermission();
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const mistBalance = sumCoinBalances(balances) || 0;
    const [, , usdAmount] = useFormatCoin(mistBalance, SUI_TYPE_ARG);

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const showDappList = false;

    return (
        <>
            {showDappList && <DappList data={sampleData} />}
            <WalletBalanceAndIconHomeView
                accountInfo={accountInfo}
                dollarValue={usdAmount}
            />

            <SendReceiveButtonGroup mistBalance={mistBalance} />
            <div className="flex flex-col gap-6 pb-6 overflow-auto">
                <ContentBlock>
                    <CoinList balances={balances} />

                    {(!balances || Object.keys(balances).length < 2) && (
                        <div className="py-3">
                            <Subheader as="h3">Get started with Sui</Subheader>
                            <Body as="p" isTextColorMedium>
                                Interested in SUI but not sure where to start?
                            </Body>
                            <Body as="p" isTextColorMedium>
                                <EthosLink
                                    type={LinkType.External}
                                    to={DASHBOARD_LINK}
                                    onMouseOver={setExplorerPermission}
                                >
                                    Discover New Apps →
                                </EthosLink>
                            </Body>
                        </div>
                    )}
                </ContentBlock>
            </div>
        </>
    );
}

export default TokensPage;

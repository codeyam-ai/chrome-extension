// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useFormatCoin } from '../../../hooks/useFormatCoin';
import CoinList from './CoinList';
import WalletBalanceAndIconHomeView from './WalletBalanceAndIconHomeView';
import Loading from '_components/loading';
import { useAppSelector, useObjectsState } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import { LinkType } from '_src/enums/LinkType';
import { DASHBOARD_LINK } from '_src/shared/constants';
import SendReceiveButtonGroup from '_src/ui/app/shared/buttons/SendReceiveButtonGroup';
import Alert from '_src/ui/app/shared/feedback/Alert';
import NavBarWithSettingsAndWalletPicker from '_src/ui/app/shared/navigation/nav-bar/NavBarWithSettingsAndWalletPicker';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

function TokensPage() {
    const { loading, error, showError } = useObjectsState();
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const mistBalance = balances[GAS_TYPE_ARG] || 0;
    const [, , usdAmount] = useFormatCoin(mistBalance, 'SUI');

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    return (
        <>
            <NavBarWithSettingsAndWalletPicker />
            {showError && error ? (
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
                            accountInfo={accountInfo}
                            dollarValue={usdAmount}
                        />
                        <SendReceiveButtonGroup mistBalance={mistBalance} />
                        <div className="flex flex-col gap-6 pb-6 overflow-auto">
                            <ContentBlock>
                                <CoinList balances={balances} />

                                {(!balances ||
                                    Object.keys(balances).length < 2) && (
                                    <div className="py-3">
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
                                    </div>
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

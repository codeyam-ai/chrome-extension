import { SUI_TYPE_ARG } from '@mysten/sui.js';

import CoinList from './CoinList';
import StakedInfo from './StakedInfo';
import TestBiometrics from './TEST_biometrics';
import WalletBalanceAndIconHomeView from './WalletBalanceAndIconHomeView';
import { DappList } from './dapp/DappList';
import ChainIndicator from '../../dapp-tx-approval/types/ChainIndicator';
import { useAppSelector } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { LinkType } from '_src/enums/LinkType';
import { DASHBOARD_LINK } from '_src/shared/constants';
import { useTotalStakedSUI } from '_src/ui/app/hooks/staking/useTotalStakedSUI';
import { useFavoriteDapps } from '_src/ui/app/hooks/useFavoriteDapps';
import SendReceiveButtonGroup from '_src/ui/app/shared/buttons/SendReceiveButtonGroup';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { AccountInfo } from '_src/ui/app/KeypairVault';

function HomePage() {
    const { favoriteDappsForCurrentNetwork, favoriteDapps } =
        useFavoriteDapps();
    const { totalActivePendingStakedSUI, isLoading: isLoadingStakedSui } =
        useTotalStakedSUI();

    const [selectedApiEnv] = useAppSelector(({ app }) => [app.apiEnv]);

    const balances = useAppSelector(accountAggregateBalancesSelector);
    const mistBalance = balances[SUI_TYPE_ARG];

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const showDappList = true;

    return (
        <div className="flex flex-col">
            {showDappList && (
                <DappList
                    dapps={favoriteDappsForCurrentNetwork ?? favoriteDapps}
                />
            )}
            <ChainIndicator apiEnv={selectedApiEnv} className="mt-3" />
            <div className="pt-5 pb-4">
                <WalletBalanceAndIconHomeView
                    accountInfo={accountInfo}
                    mistBalance={mistBalance}
                />
            </div>

            <SendReceiveButtonGroup mistBalance={mistBalance} />
            <div className="flex flex-col gap-6 overflow-auto">
                <ContentBlock>
                    {!isLoadingStakedSui &&
                        totalActivePendingStakedSUI > BigInt('0') && (
                            <StakedInfo
                                totalActivePendingStakedSUI={
                                    totalActivePendingStakedSUI
                                }
                            />
                        )}

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
                                >
                                    Discover New Apps →
                                </EthosLink>
                            </Body>
                        </div>
                    )}
                </ContentBlock>
            </div>
        </div>
    );
}

export default HomePage;

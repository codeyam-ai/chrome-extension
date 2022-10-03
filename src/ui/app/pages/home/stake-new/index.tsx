// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import StakedCard from './staked-card';
import BottomMenuLayout, {
    Content,
    Menu,
} from '_app/shared/bottom-menu-layout';
import CoinBalance from '_app/shared/coin-balance';
import PageTitle from '_app/shared/page-title';
import StatsCard, { StatsRow, StatsItem } from '_app/shared/stats-card';
import Icon, { SuiIcons } from '_components/icon';
import { GAS_SYMBOL } from '_redux/slices/sui-objects/Coin';
import SuiButton from '_src/ui/app/shared/sui-button';

import st from './StakeHome.module.scss';

const DEMO_STAKED = Array.from({ length: 7 }).map((_, index) => (
    <StakedCard
        key={index}
        apy={Math.floor(Math.random() * 3500) / 100}
        balance={BigInt(Math.floor(100 * Math.random() + 1))}
        symbol="SUI"
        validator={`Validator ${index + 1}`}
        rewards={!Math.floor(Math.random() + 0.5)}
    />
));

function StakeHome() {
    return (
        <div className={st.container}>
            <PageTitle title="Stake & Earn" className={st.pageTitle} />
            <BottomMenuLayout>
                <Content>
                    <div className={st.pageDescription}>
                        Staking SUI provides SUI holders with rewards in
                        addition to market price gains.
                    </div>
                    <StatsCard className={st.stats}>
                        <StatsRow>
                            <StatsItem
                                title="Total Staked"
                                value={
                                    <CoinBalance
                                        balance={BigInt(50)}
                                        symbol={GAS_SYMBOL}
                                        diffSymbol={true}
                                    />
                                }
                            />
                            <StatsItem
                                title="Rewards Collected"
                                value={
                                    <CoinBalance
                                        balance={BigInt(12)}
                                        symbol={GAS_SYMBOL}
                                        mode="positive"
                                        diffSymbol={true}
                                    />
                                }
                            />
                        </StatsRow>
                    </StatsCard>
                    <div className={st.titleSectionContainer}>
                        <span className={st.sectionTitle}>
                            Currently Staking
                        </span>
                        <SuiButton size="small" mode="primary">
                            <span>Claim All Rewards</span>
                            <Icon
                                icon={SuiIcons.ArrowRight}
                                className={st.arrowIcon}
                            />
                        </SuiButton>
                    </div>
                    <div className={st.stakedContainer}>{DEMO_STAKED}</div>
                </Content>
                <Menu stuckClass={st.shadow}>
                    <SuiButton
                        size="large"
                        mode="neutral"
                        className={st.action}
                    >
                        <Icon
                            icon={SuiIcons.Close}
                            className={st.closeActionIcon}
                        />
                        Cancel
                    </SuiButton>
                    <SuiButton
                        size="large"
                        mode="primary"
                        className={st.action}
                    >
                        Stake Coins
                        <Icon
                            icon={SuiIcons.ArrowRight}
                            className={st.arrowActionIcon}
                        />
                    </SuiButton>
                </Menu>
            </BottomMenuLayout>
        </div>
    );
}

export default StakeHome;

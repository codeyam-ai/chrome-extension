// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import CoinList from './CoinList';
import Loading from '_components/loading';
import { useAppSelector, useObjectsState } from '_hooks';
import { accountAggregateBalancesSelector } from '_redux/slices/account';
import { GAS_TYPE_ARG } from '_redux/slices/sui-objects/Coin';
import { LinkType } from '_src/enums/LinkType';
import { TextColor } from '_src/enums/Typography';
import { DASHBOARD_LINK } from '_src/shared/constants';
import SendReceiveButtonGroup from '_src/ui/app/shared/buttons/SendReceiveButtonGroup';
import AmountRow from '_src/ui/app/shared/content/rows-and-lists/AmountRow';
import Alert from '_src/ui/app/shared/feedback/Alert';
import Body from '_src/ui/app/shared/typography/Body';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

function TokensPage() {
    const { loading, error, showError } = useObjectsState();
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const mistBalance = balances[GAS_TYPE_ARG] || BigInt(0);

    return (
        <>
            {showError && error ? (
                // <Alert>
                //     <strong>Something&apos;s wrong.</strong>{' '}
                //     <small>{error.message}</small>
                // </Alert>
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
                        <div className="py-2">
                            <AmountRow
                                balance={mistBalance}
                                type={GAS_TYPE_ARG}
                            />
                            <SendReceiveButtonGroup mistBalance={mistBalance} />
                        </div>
                        <div className="flex flex-col gap-6 pb-6 h-[177px] overflow-auto">
                            <CoinList balances={balances} />
                            <ContentBlock>
                                <Subheader as="h3">
                                    Get started with Sui
                                </Subheader>
                                <Body as="p" textColor={TextColor.Medium}>
                                    Interested in SUI but not sure where to
                                    start?
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
                        </div>
                    </Loading>
                </>
            )}
        </>
    );
}

export default TokensPage;

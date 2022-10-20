import { LinkType } from '_src/enums/LinkType';
import { TextColor } from '_src/enums/Typography';
import { DASHBOARD_LINK } from '_src/shared/constants';
import AccountAddress from '../../components/account-address';
import NavBarWithBackAndTitle from '../../shared/navigation/nav-bar/NavBarWithBackAndTitle';
import PageTitle from '../../shared/page-title';
import Body from '../../shared/typography/Body';
import ContentBlock from '../../shared/typography/ContentBlock';
import EthosLink from '../../shared/typography/EthosLink';

const divider = (
    <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
        </div>
    </div>
);

export default function ReceivePage() {
    return (
        <>
            <NavBarWithBackAndTitle title="Get Some SUI" backLink="/tokens" />
            <ContentBlock>
                <Body isSemibold={true}>Wallet Address</Body>
                <Body textColor={TextColor.Medium}>
                    Coins and NFTs sent to this address will end up in your
                    wallet.
                </Body>
                <AccountAddress showLink={false} showName={false} />
                <Body textColor={TextColor.Medium}>
                    Interested in SUI but not sure where to start?
                </Body>
                <Body>
                    <EthosLink type={LinkType.External} to={DASHBOARD_LINK}>
                        Disover New Apps →
                    </EthosLink>
                </Body>
            </ContentBlock>
        </>
    );
}

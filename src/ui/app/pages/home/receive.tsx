import AccountAddress from '../../components/account-address';
import NavBarWithBackAndTitle from '../../shared/navigation/nav-bar/NavBarWithBackAndTitle';
import Body from '../../shared/typography/Body';
import ContentBlock from '../../shared/typography/ContentBlock';
import EthosLink from '../../shared/typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';
import { DASHBOARD_LINK } from '_src/shared/constants';

export default function ReceivePage() {
    return (
        <>
            <NavBarWithBackAndTitle title="Get Some SUI" backLink="/home" />
            <ContentBlock>
                <Body isSemibold={true}>Wallet Address</Body>
                <Body isTextColorMedium>
                    Coins and NFTs sent to this address will end up in your
                    wallet.
                </Body>
                <AccountAddress showLink={false} showName={false} />
                <Body isTextColorMedium>
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

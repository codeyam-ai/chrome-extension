import { LinkType } from '_src/enums/LinkType';
import { TextColor } from '_src/enums/Typography';
import { DASHBOARD_LINK } from '_src/shared/constants';
import AccountAddress from '../../components/account-address';
import NavBarWithBackAndTitle from '../../shared/navigation/nav-bar/NavBarWithBackAndTitle';
import PageTitle from '../../shared/page-title';
import Body from '../../shared/typography/Body';
import ContentBlock from '../../shared/typography/ContentBlock';
import EthosLink from '../../shared/typography/EthosLink';

export default function BuyPage() {
    return (
        <>
            <NavBarWithBackAndTitle title="Buy SUI" backLink="/tokens" />
            <ContentBlock>
                <Body isSemibold={true}>Not Available Yet</Body>
                <Body textColor={TextColor.Medium}>
                    SUI is in the DevNet stage right now, so you can not
                    purchase SUI.
                </Body>
                <Body textColor={TextColor.Medium}>
                    You can find a “faucet” that will give you free test tokens
                    in the{' '}
                    <EthosLink
                        type={LinkType.External}
                        to="https://discord.com/channels/916379725201563759/971488439931392130"
                    >
                        Sui Discord
                    </EthosLink>
                    .
                </Body>
                <Body textColor={TextColor.Medium}>
                    Here is your wallet address to request tokens:
                </Body>
                <AccountAddress showLink={false} showName={false} />
            </ContentBlock>
        </>
    );
}

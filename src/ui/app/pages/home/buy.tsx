import AccountAddress from '../../components/account-address';
import NavBarWithBackAndTitle from '../../shared/navigation/nav-bar/NavBarWithBackAndTitle';
import Body from '../../shared/typography/Body';
import ContentBlock from '../../shared/typography/ContentBlock';
import EthosLink from '../../shared/typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';

export default function BuyPage() {
    return (
        <>
            <NavBarWithBackAndTitle title="Buy SUI" backLink="/home" />
            <ContentBlock>
                <Body isSemibold={true}>Not Available Yet</Body>
                <Body isTextColorMedium>
                    SUI is in the DevNet stage right now, so you can not
                    purchase SUI.
                </Body>
                <Body isTextColorMedium>
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
                <Body isTextColorMedium>
                    Here is your wallet address to request tokens:
                </Body>
                <AccountAddress showLink={false} showName={false} />
            </ContentBlock>
        </>
    );
}

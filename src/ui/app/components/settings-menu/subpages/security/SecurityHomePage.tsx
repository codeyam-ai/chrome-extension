import { useNextSettingsUrl } from '../../hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

interface SecurityItem {
    title: string;
    description: string;
    buttonText: string;
    buttonTo: string;
}

const SecurityItem = ({ item }: { item: SecurityItem }) => {
    const { title, description, buttonText, buttonTo } = item;
    return (
        <div className="flex flex-col pt-6">
            <ContentBlock className="!px-0 !pb-4">
                <Header>{title}</Header>
                <BodyLarge isTextColorMedium>{description}</BodyLarge>
            </ContentBlock>
            <Button buttonStyle="secondary" to={buttonTo} isInline>
                {buttonText}
            </Button>
        </div>
    );
};

const SecurityHomePage = () => {
    const changePasswordUrl = useNextSettingsUrl(
        true,
        '/security/change-password'
    );
    const securityItems: SecurityItem[] = [
        {
            title: 'Passwords',
            description:
                'Your password is required to unlock Ethos after 15 minutes of inactivity.',
            buttonText: 'Update Password',
            buttonTo: changePasswordUrl,
        },
        {
            title: 'Recovery Phrases',
            description:
                'Recovery phrases gives you access to all wallets that are associated with it. Here, you can manage your recovery phrases.',
            buttonText: 'View Recovery Phrases',
            buttonTo: '/',
        },
        {
            title: 'Private Key',
            description:
                'Your private key grants access to the wallet that you are currently in.',
            buttonText: 'View Private Key',
            buttonTo: '/',
        },
    ];

    return (
        <div className="flex flex-col px-6 divide-y divide-ethos-light-text-stroke dark:divide-ethos-dark-text-stroke">
            <ContentBlock className="!py-6 !px-0 !pb-4">
                <Header>Security</Header>
                <BodyLarge isTextColorMedium>
                    The source of truth for your Connected dApps, Password, and
                    Recovery Phrases.
                </BodyLarge>
            </ContentBlock>
            {securityItems.map((item, key) => {
                return <SecurityItem item={item} key={key} />;
            })}
        </div>
    );
};

export default SecurityHomePage;

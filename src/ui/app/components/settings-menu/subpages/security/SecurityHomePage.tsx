
import { useNextSettingsUrl } from '../../hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';

interface SecurityHomePageProps {
    isHostedWallet: boolean;
}

interface SecurityItem {
    title: string;
    description: string;
    buttonText: string;
    buttonTo: string;
}

const SecurityItemDisplay = ({ item }: { item: SecurityItem }) => {
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

const SecurityHomePage = ({ isHostedWallet }: SecurityHomePageProps) => {
    const changePasswordUrl = useNextSettingsUrl(
        true,
        '/security/change-password'
    );
    const viewSeedUrl = useNextSettingsUrl(true, '/security/view-seed');
    // const viewPrivateKeyUrl = useNextSettingsUrl(
    //     true,
    //     '/security/view-private-key'
    // );
    const securityItems: SecurityItem[] = [
        {
            title: 'Passwords',
            description:
                'Your password is required to unlock Ethos after 15 minutes of inactivity.',
            buttonText: 'Update Password',
            buttonTo: changePasswordUrl,
        },
        {
            title: 'Recovery Phrase',
            description:
                'Recovery phrases give you access to all wallets that are associated with it. Here, you can manage your recovery phrases.',
            buttonText: 'View Recovery Phrase',
            buttonTo: viewSeedUrl,
        },
        // {
        //     title: 'Private Key',
        //     description:
        //         'Your private key grants access to the wallet that you are currently in.',
        //     buttonText: 'View Private Key',
        //     buttonTo: viewPrivateKeyUrl,
        // },
    ];

    // Email users cannot view their seed
    if (isHostedWallet) {
        securityItems.splice(1, 1);
    }

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
                return <SecurityItemDisplay item={item} key={key} />;
            })}
        </div>
    );
};

export default SecurityHomePage;

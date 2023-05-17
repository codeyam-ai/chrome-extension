import { useBiometricAuth } from '_src/ui/app/hooks/useBiometricAuth';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';
import SimpleToggle from '../../../SimpleToggle';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Body from '_src/ui/app/shared/typography/Body';
import { BIOMETRIC_DISCLAIMER } from '_src/shared/constants';

interface SecurityItem {
    title: string;
    description: string;
    buttonText: string;
    path: string;
}

const SecurityItemDisplay = ({ item }: { item: SecurityItem }) => {
    const { title, description, buttonText, path } = item;
    return (
        <div className="flex flex-col pt-6">
            <ContentBlock className="!px-0 !pb-4">
                <Header>{title}</Header>
                <BodyLarge isTextColorMedium>{description}</BodyLarge>
            </ContentBlock>
            <Button buttonStyle="secondary" to={path} isInline>
                {buttonText}
            </Button>
        </div>
    );
};

const SecurityHomePage = () => {
    const { isSupported, isBiometricsSetUp, setup, reset } = useBiometricAuth();

    const securityItems: SecurityItem[] = [
        {
            title: 'Password',
            description:
                'Your password is required to unlock Ethos after 15 minutes of inactivity.',
            buttonText: 'Update Password',
            path: '/settings/security/change-password',
        },
        {
            title: 'Recovery Phrase',
            description:
                'Your recovery phrase give you access to all wallet addresses associated with it.',
            buttonText: 'View Recovery Phrase',
            path: '/settings/security/view-seed',
        },
        {
            title: 'Private Key',
            description:
                'Your private key grants access to the currently active wallet address.',
            buttonText: 'View Private Key',
            path: '/settings/security/view-private-key',
        },
    ];

    return (
        <div className="flex flex-col px-6 divide-y divide-ethos-light-text-stroke dark:divide-ethos-dark-text-stroke">
            <ContentBlock className="!py-6 !px-0 !pb-4">
                <Header>Security</Header>
                <BodyLarge isTextColorMedium>
                    Reset your password or export your recovery phrase or
                    private keys.
                </BodyLarge>
            </ContentBlock>
            {isSupported && (
                <div className="flex flex-col py-6">
                    <ContentBlock className="!px-0 !pb-4">
                        <Header>Touch ID</Header>
                        <BodyLarge isTextColorMedium>
                            Use biometrics (Touch ID) to securely sign in
                            without typing in your password.
                        </BodyLarge>
                    </ContentBlock>
                    <div className="flex justify-between">
                        <BodyLarge>Unlock with Touch ID</BodyLarge>
                        <SimpleToggle
                            value={isBiometricsSetUp}
                            onSwitchOn={setup}
                            onSwitchOff={reset}
                            ariaLabelOn="Touch ID is enabled"
                            ariaLabelOff="Touch ID is disabled"
                        />
                    </div>
                    <Body isTextColorMedium className="text-left pt-2">
                        {BIOMETRIC_DISCLAIMER}
                    </Body>
                </div>
            )}
            {securityItems.map((item, key) => {
                return <SecurityItemDisplay item={item} key={key} />;
            })}
        </div>
    );
};

export default SecurityHomePage;

import { useCallback } from 'react';

import { useDependencies } from '_shared/utils/dependenciesContext';
import Button from '_src/ui/app/shared/buttons/Button';
import Well from '_src/ui/app/shared/content/Well';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import ContentBlock from '_src/ui/app/shared/typography/ContentBlock';
import Header from '_src/ui/app/shared/typography/Header';
import { thunkExtras } from '_store/thunk-extras';

const LockPage = () => {
    const lockWallet = useCallback(async () => {
        thunkExtras.background.lockWallet();
    }, []);

    const { featureFlags } = useDependencies();

    return featureFlags.showWipFeatures ? (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Lock Ethos</Header>
                <BodyLarge isTextColorMedium>
                    Here you can restrict access to your wallet by locking it.
                    You&apos;ll need to enter your password to unlock your
                    wallet.
                </BodyLarge>
            </ContentBlock>
            <Button onClick={lockWallet}>Lock Wallet</Button>
            <ContentBlock className="!py-6">
                <Header>Auto-Lock</Header>
                <BodyLarge isTextColorMedium>
                    Change how long Ethos will wait before locking your wallet
                </BodyLarge>
                <BodyLarge isTextColorMedium>
                    Current Auto-Lock time: 15 minutes
                </BodyLarge>
            </ContentBlock>
            <Button to="/settings/change-auto-lock-timeout">
                Change Auto-Lock time
            </Button>
        </div>
    ) : (
        <div className="flex flex-col">
            <ContentBlock className="!py-6">
                <Header>Lock Ethos</Header>
                <BodyLarge isTextColorMedium>
                    Here you can restrict access to your wallet by locking it.
                    You&apos;ll need to enter your password to unlock your
                    wallet.
                </BodyLarge>
            </ContentBlock>
            <Well
                header="Wallet Autolock"
                subHeader="Ethos will autolock after 15 minutes."
            />
            <Button onClick={lockWallet}>Lock Wallet</Button>
        </div>
    );
};

export default LockPage;

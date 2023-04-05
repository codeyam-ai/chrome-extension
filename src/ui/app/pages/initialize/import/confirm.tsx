import { useEffect } from 'react';

import Permissions from '_src/background/Permissions';
import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Well from '_src/ui/app/shared/content/Well';
import OnboardingCard from '_src/ui/app/shared/layouts/OnboardingCard';
import Body from '_src/ui/app/shared/typography/Body';

const ConfirmImportPage = () => {
    const address = useAppSelector(({ account }) => account.address) || '';

    useEffect(() => {
        if (address) {
            Permissions.grantEthosDashboardBasicPermissionsForAccount(address);
        }
    }, [address]);

    return (
        <OnboardingCard
            title="Confirm Wallet Import"
            subtitle="Double check to make sure your wallet address is correct!"
            accentColor="blue"
            icon="wallet"
            progressCompleted={2}
            progressTotal={3}
        >
            <div className="px-10 pb-[90px]">
                <Well
                    header="Wallet address"
                    subHeader={
                        <div>
                            <Body>{address.slice(0, address.length / 2)}</Body>
                            <Body>{address.slice(address.length / -2)}</Body>
                        </div>
                    }
                    forceLightMode
                />
            </div>
            <div className="px-10 pb-10">
                <Button
                    to="/initialize/create-password"
                    data-testid="continue"
                    removeContainerPadding
                >
                    Continue
                </Button>
            </div>
        </OnboardingCard>
    );
};

export default ConfirmImportPage;

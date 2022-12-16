import { useAppSelector } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import Well from '_src/ui/app/shared/content/Well';
import OnboardingCard from '_src/ui/app/shared/layouts/OnboardingCard';

const ConfirmImportPage = () => {
    const address = useAppSelector(({ account }) => account.address);

    return (
        <OnboardingCard
            title="Confirm Wallet Import"
            subtitle="Double check to make sure your wallet address is correct!"
            accentColor="blue"
            icon="wallet"
            progressCompleted={2}
            progressTotal={3}
        >
            <div className="px-10 pb-[108px]">
                <Well
                    header="Wallet address"
                    subHeader={address || ''}
                    forceLightMode
                />
            </div>
            <div className="px-10 pb-10">
                <Button to="/initialize/create-password" removeContainerPadding>
                    Continue
                </Button>
            </div>
        </OnboardingCard>
    );
};

export default ConfirmImportPage;

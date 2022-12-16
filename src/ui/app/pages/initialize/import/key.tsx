import OnboardingCard from '_src/ui/app/shared/layouts/OnboardingCard';

const ImportPrivateKeyPage = () => {
    return (
        <OnboardingCard
            title="Paste Private Key"
            subtitle="Paste or type in your private key below"
            accentColor="silver"
            icon="lock"
            isIconBlurred
            progressCompleted={2}
            progressTotal={4}
        >
            KEY
        </OnboardingCard>
    );
};

export default ImportPrivateKeyPage;

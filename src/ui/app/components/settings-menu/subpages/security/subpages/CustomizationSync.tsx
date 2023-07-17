import SyncCustomizationsToggle from '_src/shared/utils/customizationsSync/SyncCustomizationsToggle';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Header from '_src/ui/app/shared/typography/Header';

const CustomizationSync: React.FC = () => {
    return (
        <div className="p-6 flex flex-col gap-6">
            <Header className="text-left">Customizations Sync</Header>

            <BodyLarge isTextColorMedium className="text-left">
                Choose if you want your wallets&apos; customizations such as
                nickname, color, and profile picture to be synced across your
                devices.
            </BodyLarge>

            <BodyLarge isTextColorMedium className="text-left">
                This data is fully encrypted on Ethos servers and can only be
                decrypted with your private key.
            </BodyLarge>

            <SyncCustomizationsToggle />
        </div>
    );
};

export default CustomizationSync;

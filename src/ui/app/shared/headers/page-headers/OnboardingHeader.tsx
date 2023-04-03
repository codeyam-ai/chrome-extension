import Subheader from '../../typography/Subheader';
import Title from '../../typography/Title';
import EthosLogo from '_src/ui/app/components/logos/EthosLogo';

const OnboardingHeader = () => {
    return (
        <div className="flex flex-col py-10 px-6 gap-10 place-content-center place-items-center text-center">
            <div className="flex ml-2">
                <div className="h-[104px] w-[104px]">
                    <EthosLogo />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Title as="h1" forceLightMode>
                    Welcome to Ethos
                </Title>
                <Subheader isTextColorMedium forceLightMode>
                    A reimagined wallet for discovering apps, games, and NFTs on
                    Sui
                </Subheader>
            </div>
        </div>
    );
};

export default OnboardingHeader;

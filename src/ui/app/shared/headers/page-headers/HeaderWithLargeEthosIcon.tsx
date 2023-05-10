import Subheader from '../../typography/Subheader';
import EthosLogoWithText from '_src/ui/app/components/logos/EthosLogoWithText';

interface HeaderWithLargeEthosIconProps {
    description?: string;
    forceLightTheme?: boolean;
}

const HeaderWithLargeEthosIcon = ({
    description,
    forceLightTheme,
}: HeaderWithLargeEthosIconProps) => {
    return (
        <div className="flex flex-col py-8 px-6 place-content-center place-items-center text-center">
            <EthosLogoWithText
                className="h-[100px] w-[200px]"
                forceLightTheme={forceLightTheme}
            />
            <Subheader
                isTextColorMedium
                className="mt-2"
                forceLightMode={forceLightTheme}
            >
                {description}
            </Subheader>
        </div>
    );
};

export default HeaderWithLargeEthosIcon;

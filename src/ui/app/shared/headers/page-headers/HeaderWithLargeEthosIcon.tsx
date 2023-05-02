import Subheader from '../../typography/Subheader';
import EthosLogo from '_src/ui/app/components/logos/EthosLogo';
import EthosTextBlack from '_src/ui/app/components/logos/EthosTextBlack';
import EthosTextWhite from '_src/ui/app/components/logos/EthosTextWhite';
import { getTheme } from '_src/ui/app/helpers/getTheme';

interface HeaderWithLargeEthosIconProps {
    description?: string;
    forceLightTheme?: boolean;
}

const HeaderWithLargeEthosIcon = ({
    description,
    forceLightTheme,
}: HeaderWithLargeEthosIconProps) => {
    const theme = getTheme();
    return (
        <div className="flex flex-col py-8 px-6 place-content-center place-items-center text-center">
            <EthosLogo className="h-[104px] w-[104px]" />
            {theme === 'light' || forceLightTheme ? (
                <EthosTextBlack className="h-[80px] w-[120px]" />
            ) : (
                <EthosTextWhite className="h-[80px] w-[120px]" />
            )}
            <Subheader isTextColorMedium>{description}</Subheader>
        </div>
    );
};

export default HeaderWithLargeEthosIcon;

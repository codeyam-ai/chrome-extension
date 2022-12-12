import Subheader from '../../typography/Subheader';
import Title from '../../typography/Title';
import EthosLogo from '_src/ui/app/components/EthosLogo';

interface HeaderWithLargeEthosIconProps {
    title: string;
    description?: string;
}

const HeaderWithLargeEthosIcon = ({
    title,
    description,
}: HeaderWithLargeEthosIconProps) => {
    return (
        <div className="flex flex-col py-8 px-6 gap-3 place-content-center place-items-center text-center">
            <div className="h-[104px] w-[104px]">
                <EthosLogo />
            </div>
            <Title as="h1">{title}</Title>
            <Subheader isTextColorMedium>{description}</Subheader>
        </div>
    );
};

export default HeaderWithLargeEthosIcon;

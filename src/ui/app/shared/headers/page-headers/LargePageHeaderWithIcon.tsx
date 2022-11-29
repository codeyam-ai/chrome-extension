import Subheader from '../../typography/Subheader';
import Title from '../../typography/Title';
import { TextColor } from '_src/enums/Typography';
import EthosLogo from '_src/ui/app/components/EthosLogo';

type LargePageHeaderWIthIconProps = {
    iconSrc: string;
    iconAlt: string;
    header: string;
    description: string;
};

const LargePageHeaderWIthIcon = ({
    iconSrc,
    iconAlt,
    header,
    description,
}: LargePageHeaderWIthIconProps) => {
    return (
        <div className="pt-8 pb-10">
            <div className="flex justify-center pb-6">
                <EthosLogo />
            </div>
            <Title as="h1">{header}</Title>
            <Subheader textColor={TextColor.Medium}>{description}</Subheader>
        </div>
    );
};

export default LargePageHeaderWIthIcon;

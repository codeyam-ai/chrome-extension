import { useCallback, useState } from 'react';
import MnemonicQrCode from './MnemonicQrCode';
import ExpandableSection from '_src/ui/app/shared/content/ExpandableSection';

interface QrCodeSectionProps {
    mnemonic: string;
}

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ mnemonic }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    return (
        <ExpandableSection
            isOpen={isOpen}
            onToggle={handleToggle}
            title="Section Header"
        >
            <MnemonicQrCode mnemonic={mnemonic} />
            <p>
                Here is some more information about this product that is only
                revealed once expanded.
            </p>
        </ExpandableSection>
    );
};

export default QrCodeSection;

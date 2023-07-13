import { useEffect, useCallback, useState, useRef } from 'react';
import MnemonicQrCode from './MnemonicQrCode';
import ExpandableSection from '_src/ui/app/shared/content/ExpandableSection';

interface QrCodeSectionProps {
    mnemonic: string;
}

const easeOutQuad = (t: number) => t * (2 - t);

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ mnemonic }) => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const scrollAnimationRef = useRef<number | null>(null);

    const handleToggle = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    // This is the easing function
    function easeInOutCubic(t: number) {
        return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    useEffect(() => {
        if (isOpen) {
            const start = performance.now();
            const element = document.getElementById('settings-container');
            if (!element) return;
            const startScrollTop = element.scrollTop;
            const delta = element.scrollHeight - startScrollTop; // Y-offset to scroll
            const duration = 750; // Duration in ms

            const smoothScroll = (currentTime: number) => {
                const elapsed = currentTime - start;
                if (elapsed < duration) {
                    // Stop scrolling after the duration
                    const t = elapsed / duration;
                    element.scrollTop =
                        startScrollTop + delta * easeInOutCubic(t);
                    requestAnimationFrame(smoothScroll);
                } else {
                    // Ensure it scrolls all the way, even if the frame is dropped
                    element.scrollTop = startScrollTop + delta;
                }
            };
            requestAnimationFrame(smoothScroll);
        }
    }, [isOpen]);

    return (
        <div>
            <ExpandableSection
                isOpen={isOpen}
                onToggle={handleToggle}
                title="Import Wallet in Mobile App"
            >
                <MnemonicQrCode mnemonic={mnemonic} />
            </ExpandableSection>
        </div>
    );
};

export default QrCodeSection;

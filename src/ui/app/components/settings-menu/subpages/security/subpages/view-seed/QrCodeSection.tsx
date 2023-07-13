import { useAppDispatch } from '_src/ui/app/hooks';
import {
    loadCustomizationsSyncPreference,
    saveCustomizationsSyncPreference,
} from '_src/ui/app/redux/slices/account';
import ExpandableSection from '_src/ui/app/shared/content/ExpandableSection';
import Toggle from '_src/ui/app/shared/inputs/Toggle';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import { useCallback, useEffect, useState } from 'react';
import MnemonicQrCode from './MnemonicQrCode';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import InfoDialog from '_src/ui/app/shared/dialog/InfoDialog';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface QrCodeSectionProps {
    mnemonic: string;
}

const easeOutQuad = (t: number) => t * (2 - t);

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ mnemonic }) => {
    const [isExpandOpen, setIsExpandOpen] = useState(false);
    const [isSyncEnabled, setIsSyncEnabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleToggleSync = useCallback(
        async (value: boolean) => {
            setIsSyncEnabled(value);
            await dispatch(saveCustomizationsSyncPreference(value));
        },
        [dispatch]
    );

    const handleToggleExpand = useCallback(() => {
        setIsExpandOpen(!isExpandOpen);
    }, [isExpandOpen]);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        const getCustomizationSyncPreference = async () => {
            const { payload: preference } = await dispatch(
                loadCustomizationsSyncPreference()
            );
            setIsSyncEnabled(preference as boolean);
        };
        getCustomizationSyncPreference();
    }, [dispatch]);

    // This is the easing function
    function easeInOutCubic(t: number) {
        return t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    useEffect(() => {
        if (isExpandOpen) {
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
    }, [isExpandOpen]);

    return (
        <div>
            <ExpandableSection
                isOpen={isExpandOpen}
                onToggle={handleToggleExpand}
                title="Import Wallet in Mobile App"
            >
                <MnemonicQrCode mnemonic={mnemonic} />
                <div className="flex flex-row justify-between items-center mt-4">
                    <div className="flex flex-row items-center">
                        <BodyLarge className="text-left">
                            Sync Personalization
                        </BodyLarge>
                        <div className="cursor-pointer p-1" onClick={openModal}>
                            <QuestionMarkCircleIcon className="w-5 h-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                        </div>
                    </div>
                    <Toggle
                        isChecked={isSyncEnabled}
                        onToggle={handleToggleSync}
                    />
                </div>
            </ExpandableSection>
            <InfoDialog
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Personalization Sync"
                paragraphs={[
                    "Choose if you want your wallets' personalizations such as nickname, color, and profile picture to be synced across your devices.",
                    'This data is fully encrypted on Ethos servers and can only be decrypted with your private key.',
                ]}
                iconWithNoClasses={<SparklesIcon />}
            />
        </div>
    );
};

export default QrCodeSection;

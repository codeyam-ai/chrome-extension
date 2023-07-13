import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { useCallback, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { toast } from 'react-toastify';

import MnemonicQrCode from './MnemonicQrCode';
import Authentication from '_src/background/Authentication';
import { deleteAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/deleteAllCustomizationsFromSeed';
import { getAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/getAllCustomizationsFromSeed';
import { saveAllCustomizationsFromSeed } from '_src/shared/utils/customizationsSync/saveAllCustomizationsFromSeed';
import { useTheme } from '_src/shared/utils/themeContext';
import { type AccountInfo } from '_src/ui/app/KeypairVault';
import { useAppDispatch, useAppSelector } from '_src/ui/app/hooks';
import {
    loadCustomizationsSyncPreference,
    saveAccountInfos,
    saveCustomizationsSyncPreference,
    setAccountInfos,
} from '_src/ui/app/redux/slices/account';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';
import ExpandableSection from '_src/ui/app/shared/content/ExpandableSection';
import InfoDialog from '_src/ui/app/shared/dialog/InfoDialog';
import Toggle from '_src/ui/app/shared/inputs/Toggle';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import SyncCustomizationsToggle from '_src/shared/utils/customizationsSync/SyncCustomizationsToggle';

interface QrCodeSectionProps {
    mnemonic: string;
}

const QrCodeSection: React.FC<QrCodeSectionProps> = ({ mnemonic }) => {
    const [isExpandOpen, setIsExpandOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleExpand = useCallback(() => {
        setIsExpandOpen(!isExpandOpen);
    }, [isExpandOpen]);

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
                <div className="mt-4">
                    <SyncCustomizationsToggle showModalButton />
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

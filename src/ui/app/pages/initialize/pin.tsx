import { PuzzlePieceIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OnboardingCard from '../../shared/layouts/OnboardingCard';
import BodyLarge from '../../shared/typography/BodyLarge';
import EthosLink from '../../shared/typography/EthosLink';
import { getEncrypted } from '_src/shared/storagex/store';

async function checkIsPinned(): Promise<boolean> {
    const userSettings = await chrome.action.getUserSettings();
    return userSettings.isOnToolbar;
}

const getDomRectForId = (id: string) => {
    return document.getElementById(id)?.getBoundingClientRect();
};

const PinPage = () => {
    const [isHostedWallet, setIsHostedWallet] = useState(false);
    // Line locations so they can update for any given window dimensions
    const [pinToRound, setPinToRound] = useState<DOMRect>();
    const [lineUp, setLineUp] = useState<DOMRect>();

    const navigate = useNavigate();

    const refreshLinePositions = () => {
        setPinToRound(getDomRectForId('pin-to-round'));
        setLineUp(getDomRectForId('line-up'));
    };

    useEffect(() => {
        const _setIsHosted = async () => {
            const authentication = await getEncrypted('authentication');
            setIsHostedWallet(authentication !== null);
        };
        _setIsHosted();
    }, []);

    useEffect(() => {
        refreshLinePositions();
    }, []);

    useEffect(() => {
        const handleWindowResize = () => {
            refreshLinePositions();
        };
        window.addEventListener('resize', handleWindowResize);

        return function cleanup() {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const checkPinned = async () => {
            const _isPinned = await checkIsPinned();
            if (_isPinned) {
                navigate('/initialize/complete');
            }
        };

        // Check if pinned on load
        checkPinned();
        setInterval(async () => {
            // Check if pinned every half second
            await checkPinned();
        }, 500);
    }, [navigate]);

    return (
        <OnboardingCard
            title="Pin Your Wallet"
            subtitle="In the top right corner, pin Ethos to your toolbar for easy access."
            accentColor="rainbow"
            icon="pin"
            progressCompleted={isHostedWallet ? 3 : 5}
            progressTotal={isHostedWallet ? 3 : 5}
            hideBackButton
        >
            <div className="px-10 pb-[220px]">
                <div className="flex p-8 rounded-[20px] place-content-center shadow-ethos-pin-card-box-shadow">
                    <div className="relative flex h-16 w-16 rounded-full place-content-center place-items-center bg-ethos-light-background-secondary">
                        <PuzzlePieceIcon className="w-12 h-12 text-ethos-light-text-medium" />
                        {/* Line going from puzzle icon to pin icon */}
                        <div
                            id="puzzle-to-pin"
                            className="hidden md:block absolute left-[72px] bg-gradient-to-r from-ethos-light-text-medium/0 via-ethos-light-text-medium/80 to-ethos-light-text-medium/0 h-[3px] w-[360px]"
                        />
                        {/* Line going from pin icon to rounded edge */}
                        <div
                            id="pin-to-round"
                            className="hidden md:block absolute left-[552px] bg-gradient-to-r from-ethos-light-text-medium/0 to-[#9b9ea1] h-[3px]"
                            style={{
                                width:
                                    (lineUp?.x || 0) -
                                    (pinToRound?.x || 0) -
                                    // To connect to the curved line
                                    15,
                            }}
                        />
                        {/* Curved line */}
                        <div
                            className="hidden md:block fixed right-[116px] w-[25px] h-[25px] border-[3px] border-b-[#9b9ea1] border-r-[#9b9ea1] border-t-transparent border-l-transparent rounded-br-2xl"
                            // 22px = height (25px) - border width (3px)
                            style={{ top: (pinToRound?.top || 0) - 22 }}
                        />
                        {/* Line going up */}
                        <div
                            id="line-up"
                            className="hidden md:block fixed right-[116px] bg-[#9b9ea1] h-[200px] w-[3px]"
                            style={{
                                top: 22,
                                // 22px for top offset, 15px to connect to the curved line
                                height: (pinToRound?.top || 0) - 22 - 15,
                            }}
                        />
                        {/* Arrow head left side */}
                        <div
                            className="hidden md:block fixed rotate-45 h-[20px] w-[3px] rounded-sm bg-[#9b9ea1]"
                            style={{ top: 22 - 3, right: 122 }}
                        />
                        <div
                            className="hidden md:block fixed rotate-[135deg] h-[20px] w-[3px] rounded-sm bg-[#9b9ea1]"
                            style={{ top: 22 - 3, right: 110 }}
                        />
                    </div>
                </div>
            </div>
            <div className="px-10 pb-10 text-center">
                <BodyLarge>
                    <EthosLink
                        to="/initialize/complete"
                        type="internal"
                        forceLightMode
                    >
                        Continue Without Pinning
                    </EthosLink>
                </BodyLarge>
            </div>
        </OnboardingCard>
    );
};

export default PinPage;

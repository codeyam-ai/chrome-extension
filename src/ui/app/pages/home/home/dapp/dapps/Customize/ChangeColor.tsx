import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type AccountInfo } from '_src/ui/app/KeypairVault';
import getNextWalletColor from '_src/ui/app/helpers/getNextWalletColor';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateCurrentAccountInfo } from '_src/ui/app/hooks/useUpdateCurrentAccountInfo';
import ColorPickerMenu from '_src/ui/app/shared/inputs/colors/ColorPickerMenu';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

const ChangeColor: React.FC = () => {
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    const { updateCurrentAccountInfo } = useUpdateCurrentAccountInfo();
    const navigate = useNavigate();

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const [draftColor, setDraftColor] = useState<string>(
        accountInfo?.color || getNextWalletColor(0)
    );

    const openColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(true);
    }, []);

    const closeColorPickerMenu = useCallback(() => {
        setIsColorPickerMenuOpen(false);
    }, []);

    const _handleColorChange = useCallback((color: string) => {
        setDraftColor(color);
        setIsColorPickerMenuOpen(false);
    }, []);

    const handleOnContinue = useCallback(() => {
        updateCurrentAccountInfo({ color: draftColor });
        navigate('/home/customize/completed');
    }, [draftColor, navigate, updateCurrentAccountInfo]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div className="relative flex flex-col items-center pt-6 px-6">
            <Title className="pb-6">Choose your wallet&apos;s color</Title>
            <div
                className="w-20 h-20 rounded-md cursor-pointer"
                style={{ backgroundColor: draftColor }}
                onClick={openColorPickerMenu}
            />
            <ColorPickerMenu
                isOpen={isColorPickerMenuOpen}
                selectedColor={draftColor}
                setSelectedColor={_handleColorChange}
                closeColorPickerMenu={closeColorPickerMenu}
                leftAbsoluteClassNames="left-[24px] top-[180px]"
            />
            <div className="flex gap-2 w-full mt-6">
                <button
                    onClick={goBack}
                    className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-4 mt-6 mb-2 bg-ethos-light-primary-light/20"
                >
                    <BodyLarge
                        isSemibold
                        className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                    >
                        Back
                    </BodyLarge>
                </button>
                <button
                    onClick={handleOnContinue}
                    className="flex w-full items-center place-content-center gap-2 rounded-xl py-3 px-4 mt-6 mb-2 bg-ethos-light-primary-light"
                >
                    <BodyLarge isSemibold className="text-white">
                        Continue
                    </BodyLarge>
                </button>
            </div>
        </div>
    );
};

export default ChangeColor;

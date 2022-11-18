import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../shared/buttons/Button';
import BasicSectionHeader from '../../shared/headers/section-headers/BasicSectionHeader';
import ColorPickerMenu from '../../shared/inputs/colors/ColorPickerMenu';
import ColorRow from '../../shared/inputs/colors/ColorRow';
import NavBarWithBackAndClose from '../../shared/navigation/nav-bar/NavBarWithBackAndClose';
import BodyLarge from '../../shared/typography/BodyLarge';
import { useNextWalletPickerUrl } from '../menu/hooks';
import Input from '../../shared/inputs/Input';
interface EditWalletProps {
    setIsWalletEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditWallet = ({ setIsWalletEditing }: EditWalletProps) => {
    const [isColorPickerMenuOpen, setIsColorPickerMenuOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#FF6A00');
    const [searchParams] = useSearchParams();
    const walletIndex = searchParams.get('index');
    const walletPickerHomeUrl = useNextWalletPickerUrl(true, '/');
    const closeWalletPickerUrl = useNextWalletPickerUrl(false);

    const toggleIsColorPickerMenuOpen = useCallback(() => {
        setIsColorPickerMenuOpen(!isColorPickerMenuOpen);
    }, [isColorPickerMenuOpen]);

    const setIsWalletEditingToFalse = useCallback(() => {
        setIsWalletEditing(false);
    }, []);

    const setIsWalletEditingToTrue = useCallback(() => {
        setIsWalletEditing(true);
    }, []);

    return (
        <>
            <NavBarWithBackAndClose
                backUrl={walletPickerHomeUrl}
                onClickBack={setIsWalletEditingToTrue}
                closeUrl={closeWalletPickerUrl}
                onClickClose={setIsWalletEditingToFalse}
            />
            <BasicSectionHeader text="Edit Wallet"></BasicSectionHeader>
            <div className="flex flex-col">
                <Input
                    value={'name!'}
                    id="hi"
                    label="Label"
                    description="Description"
                />
                <div className="flex justify-between items-center px-6 pb-6">
                    <BodyLarge isSemibold>Choose a Color</BodyLarge>
                    <div className="p-1 rounded-md border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                        <div
                            className="w-12 h-12 rounded-sm cursor-pointer"
                            style={{ backgroundColor: selectedColor }}
                            onClick={toggleIsColorPickerMenuOpen}
                        />
                    </div>
                </div>
                <div className="relative mx-6">
                    {isColorPickerMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="absolute -top-[223px] -left-[24px] w-[360px] h-[475px]"
                                onClick={toggleIsColorPickerMenuOpen}
                            />

                            <div className="absolute">
                                <ColorPickerMenu
                                    selectedColor={selectedColor}
                                    setSelectedColor={setSelectedColor}
                                />
                            </div>
                        </>
                    )}
                </div>

                {/* <div className="flex justify-between items-center pt-4">
                    <BodyLarge isSemibold>Choose an Icon</BodyLarge>
                    <div className="p-1 rounded-md border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                        <div
                            className="w-12 h-12 rounded-sm cursor-pointer"
                            onClick={toggleIsColorPickerMenuOpen}
                        >
                            👹
                        </div>
                    </div>
                </div> */}

                <Button buttonStyle="primary">Done</Button>
            </div>
        </>
    );
};

export default EditWallet;

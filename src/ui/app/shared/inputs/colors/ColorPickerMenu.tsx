import ColorRow from './ColorRow';

interface ColorPickerMenuProps {
    isOpen: boolean;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    closeColorPickerMenu: () => void;
}

const ColorPickerMenu = ({
    isOpen,
    selectedColor,
    setSelectedColor,
    closeColorPickerMenu,
}: ColorPickerMenuProps) => {
    if (isOpen) {
        return (
            <>
                {/* Backdrop */}
                <div
                    data-testid="emoji-picker"
                    className="fixed top-0 left-0 w-screen h-screen"
                    onClick={closeColorPickerMenu}
                />

                <div className="absolute flex flex-col gap-3 w-[312px] p-6 rounded-[20px] shadow-ethos-hovering-element-box-shadow bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                    <ColorRow
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    />
                </div>
            </>
        );
    }
    return <></>;
};

export default ColorPickerMenu;

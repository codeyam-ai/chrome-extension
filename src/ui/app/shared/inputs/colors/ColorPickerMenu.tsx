import ColorRow from './ColorRow';

interface ColorPickerMenuProps {
    isOpen: boolean;
    selectedColor: string;
    leftAbsoluteClassNames: string;
    setSelectedColor: (color: string) => void;
    closeColorPickerMenu: () => void;
    forceLightMode?: boolean;
}

const ColorPickerMenu = ({
    isOpen,
    selectedColor,
    leftAbsoluteClassNames,
    setSelectedColor,
    closeColorPickerMenu,
    forceLightMode,
}: ColorPickerMenuProps) => {
    if (isOpen) {
        return (
            <>
                {/* Backdrop */}
                <div
                    data-testid="emoji-picker"
                    className="fixed top-0 left-0 w-screen h-screen bg-black/30"
                    onClick={closeColorPickerMenu}
                />

                <div
                    className={`absolute ${leftAbsoluteClassNames} z-10 flex flex-col gap-3 w-[312px] p-6 rounded-[20px] shadow-ethos-hovering-element-box-shadow bg-ethos-light-background-default border border-ethos-light-text-stroke ${
                        forceLightMode
                            ? ''
                            : 'dark:bg-ethos-dark-background-default dark:border-ethos-dark-text-stroke'
                    }`}
                >
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

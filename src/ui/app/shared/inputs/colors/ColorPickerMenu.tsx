import { useState } from 'react';

import ColorRow from './ColorRow';

interface ColorPickerMenuProps {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

const ColorPickerMenu = ({
    selectedColor,
    setSelectedColor,
}: ColorPickerMenuProps) => {
    const [showColorRow] = useState(true);

    return (
        <div className="flex flex-col gap-3 w-full -mt-2 p-6 rounded-[20px] shadow-ethos-hovering-element-box-shadow bg-ethos-light-background-default dark:bg-ethos-dark-background-default border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            {showColorRow ? (
                <>
                    <ColorRow
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                    />
                    {/* <div className="pb-6">
                            <div className="flex gap-2 justify-start items-center">
                                <div className="h-8 w-8 rounded-lg bg-[#F2F2F2]" />
                                <BodyLarge textColor={TextColor.Medium}>
                                    Pick a Color...
                                </BodyLarge>
                            </div>
                        </div> */}
                </>
            ) : (
                <div>hex picker</div>
            )}
        </div>
    );
};

export default ColorPickerMenu;

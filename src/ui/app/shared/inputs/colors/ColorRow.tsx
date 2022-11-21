import { useCallback } from 'react';

import defaultColors from '_src/shared/defaultColorOptions';

interface ColorButtonProps {
    color: string;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

const ColorButton = ({
    color,
    selectedColor,
    setSelectedColor,
}: ColorButtonProps) => {
    const selectThisColor = useCallback(() => {
        setSelectedColor(color);
    }, [color, setSelectedColor]);
    return (
        <div
            className={`h-12 w-12 rounded-[10px] cursor-pointer ${color === selectedColor && 'border-[4px] border-black/[.08]'
                }`}
            style={{ backgroundColor: color }}
            onClick={selectThisColor}
        />
    );
};

interface ColorRowProps {
    selectedColor: string;
    setSelectedColor: (color: string) => void;
}

const ColorRow = ({ selectedColor, setSelectedColor }: ColorRowProps) => {
    return (
        <div className="grid grid-cols-5 gap-2">
            {defaultColors.map((color, key) => {
                return (
                    <ColorButton
                        color={color}
                        selectedColor={selectedColor}
                        setSelectedColor={setSelectedColor}
                        key={key}
                    />
                );
            })}
        </div>
    );
};

export default ColorRow;

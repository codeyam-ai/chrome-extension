import { Dispatch, SetStateAction, useCallback } from 'react';

const colors = [
    '#FF6A00',
    '#FCB904',
    '#7CDCB6',
    '#00D085',
    '#0F93E3',
    '#EB154C',
    '#F78DA7',
    '#CB6FFF',
];

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
    }, [color]);
    return (
        <div
            className={`h-12 w-12 rounded-[10px] cursor-pointer ${
                color === selectedColor && 'border-[4px] border-black/[.08]'
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
            {colors.map((color, key) => {
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

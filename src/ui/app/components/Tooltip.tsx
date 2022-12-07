import { useCallback, useState } from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLElement> {
    tooltipText: string;
    direction?: TooltipDirection;
}

export enum TooltipDirection {
    RIGHT = 'right',
    DOWN = 'down',
}

const Tooltip = ({
    children,
    tooltipText,
    direction = TooltipDirection.RIGHT,
}: TooltipProps) => {
    const [hasMouseEntered, setHasMouseEntered] = useState(false);
    const handleMouseEnter = useCallback(() => {
        setHasMouseEntered(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setHasMouseEntered(false);
    }, []);
    const down = direction === TooltipDirection.DOWN;
    const right = direction === TooltipDirection.RIGHT;
    const shift = right ? 'left-full' : down ? 'top-full' : '';
    return (
        <div className="relative flex items-center">
            <div
                className={`text-center text-xs ${shift} absolute whitespace-no-wrap bg-gray-800 dark:bg-gray-700 text-white px-2 py-1 rounded flex items-center transition-all duration-75 cursor-default`}
                style={
                    hasMouseEntered
                        ? {
                              marginLeft: right ? '15px' : 'auto',
                              marginTop: down ? '9px' : 'auto',
                              opacity: 1,
                              zIndex: 20,
                          }
                        : {
                              marginLeft: right ? '10px' : 0,
                              opacity: 0,
                              zIndex: -1,
                          }
                }
            >
                <div
                    className="bg-gray-800 dark:bg-gray-700 h-3 w-3 absolute"
                    style={{
                        left: right ? '-6px' : '45%',
                        top: down ? '3px' : '50%',
                        transform: 'rotate(45deg) translate(-50%, -50%)',
                    }}
                />
                {tooltipText}
            </div>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
        </div>
    );
};

export default Tooltip;

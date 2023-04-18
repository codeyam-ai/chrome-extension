import classNames from 'classnames';
import { useState, useRef, useCallback, useEffect } from 'react';

import Body from '_src/ui/app/shared/typography/Body';

import type { ReactNode } from 'react';

interface ClickableTooltipProps {
    message: string | ReactNode;
    children: ReactNode;
    tooltipPosition?: 'above' | 'below';
}

const ClickableTooltip: React.FC<ClickableTooltipProps> = ({
    message,
    children,
    tooltipPosition = 'above',
}) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [tooltipStyles, setTooltipStyles] = useState({});
    const textRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const handleTextClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            setIsTooltipVisible(!isTooltipVisible);
        },
        [isTooltipVisible]
    );

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            tooltipRef.current &&
            !tooltipRef.current.contains(event.target as Node)
        ) {
            setIsTooltipVisible(false);
        }
    }, []);

    const handleClickInside = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
        },
        []
    );

    const handleScroll = useCallback(() => {
        isTooltipVisible && setIsTooltipVisible(false);
    }, [isTooltipVisible]);

    useEffect(() => {
        if (textRef.current) {
            const rect = textRef.current.getBoundingClientRect();
            const tooltipLeft = window.innerWidth / 2 - 165; // Half of the tooltip width (330px)

            let tooltipPositionStyle;

            if (tooltipPosition === 'above') {
                const tooltipBottom = rect.top - 12;
                tooltipPositionStyle = {
                    bottom: `${window.innerHeight - tooltipBottom}px`,
                };
            } else {
                const tooltipTop = rect.bottom + 12;
                tooltipPositionStyle = { top: `${tooltipTop}px` };
            }

            setTooltipStyles({
                ...tooltipPositionStyle,
                left: `${tooltipLeft}px`,
            });
        }
    }, [tooltipPosition]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        document.addEventListener('wheel', handleScroll);
        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div>
            <button
                className="relative"
                type="button"
                onClick={handleTextClick}
                ref={textRef}
            >
                {children}
            </button>
            <div
                ref={tooltipRef}
                className={classNames(
                    'fixed px-4 py-6 w-[330px] z-50 break-words rounded-lg shadow-lg transition-opacity duration-300 ease-in-out bg-ethos-dark-background-secondary',
                    isTooltipVisible
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                )}
                style={tooltipStyles}
                onClick={handleClickInside}
            >
                <Body className="text-white">{message}</Body>
            </div>
        </div>
    );
};

export default ClickableTooltip;

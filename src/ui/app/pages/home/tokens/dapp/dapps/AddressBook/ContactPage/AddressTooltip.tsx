import classNames from 'classnames';
import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';

import { SuccessAlert } from '_src/ui/app/shared/alerts/SuccessAlert';
import Body from '_src/ui/app/shared/typography/Body';

import type { SuiAddress } from '@mysten/sui.js';
import type { ReactNode } from 'react';



interface AddressTooltipProps {
    address: SuiAddress;
    children: ReactNode;
}

const AddressTooltip: React.FC<AddressTooltipProps> = ({
    address,
    children,
}) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = useCallback(() => {
        setIsTooltipVisible(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsTooltipVisible(false);
    }, []);

    const handleTextClick = useCallback(() => {
        if (textRef.current) {
            toast(<SuccessAlert text={'Copied to clipboard'} />);
            navigator.clipboard.writeText(textRef.current.innerText);
        }
    }, []);

    return (
        <span
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleTextClick}
        >
            <span ref={textRef} className="cursor-pointer">
                {children}
            </span>
            <div
                className={classNames(
                    'absolute -left-[100px] -top-[106px] mt-2 px-4 py-6 w-[330px] break-words rounded shadow-lg transition-opacity duration-300 ease-in-out border-2 border-ethos-light-primary-light dark:border-ethos-dark-primary-dark bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary',
                    isTooltipVisible
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                )}
            >
                <Body>{address}</Body>
            </div>
        </span>
    );
};

export default AddressTooltip;

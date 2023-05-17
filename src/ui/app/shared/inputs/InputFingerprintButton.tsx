import { FingerPrintIcon } from '@heroicons/react/24/solid';

import InputHideShowToggleTooltip from './InputHideShowToggleButton/InputHideShowToggleTooltip';
import { TooltipDirection } from '_src/ui/app/components/Tooltip';

interface InputFingerprintButtonProps {
    onButtonClick: () => void;
}

const InputFingerprintButton: React.FC<InputFingerprintButtonProps> = ({
    onButtonClick,
}) => {
    return (
        <div className="absolute right-[1px] top-1/2 transform -translate-y-1/2">
            <InputHideShowToggleTooltip
                tooltipText="Unlock using Touch ID"
                direction={TooltipDirection.DOWN}
                wide
            >
                <button
                    className="flex items-center place-content-center h-[56px] w-[56px] rounded-r-[15px] hover:bg-black/5 hover:dark:bg-white/10"
                    onClick={onButtonClick}
                    type="button"
                    aria-label="Unlock using Touch ID"
                >
                    <FingerPrintIcon className="w-6 h-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                </button>
            </InputHideShowToggleTooltip>
        </div>
    );
};

export default InputFingerprintButton;

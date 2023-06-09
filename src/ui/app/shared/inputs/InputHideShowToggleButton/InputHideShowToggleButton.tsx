import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

import InputHideShowToggleTooltip from './InputHideShowToggleTooltip';
import { TooltipDirection } from '_src/ui/app/components/Tooltip';

interface InputHideShowToggleButtonProps {
    passwordMode: boolean;
    togglePasswordMode: () => void;
}

const InputHideShowToggleButton: React.FC<InputHideShowToggleButtonProps> = ({
    passwordMode,
    togglePasswordMode,
}) => {
    return (
        <div className="absolute right-[1px] top-1/2 transform -translate-y-1/2">
            <InputHideShowToggleTooltip
                tooltipText={passwordMode ? 'Show Password' : 'Hide Password'}
                direction={TooltipDirection.DOWN}
            >
                <button
                    className="flex items-center place-content-center h-[56px] w-[56px] rounded-r-[15px] hover:bg-black/5 hover:dark:bg-white/10"
                    onClick={togglePasswordMode}
                    type="button"
                    aria-label={
                        passwordMode ? 'Show Password' : 'Hide Password'
                    }
                >
                    {passwordMode ? (
                        <EyeIcon className="w-6 h-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                    ) : (
                        <EyeSlashIcon className="w-6 h-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                    )}
                </button>
            </InputHideShowToggleTooltip>
        </div>
    );
};

export default InputHideShowToggleButton;

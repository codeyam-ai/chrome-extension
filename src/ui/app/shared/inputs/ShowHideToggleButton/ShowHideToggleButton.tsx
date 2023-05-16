import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

import ShowHideToggleTooltip from './ShowHideToggleTooltip';
import { TooltipDirection } from '_src/ui/app/components/Tooltip';

interface ShowHideToggleButtonProps {
    passwordMode: boolean;
    togglePasswordMode: () => void;
}

const ShowHideToggleButton: React.FC<ShowHideToggleButtonProps> = ({
    passwordMode,
    togglePasswordMode,
}) => {
    return (
        <div className="absolute right-[1px] top-1/2 transform -translate-y-1/2">
            <ShowHideToggleTooltip
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
            </ShowHideToggleTooltip>
        </div>
    );
};

export default ShowHideToggleButton;

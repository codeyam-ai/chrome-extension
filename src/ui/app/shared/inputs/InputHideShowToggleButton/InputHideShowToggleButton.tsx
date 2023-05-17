import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

import InputHideShowToggleTooltip from './InputHideShowToggleTooltip';
import { TooltipDirection } from '_src/ui/app/components/Tooltip';
import classNames from 'classnames';

interface InputHideShowToggleButtonProps {
    passwordMode: boolean;
    togglePasswordMode: () => void;
    shiftLeft?: boolean;
}

const InputHideShowToggleButton: React.FC<InputHideShowToggleButtonProps> = ({
    passwordMode,
    togglePasswordMode,
    shiftLeft,
}) => {
    return (
        <div
            className={classNames(
                'absolute top-1/2 transform -translate-y-1/2',
                shiftLeft ? 'right-[57px]' : 'right-[1px]'
            )}
        >
            <InputHideShowToggleTooltip
                tooltipText={passwordMode ? 'Show Password' : 'Hide Password'}
                direction={TooltipDirection.DOWN}
            >
                <button
                    className={classNames(
                        'flex items-center place-content-center h-[56px] w-[56px] hover:bg-black/5 hover:dark:bg-white/10',
                        shiftLeft
                            ? 'border-r border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke'
                            : 'rounded-r-[15px]'
                    )}
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

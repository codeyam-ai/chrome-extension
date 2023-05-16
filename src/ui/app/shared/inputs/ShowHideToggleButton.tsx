import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface ShowHideToggleButtonProps {
    passwordMode: boolean;
    togglePasswordMode: () => void;
}

const ShowHideToggleButton: React.FC<ShowHideToggleButtonProps> = ({
    passwordMode,
    togglePasswordMode,
}) => {
    return (
        <div
            className="absolute p-4 right-[1px] top-1/2 transform -translate-y-1/2 cursor-pointer rounded-r-[15px] hover:bg-black/5 hover:dark:bg-white/10"
            onClick={togglePasswordMode}
        >
            {passwordMode ? (
                <EyeIcon className="w-6 h-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            ) : (
                <EyeSlashIcon className="w-6 h-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            )}
        </div>
    );
};

export default ShowHideToggleButton;

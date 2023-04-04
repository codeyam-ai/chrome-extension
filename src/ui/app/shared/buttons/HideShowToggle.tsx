import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

import Body from '../typography/Body';

const HideShowToggle = ({
    name,
    hide,
    onToggle,
}: {
    name: string;
    hide: boolean;
    onToggle: () => void;
}) => {
    return (
        <div
            className="flex justify-center text-sm cursor-pointer"
            onClick={onToggle}
        >
            <div className="flex items-center gap-2">
                <Body>
                    {hide ? 'Show ' : 'Hide '}
                    {name}
                </Body>
                <div
                    className={`${
                        hide
                            ? 'bg-ethos-dark-primary-dark'
                            : 'bg-ethos-dark-primary-light'
                    } w-12 h-6 rounded-full flex items-center`}
                >
                    <div
                        className={`${
                            hide ? 'translate-x-6' : 'translate-x-0'
                        } w-6 h-6 rounded-full bg-ethos-light-background-secondary transform transition-transform flex justify-center items-center`}
                    >
                        {hide ? (
                            <EyeSlashIcon className="w-3 h-3" />
                        ) : (
                            <EyeIcon className="w-3 h-3" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HideShowToggle;

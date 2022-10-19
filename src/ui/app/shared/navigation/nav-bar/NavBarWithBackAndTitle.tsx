import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import DarkModeToggle from '_src/ui/app/components/DarkModeToggle';

import BodyLarge from '../../typography/BodyLarge';

interface NavBarWithBackAndTitleAndThemeToggleProps {
    backLink: string;
    title?: string;
}

const NavBarWithBackAndTitleAndThemeToggle = ({
    backLink,
    title,
}: NavBarWithBackAndTitleAndThemeToggleProps) => {
    return (
        <div className="flex flex-row justify-between px-6">
            <Link
                to={backLink}
                className="inline-flex flex-row gap-2 items-center justify-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                {title && <BodyLarge as="span">{title}</BodyLarge>}
            </Link>
            <DarkModeToggle />
        </div>
    );
};

export default NavBarWithBackAndTitleAndThemeToggle;

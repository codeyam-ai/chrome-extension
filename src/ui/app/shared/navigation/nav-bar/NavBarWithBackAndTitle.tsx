import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import BodyLarge from '../../typography/BodyLarge';
import DarkModeToggle from '_src/ui/app/components/DarkModeToggle';

interface NavBarWithBackAndTitleProps {
    backLink: string;
    title?: string;
}

const NavBarWithBackAndTitle = ({
    backLink,
    title,
}: NavBarWithBackAndTitleProps) => {
    return (
        <div className="flex flex-row justify-between items-center px-6 h-12">
            <Link
                to={backLink}
                className="inline-flex flex-row gap-2 items-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                {title && <BodyLarge as="span">{title}</BodyLarge>}
            </Link>
        </div>
    );
};

export default NavBarWithBackAndTitle;

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import BodyLarge from '../../typography/BodyLarge';

interface NavBarWithBackAndTitleProps {
    backLink: string;
    title?: string;
}

const NavBarWithBackAndTitle = ({
    backLink,
    title,
}: NavBarWithBackAndTitleProps) => {
    return (
        <div className="flex px-6">
            <Link
                to={backLink}
                className="inline-flex flex-row gap-2 items-center justify-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
            >
                <ArrowLeftIcon className="h-5 w-5" />
                {title && <BodyLarge as="span">{title}</BodyLarge>}
            </Link>
        </div>
    );
};

export default NavBarWithBackAndTitle;

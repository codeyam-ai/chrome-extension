import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import BodyLarge from '../../typography/BodyLarge';
import { TextColor } from '_src/enums/Typography';

interface NavBarWithBackAndCloseProps {
    backUrl: string;
    onClickBack?: () => void;
    closeUrl: string;
    onClickClose?: () => void;
}

const NavBarWithBackAndClose = ({
    backUrl,
    onClickBack,
    closeUrl,
    onClickClose,
}: NavBarWithBackAndCloseProps) => {
    return (
        <div className="flex justify-between pt-6 px-6 items-center">
            <Link
                to={backUrl}
                onClick={onClickBack}
                className="flex gap-2 items-center"
            >
                <ArrowLeftIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                <BodyLarge textColor={TextColor.Medium}>Back</BodyLarge>
            </Link>
            <Link to={closeUrl} onClick={onClickClose}>
                <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
            </Link>
        </div>
    );
};

export default NavBarWithBackAndClose;

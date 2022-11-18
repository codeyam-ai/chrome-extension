import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { TextColor } from '_src/enums/Typography';
import BodyLarge from '../../typography/BodyLarge';

interface NavBarWithBackAndCloseProps {
    backUrl: string;
    closeUrl: string;
}

const NavBarWithBackAndClose = ({
    backUrl,
    closeUrl,
}: NavBarWithBackAndCloseProps) => {
    return (
        <div className="flex justify-between pt-6 px-6 items-center">
            <div className="flex gap-2 items-center">
                <ArrowLeftIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                <BodyLarge textColor={TextColor.Medium}>Back</BodyLarge>
            </div>
            <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
        </div>
    );
};

export default NavBarWithBackAndClose;

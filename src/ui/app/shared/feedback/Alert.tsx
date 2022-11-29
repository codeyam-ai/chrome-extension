import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

interface AlertProps {
    title: string;
    subtitle?: string;
}

const Alert = ({ title, subtitle }: AlertProps) => {
    return (
        <div className="flex flex-row gap-2 py-4 px-4 rounded-lg bg-ethos-light-primary-light-translucent">
            <span>
                <ExclamationTriangleIcon className="h-6 w-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            </span>
            <span className="flex flex-col gap-1 text-left">
                <BodyLarge className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark">
                    {title}
                </BodyLarge>
                {subtitle && <Body>{subtitle}</Body>}
            </span>
        </div>
    );
};

export default Alert;

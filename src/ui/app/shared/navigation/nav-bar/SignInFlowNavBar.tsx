import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import BodyLarge from '../../typography/BodyLarge';

interface SignInFlowNavBarProps {
    showBackButton: boolean;
}

const SignInFlowNavBar = ({ showBackButton }: SignInFlowNavBarProps) => {
    return (
        <div className="flex flex-row justify-between items-center px-6 h-12">
            <div>
                {showBackButton && (
                    <Link
                        to="/"
                        className="inline-flex flex-row gap-2 items-center text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        <BodyLarge as="span">Back</BodyLarge>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default SignInFlowNavBar;

import { Link } from 'react-router-dom';

type BackButtonProps = {
    to: string;
    children?: React.ReactNode;
};

const BackButton = ({ to, children = '← Back' }: BackButtonProps) => {
    return (
        <div className="flex absolute top-12 left-4">
            <Link
                to={to}
                className="inline-flex items-center justify-center py-1 px-2 border border-transparent text-base font-medium rounded-full text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
                {children}
            </Link>
        </div>
    );
};

export default BackButton;

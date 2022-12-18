import { XCircleIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

type FailAlertProps = {
    text: string;
    linkText?: string;
    linkUrl?: string;
};

export const FailAlert = ({ text, linkText, linkUrl }: FailAlertProps) => (
    <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row gap-2'}>
            <XCircleIcon width={18} height={18} color={'#CE3838'} />
            <div>{text}</div>
        </div>
        {linkText && linkUrl && (
            <Link className={'font-semibold'} to={linkUrl}>
                {linkText}
            </Link>
        )}
    </div>
);

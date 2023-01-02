import { Link } from 'react-router-dom';

import ToastCheck from '../svg/ToastCheck';

type SuccessAlertProps = {
    text: string;
    linkText?: string;
    linkUrl?: string;
};

export const SuccessAlert = ({
    text,
    linkText,
    linkUrl,
}: SuccessAlertProps) => (
    <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row gap-2'}>
            <ToastCheck />
            <div className={'font-medium'}>{text}</div>
        </div>
        {linkText && linkUrl && (
            <Link className={'font-semibold'} to={linkUrl}>
                {linkText}
            </Link>
        )}
    </div>
);

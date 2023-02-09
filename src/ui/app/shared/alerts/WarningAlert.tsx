import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

type WarningAlertProps = {
    text: string;
};

export const WarningAlert = ({ text }: WarningAlertProps) => (
    <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row gap-2 items-center'}>
            <ExclamationTriangleIcon width={20} height={20} color={'yellow'} />
            <div className={'font-medium'}>{text}</div>
        </div>
    </div>
);

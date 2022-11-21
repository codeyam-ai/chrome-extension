import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { text } from 'stream/consumers';
import Header from '../../typography/Header';

interface HeaderWithCloseProps {
    title: string;
    onClickClose?: () => void;
}

const HeaderWithClose = ({ title, onClickClose }: HeaderWithCloseProps) => {
    return (
        <div className="flex justify-between p-6 text-left border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            <Header>{title}</Header>
            <button onClick={onClickClose}>
                <XMarkIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
            </button>
        </div>
    );
};

export default HeaderWithClose;

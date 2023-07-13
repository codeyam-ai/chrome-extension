import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { type ReactNode } from 'react';
import Header from '../typography/Header';

interface ExpandableSectionProps {
    isOpen: boolean;
    onToggle: () => void;
    title: string;
    children: ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
    isOpen,
    onToggle,
    title,
    children,
}) => (
    <div className="w-full max-w-md mx-auto">
        <div
            className="cursor-pointer flex items-center justify-between py-4"
            onClick={onToggle}
        >
            <Header>{title}</Header>
            <ChevronDownIcon
                className={`${
                    isOpen ? 'transform rotate-180' : ''
                } w-5 h-5 dark:text-white transition-transform duration-200`}
            />
        </div>
        <Transition
            show={isOpen}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="py-4">{children}</div>
        </Transition>
    </div>
);

export default ExpandableSection;

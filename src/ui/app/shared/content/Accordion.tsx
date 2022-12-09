import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useCallback, useState } from 'react';

import Body from '../typography/Body';

import type { ReactNode } from 'react';

interface ExpandProps {
    title: string;
    children: ReactNode;
    className?: string;
}

const Accordion = ({ title, children, className }: ExpandProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    return (
        <div className="flex flex-col">
            <div
                className={`${className ? className : ''} px-6 ${
                    expanded ? 'py-2' : 'pt-2 pb-6'
                }`}
            >
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={toggleExpanded}
                >
                    <Body isSemibold>{title}</Body>
                    {expanded ? (
                        <ChevronUpIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    )}
                </div>
            </div>
            {expanded && children}
        </div>
    );
};

export default Accordion;

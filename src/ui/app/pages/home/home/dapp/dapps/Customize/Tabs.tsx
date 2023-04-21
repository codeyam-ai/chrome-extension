import { useRef } from 'react';
import { Link } from 'react-router-dom';

import useConvertVerticalScrollToHorizontal from '_src/ui/app/hooks/useConvertVerticalScrollToHorizontal';

interface Tab {
    name: string;
    href: string;
}

interface TabsProps {
    tabs: Tab[];
    currentTab: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Tabs: React.FC<TabsProps> = ({ tabs, currentTab }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useConvertVerticalScrollToHorizontal(scrollContainerRef);

    return (
        <div
            ref={scrollContainerRef}
            className="w-full overflow-x-scroll pl-4 border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke no-scrollbar"
        >
            <nav className="flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                    <Link
                        key={tab.name}
                        to={tab.href}
                        className={classNames(
                            currentTab === tab.name
                                ? 'border-ethos-light-primary-light dark:border-ethos-dark-primary-dark text-ethos-light-primary-light dark:bg-ethos-dark-primary-dark'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium'
                        )}
                        aria-current={
                            currentTab === tab.name ? 'page' : undefined
                        }
                    >
                        {tab.name}
                    </Link>
                ))}
                {/* Add spacing at the end of the tabs for consistent padding */}
                <div className="!ml-4">&nbsp;</div>
            </nav>
        </div>
    );
};

export default Tabs;

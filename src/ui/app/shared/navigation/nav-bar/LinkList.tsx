import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { DASHBOARD_LINK } from '_src/shared/constants';
import { useExplorerPermission } from '_src/ui/app/hooks';
import Body from '../../typography/Body';

export type LinkItem = {
    iconWithNoClasses: React.ReactNode;
    title: string;
    to: string;
    isExternal: boolean;
    isExpandView?: boolean;
};

interface LinkListProps {
    linkItems: LinkItem[];
}

const LinkList = ({ linkItems }: LinkListProps) => {
    const setExplorerPermission = useExplorerPermission();

    return (
        <div className="divide-y divide-ethos-light-text-stroke dark:divide-ethos-dark-text-stroke">
            {linkItems.map((item, key) => {
                const handleDashboardLink =
                    item.to === DASHBOARD_LINK
                        ? setExplorerPermission
                        : undefined;
                const content = (
                    <div className="flex flex-row items-center gap-2 py-4">
                        <span className="h-6 w-6 text-ethos-light-text-medium dark:text-ethos-dark-text-medium">
                            {item.iconWithNoClasses}
                        </span>
                        <Body>{item.title}</Body>
                        <ChevronRightIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    </div>
                );
                if (item.isExternal) {
                    return (
                        <div>
                            <a
                                href={item.to}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={item.title}
                                onMouseOver={handleDashboardLink}
                            >
                                {content}
                            </a>
                        </div>
                    );
                } else {
                    return (
                        <div className={item.isExpandView ? 'sm:hidden' : ''}>
                            <Link
                                to={item.to}
                                target={item.isExpandView ? '_blank' : ''}
                            >
                                {content}
                            </Link>
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default LinkList;

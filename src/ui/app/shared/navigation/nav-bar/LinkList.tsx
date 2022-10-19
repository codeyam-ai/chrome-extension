import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { LinkType } from '_src/enums/LinkType';
import { TextColor } from '_src/enums/Typography';
import { DASHBOARD_LINK } from '_src/shared/constants';
import { useExplorerPermission } from '_src/ui/app/hooks';
import Body from '../../typography/Body';

export type LinkItem = {
    iconWithNoClasses: React.ReactNode;
    title: string;
    subtitle?: string;
    to?: string;
    onClick?: () => void;
    linkType: LinkType;
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
                        {item.subtitle && (
                            <Body textColor={TextColor.Medium}>
                                {item.subtitle}
                            </Body>
                        )}
                        <div className="flex-1">
                            <ChevronRightIcon className="float-right h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                        </div>
                    </div>
                );

                if (item.linkType === LinkType.External && item.to) {
                    return (
                        <div key={key}>
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
                } else if (item.linkType === LinkType.Internal && item.to) {
                    return (
                        <div
                            className={item.isExpandView ? 'sm:hidden' : ''}
                            key={key}
                        >
                            <Link
                                to={item.to}
                                target={item.isExpandView ? '_blank' : ''}
                            >
                                {content}
                            </Link>
                        </div>
                    );
                } else if (item.linkType === LinkType.None && item.onClick) {
                    return (
                        <div
                            onClick={item.onClick}
                            className="cursor-pointer"
                            key={key}
                        >
                            {content}
                        </div>
                    );
                } else {
                    return <div key={key}>{content}</div>;
                }
            })}
        </div>
    );
};

export default LinkList;

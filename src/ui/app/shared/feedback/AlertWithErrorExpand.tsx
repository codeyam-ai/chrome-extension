import {
    ChevronDownIcon,
    ChevronUpIcon,
    ExclaimationTriangleIcon,
} from '@heroicons/react/24/solid';
import { type ReactNode, useCallback, useState } from 'react';

import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import EthosLink from '../typography/EthosLink';

interface AlertWithErrorExpandProps {
    title: string;
    body: ReactNode;
    fullErrorText: string;
}

const AlertWithErrorExpand = ({
    title,
    body,
    fullErrorText,
}: AlertWithErrorExpandProps) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    return (
        <div className="flex flex-row gap-2 py-4 px-4 rounded-lg bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
            <span>
                <ExclaimationTriangleIcon className="h-6 w-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
            </span>
            <span className="flex flex-col gap-1 text-left">
                <BodyLarge
                    isSemibold
                    className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                >
                    {title}
                </BodyLarge>
                {body}
                <div
                    className="flex justify-between cursor-pointer"
                    onClick={toggleExpanded}
                >
                    <Body isSemibold>Error details</Body>
                    {expanded ? (
                        <ChevronUpIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    )}
                </div>
                {expanded && (
                    <div className="flex flex-col gap-1 text-left">
                        <Body>
                            If you think this is a bug with Ethos Wallet, please
                            copy and paste the below message into the{' '}
                            <code className="bg-black/10 rounded-sm px-1">
                                #product-help
                            </code>{' '}
                            channel in the{' '}
                            <EthosLink
                                type="external"
                                to="https://discord.gg/ethoswallet"
                            >
                                Ethos Discord
                            </EthosLink>{' '}
                            and describe the issue.
                        </Body>
                        <textarea
                            contentEditable={false}
                            className="w-full overflow-scroll dark:bg-ethos-dark-background-default"
                        >
                            {fullErrorText}
                        </textarea>
                    </div>
                )}
            </span>
        </div>
    );
};

export default AlertWithErrorExpand;

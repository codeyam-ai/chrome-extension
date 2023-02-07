import { EyeIcon } from '@heroicons/react/24/solid';
import { useState, useCallback } from 'react';

import formatUrl from '_src/ui/app/helpers/format-url';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import truncateString from '_src/ui/app/helpers/truncate-string';
import Accordion from '_src/ui/app/shared/content/Accordion';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import Body from '_src/ui/app/shared/typography/Body';

import type { ConnectedApp } from './PermissionsPage';
import type { KeyNameAndValue } from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';

const FallbackIcon = () => {
    return (
        <div className="h-10 w-10 rounded-lg bg-ethos-light-text-stroke dark:bg-ethos-dark-text-stroke" />
    );
};

const formatPageTitle = (title: string) => {
    let formattedTitle = title;
    if (title.includes('http')) {
        formattedTitle = formatUrl(title || '');
    }
    return truncateString(formattedTitle, 21);
};

interface ConnectedAppDisplayProps {
    connectedApp: ConnectedApp;
    onClickRevoke: (connectedApp: ConnectedApp) => void;
}

const ConnectedAppDisplay = ({
    connectedApp,
    onClickRevoke,
}: ConnectedAppDisplayProps) => {
    const [shouldShowFallbackIcon, setShouldShowFallbackIcon] = useState(false);

    const formattedTitle = formatPageTitle(
        connectedApp.title || connectedApp.origin
    );

    const showFallbackIcon = useCallback(() => {
        setShouldShowFallbackIcon(true);
    }, []);

    // With the current implementation in `Permissions.ts`, we
    // remove a permission by updating the "permissions" field
    // to be empty.
    const _handleRevoke = useCallback(() => {
        onClickRevoke(connectedApp);
    }, [onClickRevoke, connectedApp]);

    return (
        <div className="flex flex-col pb-6">
            <div className="flex justify-between items-center px-6">
                <div className="flex gap-3 items-center">
                    {shouldShowFallbackIcon ? (
                        <FallbackIcon />
                    ) : (
                        <img
                            src={connectedApp.favIcon}
                            className="h-10 rounded-lg"
                            alt={formattedTitle}
                            onError={showFallbackIcon}
                        />
                    )}
                    <Body isSemibold>{formattedTitle}</Body>
                </div>
                <button onClick={_handleRevoke}>
                    <Body
                        className="text-ethos-light-red dark:text-ethos-dark-red"
                        isSemibold
                    >
                        Revoke
                    </Body>
                </button>
            </div>
            {connectedApp.preappovals.length > 0 && (
                <div className="flex gap-2 text-left pt-2 px-6">
                    <EyeIcon className="h-5 w-5 text-ethos-light-text-medium dark:text-ethos-dark-text-medium" />
                    <Body isTextColorMedium>
                        This app can sign transactions on your behalf
                    </Body>
                </div>
            )}
            {connectedApp.preappovals.map((preapprovalData, index) => {
                const p = preapprovalData.preapproval;
                const items: KeyNameAndValue[] = [
                    {
                        keyName: 'Transactions Executed',
                        value: p.transactions.length.toString(),
                    },
                    {
                        keyName: 'Transactions Remaining',
                        value: p.maxTransactionCount.toString(),
                    },
                    {
                        keyName: 'Total Gas Used',
                        value: p.transactions
                            .reduce(
                                (total, transaction) =>
                                    total + transaction.gasUsed,
                                0
                            )
                            .toString(),
                    },
                    {
                        keyName: 'Gas Remaining',
                        value: p.totalGasLimit.toString(),
                    },
                    {
                        keyName: 'Function',
                        value: p.function,
                    },
                    {
                        keyName: 'Package',
                        value: p.packageObjectId,
                        shortValue: truncateMiddle(p.packageObjectId, 6),
                    },
                ];
                return (
                    <div key={index}>
                        <Accordion
                            className="!pb-4"
                            title={
                                connectedApp.preappovals.length === 1
                                    ? 'Preapproval'
                                    : `Preapproval ${index + 1}`
                            }
                        >
                            <KeyValueList keyNamesAndValues={items} />
                        </Accordion>
                    </div>
                );
            })}
        </div>
    );
};

export default ConnectedAppDisplay;

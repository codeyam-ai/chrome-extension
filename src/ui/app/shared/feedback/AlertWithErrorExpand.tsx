import {
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ExclaimationTriangleIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import { type ReactNode, useCallback, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import simpleApiCall from '_src/shared/utils/simpleApiCall';
import { useAppSelector } from '../../hooks';
import { type AccountInfo } from '../../KeypairVault';
import Button from '../buttons/Button';
import TextArea from '../inputs/TextArea';

import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';
import EthosLink from '../typography/EthosLink';

type TxInfo = {
    dAppUrl: string;
    txId: string;
};

interface AlertWithErrorExpandProps {
    title: string;
    body: ReactNode;
    fullErrorText: string;
    txInfo: TxInfo;
}

const AlertWithErrorExpand = ({
    title,
    body,
    fullErrorText,
    txInfo,
}: AlertWithErrorExpandProps) => {
    const [expanded, setExpanded] = useState(false);
    const [isReportFormOpen, setIsReportFormOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [reportId, setReportId] = useState('');
    const [isReportSent, setIsReportSent] = useState(false);

    const accountInfo = useAppSelector(
        ({ account: { accountInfos, activeAccountIndex } }) =>
            accountInfos.find(
                (accountInfo: AccountInfo) =>
                    (accountInfo.index || 0) === activeAccountIndex
            )
    );

    const toggleExpanded = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded]);

    const showReportForm = useCallback(() => {
        setIsReportFormOpen(true);
    }, []);

    const handleErrorCommentChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setComment(event.target.value);
        },
        []
    );

    const logError = useCallback(
        async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const response = await simpleApiCall('error-report', 'POST', '', {
                address: accountInfo?.address || '',
                dAppUrl: txInfo.dAppUrl,
                txId: txInfo.txId,
                userComment: comment,
                errorMessage: fullErrorText,
            });
            setReportId(response.json.id);

            setIsReportSent(true);
        },
        [fullErrorText, accountInfo, comment]
    );

    return (
        <div className="flex flex-row gap-2 py-4 px-4 rounded-lg bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
            {isReportSent ? (
                <>
                    <CheckCircleIcon className="h-6 w-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                    <div className="flex flex-col gap-2">
                        <BodyLarge
                            isSemibold
                            className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                        >
                            Error Report Sent
                        </BodyLarge>
                        <Body>
                            The team will look at your issue as soon as
                            possible!
                        </Body>
                        <Body>
                            Use the below code to keep track of this issue in
                            the{' '}
                            <code className="bg-black/10 rounded-sm px-1">
                                #product-help
                            </code>{' '}
                            channel in the{' '}
                            <EthosLink
                                type="external"
                                to="https://discord.gg/ethoswallet"
                            >
                                Ethos Discord
                            </EthosLink>
                            :
                        </Body>
                        <div className="flex w-full items-center place-content-center">
                            <strong>
                                <code className="bg-black/10 rounded-sm px-1">
                                    {reportId}
                                </code>
                            </strong>
                        </div>
                    </div>
                </>
            ) : isReportFormOpen ? (
                <form
                    onSubmit={logError}
                    className="flex flex-row gap-2 w-full"
                >
                    <PaperAirplaneIcon className="h-6 w-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                    <div className="flex flex-col gap-2 w-full">
                        <BodyLarge
                            isSemibold
                            className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                        >
                            Send Error Report
                        </BodyLarge>
                        <TextArea
                            label="Comments (Optional)"
                            id="error"
                            onChange={handleErrorCommentChange}
                            placeholder="What were you trying to do when you got this error?"
                            className="h-[150px]"
                        />
                        <Button type="submit" removeContainerPadding>
                            Send
                        </Button>
                    </div>
                </form>
            ) : (
                <>
                    <span>
                        <ExclaimationTriangleIcon className="h-6 w-6 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                    </span>
                    <span className="flex flex-col gap-2 text-left">
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
                                    Please copy and paste the below message into
                                    the{' '}
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
                                <TextArea
                                    label="Full Error"
                                    id="expanded-error"
                                    defaultValue={fullErrorText}
                                    disabled
                                    className="h-[200px]"
                                />
                            </div>
                        )}
                        <Button
                            onClick={showReportForm}
                            removeContainerPadding
                            className="mt-4"
                        >
                            Report Issue
                        </Button>
                    </span>
                </>
            )}
        </div>
    );
};

export default AlertWithErrorExpand;

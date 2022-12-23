import { useEffect, useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import Loading from '_components/loading';
import { useAppSelector } from '_hooks';
import { accountTicketsSelector } from '_redux/slices/account/index';
import ExternalLink from '_src/ui/app/components/external-link';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import { BlurredImage } from '_src/ui/app/shared/images/BlurredBgImage';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

import type { TicketProjectProps } from '_src/ui/app/shared/content/rows-and-lists/TicketProjectList';

const TicketProjectDetailsContent = ({
    ticketProject,
}: {
    ticketProject: TicketProjectProps;
}) => {
    const nfts = useAppSelector(accountTicketsSelector) || [];

    let tokenName;
    let hasToken = false;
    if (!ticketProject.token) {
        hasToken = true;
    } else {
        tokenName = ticketProject.token.split('::')[2];

        for (const nft of nfts) {
            if ('type' in nft.data && nft.data.type === ticketProject.token) {
                hasToken = true;
            }
        }
    }

    return (
        <>
            <div>
                <div className="text-center w-full mb-6">
                    <div className={'px-6 pt-6'}>
                        <BlurredImage
                            imgSrc={ticketProject.coverImage || ''}
                            fileExt={'NFT'}
                        />
                    </div>
                    <div className="p-6">
                        <Title className={'text-left mb-2'}>
                            {ticketProject.name}
                        </Title>
                        <BodyLarge
                            className={
                                'text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium font-weight-normal mb-6'
                            }
                        >
                            {ticketProject.description}
                        </BodyLarge>
                        {tokenName && (
                            <BodyLarge
                                className={
                                    'text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium font-weight-normal mb-6'
                                }
                            >
                                In order to mint this ticket you&apos;ll need to
                                mint a {tokenName}. You can get one here:
                            </BodyLarge>
                        )}

                        {hasToken === undefined && <LoadingIndicator />}
                        {!hasToken &&
                            hasToken !== undefined &&
                            ticketProject.tokenUrl && (
                                <ExternalLink
                                    href={ticketProject.tokenUrl}
                                    title={ticketProject.name}
                                    showIcon={false}
                                    className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                                >
                                    <Button buttonStyle="primary">
                                        Get {tokenName}
                                    </Button>
                                </ExternalLink>
                            )}
                        {hasToken && (
                            <Button buttonStyle="primary">Mint Ticket</Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const TicketProjectDetails = () => {
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const objectId = useMemo(
        () => searchParams.get('objectId'),
        [searchParams]
    );

    const [ticketProject, setTicketProject] = useState<
        TicketProjectProps | undefined
    >();

    useEffect(() => {
        const getTicketProject = async () => {
            if (!objectId) return;

            const ticketProjectObject = await api.instance.fullNode.getObject(
                objectId
            );

            const { details } = ticketProjectObject;
            if (typeof details === 'string' || !('data' in details)) {
                setLoading(false);
                return;
            }

            const { data } = details;
            if (!('fields' in data)) {
                setLoading(false);
                return;
            }

            const token = data.type.replace('>', '').split('<')[1];
            const { fields } = data;
            const ticketProject = {
                objectId: details.reference.objectId,
                name: fields.name,
                description: fields.description,
                url: fields.url,
                token: token,
                tokenUrl: fields.token_url,
                coverImage: fields.cover_image,
            };

            setTicketProject(ticketProject);
            setLoading(false);
        };

        getTicketProject();
    }, [objectId]);

    if (!objectId || (!loading && !ticketProject)) {
        return <Navigate to="/tickets" replace={true} />;
    }

    return (
        <div className="">
            <Loading loading={loading} big={true}>
                {ticketProject && (
                    <TicketProjectDetailsContent
                        ticketProject={ticketProject}
                    />
                )}
            </Loading>
        </div>
    );
};

export default TicketProjectDetails;

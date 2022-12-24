import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import Loading from '_components/loading';
import { useAppSelector } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account/index';
import { executeMoveCall } from '_redux/slices/transactions/index';
import ExternalLink from '_src/ui/app/components/external-link';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import generateTicketData from '_src/ui/app/helpers/generateTicketData';
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
    const loadingNFTs = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );
    const address = useAppSelector(({ account: { address } }) => address);
    const nfts = useAppSelector(accountNftsSelector) || [];

    let tokenName;
    let tokenNFT;
    if (ticketProject.token) {
        tokenName = ticketProject.token.split('::')[2];

        for (const nft of nfts) {
            if ('type' in nft.data && nft.data.type === ticketProject.token) {
                tokenNFT = nft;
            }
        }
    }

    const handleClick = useCallback(async () => {
        if (!address) return;

        const { data, error } = await generateTicketData(
            ticketProject.name,
            address
        );

        if (error) {
            console.log('ERROR', error);
            return;
        }

        if (!data) {
            console.log('NO DATA');
            return;
        }

        const { ticketData, signature } = data;

        const response = await executeMoveCall({
            packageObjectId: ticketProject.packageObjectId,
            module: ticketProject.module,
            function: 'create_ticket',
            typeArguments: ticketProject.token ? [ticketProject.token] : [],
            arguments: [ticketData, signature, ticketProject.agentObjectId],
            gasBudget: 10000,
        });
        console.log('response', response);
    }, [ticketProject, address]);

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

                        {loadingNFTs && <LoadingIndicator />}
                        {!loadingNFTs &&
                            ticketProject.token &&
                            tokenNFT !== undefined &&
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
                        {!loadingNFTs && tokenNFT && (
                            <Button buttonStyle="primary" onClick={handleClick}>
                                Mint Ticket
                            </Button>
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
                packageObjectId: data.type.split('::')[0],
                agentObjectId: objectId,
                module: data.type.split('::')[1],
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

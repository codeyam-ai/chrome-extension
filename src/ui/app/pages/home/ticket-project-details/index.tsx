import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useSearchParams, useNavigate, Link } from 'react-router-dom';

import { accountAggregateBalancesSelector } from '../../../redux/slices/account/index';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account/index';
import { executeMoveCall } from '_redux/slices/transactions/index';
import ExternalLink from '_src/ui/app/components/external-link';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import generateTicketData from '_src/ui/app/helpers/generateTicketData';
import { GAS_TYPE_ARG } from '_src/ui/app/redux/slices/sui-objects/Coin';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

import type { SuiObject } from '@mysten/sui.js';
import type { TicketProjectProps } from '_src/ui/app/shared/content/rows-and-lists/TicketProjectList';

const TicketProjectDetailsContent = ({
    ticketProject,
}: {
    ticketProject: TicketProjectProps;
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loadingNFTs = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );
    const balances = useAppSelector(accountAggregateBalancesSelector);
    const sufficientBalance = (balances[GAS_TYPE_ARG] || 0) > 1000;
    const address = useAppSelector(({ account: { address } }) => address);
    const nfts = useAppSelector(accountNftsSelector) || [];
    const [minting, setMinting] = useState(false);
    const [error, setError] = useState<string | undefined>();

    let tokenName;
    let tokenNFT: SuiObject | null = null;
    if (ticketProject.token) {
        tokenName = ticketProject.token.split('::')[2];

        for (const nft of nfts) {
            if ('type' in nft.data && nft.data.type === ticketProject.token) {
                tokenNFT = nft;
            }
        }
    }

    const handleClick = useCallback(async () => {
        if (minting) return;
        if (!address) return;
        if (ticketProject.token && !tokenNFT) return;

        setMinting(true);

        const { data, error } = await generateTicketData(
            ticketProject.name,
            address
        );

        if (error) {
            setMinting(false);
            setError(error);
            return;
        }

        if (!data) {
            setMinting(false);
            setError('There was an error. Please try again in a moment.');
            return;
        }

        const { ticketData, signature } = data;

        const typeArguments = ticketProject.token ? [ticketProject.token] : [];
        const args = [ticketData, signature, ticketProject.agentObjectId];
        if (ticketProject.token && tokenNFT) {
            args.unshift(tokenNFT.reference.objectId);
        }

        try {
            const response = await dispatch(
                executeMoveCall({
                    packageObjectId: ticketProject.packageObjectId,
                    module: ticketProject.module,
                    function: 'create_ticket',
                    typeArguments,
                    arguments: args,
                    gasBudget: 10000,
                })
            ).unwrap();

            if (
                'EffectsCert' in response &&
                'effects' in response.EffectsCert &&
                'effects' in response.EffectsCert.effects &&
                'status' in response.EffectsCert.effects.effects
            ) {
                const { status } = response.EffectsCert.effects.effects;
                if (status.status === 'success') {
                    navigate('/my_tickets');
                } else {
                    const eUsed =
                        'name: Identifier("token_gated_ticket") }, function: 4, instruction: 55 }, 1)';
                    if (status.error && status.error.indexOf(eUsed) > -1) {
                        setError('You already minted a ticket today.');
                    }
                }
            } else {
                setError(
                    'There was an error minting your ticket. Please wait a moment a try again.'
                );
            }
        } catch (e) {
            setError(`${e}`);
        }

        setMinting(false);
    }, [minting, ticketProject, address, tokenNFT, dispatch, navigate]);

    return (
        <>
            <div>
                <div className="text-center w-11/12 mx-auto flex flex-col gap-6 py-6">
                    <img
                        src={ticketProject.coverImage}
                        alt={`${ticketProject.name} Ticket`}
                        className="rounded-xl"
                    />
                    <Title className={'text-left'}>{ticketProject.name}</Title>
                    {error && (
                        <div className="text-ethos-light-red dark:text-ethos-dark-red">
                            {error}
                        </div>
                    )}
                    {loadingNFTs && <LoadingIndicator />}
                    {!loadingNFTs &&
                        tokenNFT === null &&
                        ticketProject.tokenUrl && (
                            <div className="flex flex-col gap-6">
                                <BodyLarge
                                    className={
                                        'text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium font-weight-normal'
                                    }
                                >
                                    In order to mint this ticket you&apos;ll
                                    need to mint a {tokenName}. You can get one
                                    here:
                                </BodyLarge>
                                <ExternalLink
                                    href={ticketProject.tokenUrl}
                                    title={ticketProject.name}
                                    showIcon={false}
                                    className="text-ethos-light-text-medium dark:text-ethos-dark-text-medium"
                                >
                                    <Button
                                        buttonStyle="primary"
                                        removeContainerPadding={true}
                                    >
                                        Get {tokenName}
                                    </Button>
                                </ExternalLink>
                            </div>
                        )}
                    {!loadingNFTs && tokenNFT && !sufficientBalance && (
                        <div className="flex flex-col gap-6">
                            <BodyLarge
                                className={
                                    'text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium font-weight-normal'
                                }
                            >
                                You need Sui to mint a ticket. You can use the
                                Sui Faucet on the Home Page to get more Sui.
                            </BodyLarge>
                            <Link to="/">
                                <Button
                                    buttonStyle="primary"
                                    removeContainerPadding={true}
                                >
                                    Use Sui Faucet
                                </Button>
                            </Link>
                        </div>
                    )}
                    {!loadingNFTs && tokenNFT && sufficientBalance && (
                        <Button
                            buttonStyle="primary"
                            onClick={handleClick}
                            disabled={minting}
                            removeContainerPadding={true}
                        >
                            {minting ? <LoadingIndicator /> : <>Mint Ticket</>}
                        </Button>
                    )}
                    <BodyLarge
                        className={
                            'text-left text-ethos-light-text-medium dark:text-ethos-dark-text-medium font-weight-normal'
                        }
                    >
                        {ticketProject.description}
                    </BodyLarge>
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

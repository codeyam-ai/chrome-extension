import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { growthbook } from '../../../experimentation/feature-gating';
import isValidTicket from '../../../helpers/isValidTicket';
import { accountAggregateBalancesSelector } from '../../../redux/slices/account/index';
import { isErrorCausedByUserNotHavingEnoughSuiToPayForGas } from '../../dapp-tx-approval/lib/errorCheckers';
import { getGasDataFromError } from '../../dapp-tx-approval/lib/extractGasData';
import getErrorDisplaySuiForMist from '../../dapp-tx-approval/lib/getErrorDisplaySuiForMist';
import mistToSui from '../../dapp-tx-approval/lib/mistToSui';
import Loading from '_components/loading';
import { useAppDispatch, useAppSelector } from '_hooks';
import { accountNftsSelector } from '_redux/slices/account/index';
import {
    createGasCoin,
    executeMoveCall,
} from '_redux/slices/transactions/index';
import ExternalLink from '_src/ui/app/components/external-link';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import generateTicketData from '_src/ui/app/helpers/generateTicketData';
import { GAS_TYPE_ARG } from '_src/ui/app/redux/slices/sui-objects/Coin';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Title from '_src/ui/app/shared/typography/Title';

import type { SuiObjectData as SuiObject } from '@mysten/sui.js';
import type { TicketProjectProps } from '_src/ui/app/shared/content/rows-and-lists/TicketProjectList';

type RPCError = {
    message: string;
};

export const TicketProjectDetailsContent = ({
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
            if ('type' in nft && nft.type === ticketProject.token) {
                tokenNFT = nft;
            }
        }
    }

    const handleClick = useCallback(async () => {
        if (minting) return;
        if (!address) return;
        if (ticketProject.token && !tokenNFT) return;

        setMinting(true);

        const mintTicketGasBudget = 25000;

        const gasCoinInfo = await dispatch(
            createGasCoin(BigInt(mintTicketGasBudget))
        ).unwrap();

        if (gasCoinInfo.error) {
            let error = gasCoinInfo.error;
            if (gasCoinInfo.gasCost) {
                error += ` The cost of gas is ${mistToSui(
                    gasCoinInfo.gasCost
                )} Sui, but you only have ${mistToSui(
                    balances[GAS_TYPE_ARG]
                )} Sui`;
            }
            setMinting(false);
            setError(error);
            return;
        }

        const { data, error } = await generateTicketData(
            ticketProject.name,
            address
        );

        if (error) {
            setMinting(false);
            let displayError = error;
            if (isErrorCausedByUserNotHavingEnoughSuiToPayForGas(error)) {
                const gasData = getGasDataFromError(error);
                if (gasData) {
                    displayError = `It looks like your wallet doesn't have enough SUI to pay for the gas for this transaction. ${
                        gasData.gasBalance
                            ? `Gas you are able to pay: ${getErrorDisplaySuiForMist(
                                  gasData.gasBalance
                              )}Sui.`
                            : ''
                    }Gas required: ${getErrorDisplaySuiForMist(
                        gasData.gasBudget
                    )} SUI.`;
                }
            }
            setError(displayError);
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
            args.unshift(tokenNFT.objectId);
        }

        try {
            const response = await dispatch(
                executeMoveCall({
                    packageObjectId: ticketProject.packageObjectId,
                    module: ticketProject.module,
                    function: 'create_ticket',
                    typeArguments,
                    arguments: args,
                    gasBudget: mintTicketGasBudget,
                    gasPayment: gasCoinInfo.gasCoinObjectId,
                })
            ).unwrap();

            if (
                'EffectsCert' in response &&
                'effects' in response &&
                'effects' in response.effects &&
                'status' in response.effects
            ) {
                const status = response.effects.status;
                const events = response.events;
                if (status.status === 'success' && events) {
                    const event = events.find((event) => 'moveEvent' in event);
                    if (
                        event &&
                        'moveEvent' in event &&
                        event.moveEvent &&
                        'fields' in event.moveEvent &&
                        event.moveEvent.fields &&
                        typeof event.moveEvent.fields === 'object' &&
                        'ticket_id' in event.moveEvent.fields
                    ) {
                        const ticketId = event.moveEvent.fields
                            .ticket_id as string;
                        const isValid = await isValidTicket(
                            api.instance.fullNode,
                            {
                                type: typeArguments[0],
                                fields: { ticketId },
                            },
                            address || '',
                            ticketProject.agentObjectId
                        );

                        if (isValid) {
                            navigate('/my_tickets');
                        } else {
                            setError(
                                'You already minted a ticket today for another wallet address.'
                            );
                        }
                    }
                } else {
                    const eUsed =
                        'name: Identifier("token_gated_ticket") }, function: 6, instruction: 55 }, 1)';
                    if (status.error && status.error.indexOf(eUsed) > -1) {
                        setError('You already minted a ticket today.');
                    } else {
                        setError(status.error);
                    }
                }
            } else {
                setError(
                    'There was an error minting your ticket. Please wait a moment a try again.'
                );
            }
        } catch (e) {
            const { message } = e as RPCError;
            if (message.indexOf('finality') > -1) {
                setError(
                    'Transaction timed out before reaching finality. Please wait a moment a try again.'
                );
            } else if (
                isErrorCausedByUserNotHavingEnoughSuiToPayForGas(message)
            ) {
                setError(
                    `This wallet address does not have enough sui to pay for the gas in this transaction.`
                );
            } else {
                setError((e as RPCError).message);
            }
        }

        setMinting(false);
    }, [
        minting,
        address,
        ticketProject.token,
        ticketProject.name,
        ticketProject.agentObjectId,
        ticketProject.packageObjectId,
        ticketProject.module,
        tokenNFT,
        dispatch,
        balances,
        navigate,
    ]);

    const capyUrl = growthbook.getFeatureValue(
        'capy-url',
        'https://testnet.capy.art/marketplace/capys?main=D85A58'
    );

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
                                    href={
                                        ticketProject.tokenUrl ===
                                        'https://testnet.capy.art/collection'
                                            ? capyUrl
                                            : ticketProject.tokenUrl
                                    }
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

            if ('content' in details) {
                const { content } = details;
                if (content) {
                    if (!('fields' in content)) {
                        setLoading(false);
                        return;
                    }

                    const token = content.type.replace('>', '').split('<')[1];
                    const { fields } = content;
                    const ticketProject = {
                        objectId: details.objectId,
                        packageObjectId: content.type.split('::')[0],
                        agentObjectId: objectId,
                        module: content.type.split('::')[1],
                        name: fields.name,
                        description: fields.description,
                        url: fields.url,
                        token: token,
                        tokenUrl: fields.token_url,
                        coverImage: fields.cover_image,
                    };

                    setTicketProject(ticketProject);
                    setLoading(false);
                }
            }
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

import { useEffect, useState } from 'react';

import isValidTicket from '../../../helpers/isValidTicket';
import { accountTicketsSelector } from '../../../redux/slices/account/index';
import Body from '../../typography/Body';
import featureGating from '_src/background/FeatureGating';
import Loading from '_src/ui/app/components/loading';
import utils from '_src/ui/app/helpers/utils';
import { useAppSelector } from '_src/ui/app/hooks';
import { TicketProjectDetailsContent } from '_src/ui/app/pages/home/ticket-project-details';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import type { SuiObjectResponse, SuiObjectData } from '@mysten/sui.js/client';

export interface TicketProjectProps {
    objectId: string;
    packageObjectId: string;
    agentObjectId: string;
    module: string;
    name?: string;
    description?: string;
    coverImage?: string;
    url?: string;
    token?: string;
    tokenUrl?: string;
}

const TicketProjectList = () => {
    const loadingTickets = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );
    const [loading, setLoading] = useState(true);

    const address = useAppSelector(({ account }) => account.address);
    const tickets: SuiObjectData[] = useAppSelector(accountTicketsSelector);
    const [ticketProjects, setTicketProjects] = useState<TicketProjectProps[]>(
        []
    );

    useEffect(() => {
        const getTicketProjects = async () => {
            if (loadingTickets) return;

            const growthbook = await featureGating.getGrowthBook();
            const ticketProjectIds: string[] = await growthbook.getFeatureValue(
                'ticket-projects',
                []
            );

            const ticketProjectObjects: SuiObjectResponse[] =
                await api.instance.client.multiGetObjects({
                    ids: ticketProjectIds,
                    options: {
                        showContent: true,
                        showType: true,
                        showDisplay: true,
                        showOwner: true,
                    },
                });

            const ticketProjects = ticketProjectObjects.map(
                (ticketProjectObject) => {
                    const suiObjectData = ticketProjectObject.data;
                    if (!suiObjectData) return null;
                    if (!suiObjectData.type) return null;

                    const fields = utils.getObjectFields(suiObjectData);
                    const token = suiObjectData.type
                        .replace('>', '')
                        .split('<')[1];
                    return {
                        objectId: suiObjectData.objectId,
                        packageObjectId: suiObjectData.type.split('::')[0],
                        agentObjectId: suiObjectData.objectId,
                        module: suiObjectData.type.split('::')[1],
                        name: fields?.name?.toString(),
                        description: fields?.description?.toString(),
                        url: fields?.url?.toString(),
                        token: token,
                        tokenUrl: fields?.token_url?.toString(),
                        coverImage: fields?.cover_image?.toString(),
                    };
                }
            );

            const readyTicketProjects: TicketProjectProps[] = [];
            for (const ticketProject of ticketProjects) {
                if (!ticketProject) continue;

                let foundValidTicket = false;
                for (const ticket of tickets) {
                    if (ticket.type) {
                        const fields = utils.getObjectFields(ticket);
                        if (!fields) continue;
                        
                        const isValid = await isValidTicket(
                            api.instance.client,
                            { type: ticket.type, fields: fields },
                            address || '',
                            ticketProject.agentObjectId
                        );
                        if (isValid) {
                            foundValidTicket = true;
                            break;
                        }
                    }
                }

                if (!foundValidTicket) {
                    readyTicketProjects.push(ticketProject);
                }
            }

            setLoading(false);
            setTicketProjects(readyTicketProjects);
        };

        getTicketProjects();
    }, [loadingTickets, tickets, address]);

    return (
        <Loading loading={loading}>
            <div className="p-3 flex flex-col gap-3">
                {ticketProjects.map((ticketProject, index) => (
                    // <TicketProject
                    //     key={`ticket-project-${index}`}
                    //     ticketProject={ticketProject}
                    // />
                    <TicketProjectDetailsContent
                        key={`ticket-project-${index}`}
                        ticketProject={ticketProject}
                    />
                ))}
                {ticketProjects.length === 0 && (
                    <Body>
                        There are no active ticket projects for you to discover.
                        Please check back later.
                    </Body>
                )}
            </div>
        </Loading>
    );
};

export default TicketProjectList;

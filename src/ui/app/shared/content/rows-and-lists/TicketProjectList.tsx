import { SuiMoveObject, is, getSuiObjectData } from '@mysten/sui.js';
import { useEffect, useState } from 'react';

import isValidTicket from '../../../helpers/isValidTicket';
import { accountTicketsSelector } from '../../../redux/slices/account/index';
import Body from '../../typography/Body';
import featureGating from '_src/background/FeatureGating';
import Loading from '_src/ui/app/components/loading';
import { useAppSelector } from '_src/ui/app/hooks';
import { TicketProjectDetailsContent } from '_src/ui/app/pages/home/ticket-project-details';
import { api } from '_src/ui/app/redux/store/thunk-extras';

import type { SuiObjectResponse, SuiObjectData } from '@mysten/sui.js';

export interface TicketProjectProps {
    objectId: string;
    packageObjectId: string;
    agentObjectId: string;
    module: string;
    name: string;
    description: string;
    coverImage: string;
    url: string;
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
                    const suiObjectData = getSuiObjectData(ticketProjectObject);
                    if (!suiObjectData) return null;
                    if (!suiObjectData.type) return null;

                    const { content } = suiObjectData;
                    if (!is(content, SuiMoveObject)) return null;

                    const token = suiObjectData.type
                        .replace('>', '')
                        .split('<')[1];
                    const { fields } = content;
                    return {
                        objectId: suiObjectData.objectId,
                        packageObjectId: suiObjectData.type.split('::')[0],
                        agentObjectId: suiObjectData.objectId,
                        module: suiObjectData.type.split('::')[1],
                        name: fields.name,
                        description: fields.description,
                        url: fields.url,
                        token: token,
                        tokenUrl: fields.token_url,
                        coverImage: fields.cover_image,
                    };
                }
            );

            const readyTicketProjects: TicketProjectProps[] = [];
            for (const ticketProject of ticketProjects) {
                if (!ticketProject) continue;

                let foundValidTicket = false;
                for (const ticket of tickets) {
                    if (
                        ticket.type &&
                        ticket.content &&
                        is(ticket.content, SuiMoveObject)
                    ) {
                        const fields = ticket.content.fields;
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

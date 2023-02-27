import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import isValidTicket from '../../../helpers/isValidTicket';
import { accountTicketsSelector } from '../../../redux/slices/account/index';
import Body from '../../typography/Body';
import featureGating from '_src/background/FeatureGating';
import Loading from '_src/ui/app/components/loading';
import { useAppSelector } from '_src/ui/app/hooks';
import { TicketProjectDetailsContent } from '_src/ui/app/pages/home/ticket-project-details';
import { api } from '_src/ui/app/redux/store/thunk-extras';

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

// const TicketProject = ({
//     ticketProject,
// }: {
//     ticketProject: TicketProjectProps;
// }) => {
//     const drilldownLink = `/ticket-project?${new URLSearchParams({
//         objectId: ticketProject.objectId,
//     }).toString()}`;

//     return (
//         <Link to={drilldownLink}>
//             <div className="flex flex-col gap-3 items-center w-11/12 mx-auto">
//                 <div className="bg-[#F2F2F2] dark:bg-[#717377] p-4 rounded-xl">
//                     <img
//                         src={ticketProject.coverImage}
//                         alt={`${ticketProject.name} Ticket`}
//                     />
//                 </div>
//                 <div className="text-left">
//                     <span className="font-semibold">{ticketProject.name}</span>{' '}
//                     | {ticketProject.description}
//                 </div>
//             </div>
//         </Link>
//     );
// };

const TicketProjectList = () => {
    const loadingTickets = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );
    const [loading, setLoading] = useState(true);

    const address = useAppSelector(({ account }) => account.address);
    const tickets = useAppSelector(accountTicketsSelector);
    const [ticketProjects, setTicketProjects] = useState<TicketProjectProps[]>(
        []
    );

    useEffect(() => {
        const getTicketProjects = async () => {
            if (loadingTickets) return;

            const growthbook = await featureGating.getGrowthBook();
            const ticketProjectIds = await growthbook.getFeatureValue(
                'ticket-projects',
                []
            );

            const ticketProjectObjects =
                await api.instance.fullNode.getObjectBatch(ticketProjectIds);

            const ticketProjects = ticketProjectObjects.map(
                (ticketProjectObject) => {
                    const { details } = ticketProjectObject;
                    if (typeof details === 'string' || !('data' in details))
                        return null;

                    const { data } = details;
                    if (!('fields' in data)) return null;

                    const token = data.type.replace('>', '').split('<')[1];
                    const { fields } = data;
                    return {
                        objectId: details.reference.objectId,
                        packageObjectId: data.type.split('::')[0],
                        agentObjectId: details.reference.objectId,
                        module: data.type.split('::')[1],
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
                    if ('type' in ticket.data && 'fields' in ticket.data) {
                        const isValid = await isValidTicket(
                            api.instance.fullNode,
                            ticket.data,
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

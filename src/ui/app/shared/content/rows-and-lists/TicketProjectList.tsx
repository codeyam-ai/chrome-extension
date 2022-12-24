import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { accountTicketsSelector } from '../../../redux/slices/account/index';
import Body from '../../typography/Body';
import Loading from '_src/ui/app/components/loading';
import { growthbook } from '_src/ui/app/experimentation/feature-gating';
import { useAppSelector } from '_src/ui/app/hooks';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';

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

const TicketProject = ({
    ticketProject,
}: {
    ticketProject: TicketProjectProps;
}) => {
    const drilldownLink = `/ticket-project?${new URLSearchParams({
        objectId: ticketProject.objectId,
    }).toString()}`;

    return (
        <Link to={drilldownLink}>
            <div
                className="rounded-xl border border-slate-200 dark:boarder-slate-600 p-3 text-slate-800 text-left cursor-pointer flex flex-col gap-3"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0)), url(${ticketProject.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="text-lg font-semibold">
                    {ticketProject.name}
                </div>
                <div className="text-base">{ticketProject.description}</div>
                <div className="px-6">
                    <Button buttonStyle="primary" removeContainerPadding={true}>
                        Learn More
                    </Button>
                </div>
            </div>
        </Link>
    );
};

const TicketProjectList = () => {
    const loadingTickets = useAppSelector(
        ({ suiObjects }) => suiObjects.loading && !suiObjects.lastSync
    );
    const [loading, setLoading] = useState(true);

    const tickets = useAppSelector(accountTicketsSelector);
    const [ticketProjects, setTicketProjects] = useState<TicketProjectProps[]>(
        []
    );

    useEffect(() => {
        const getTicketProjects = async () => {
            if (loadingTickets) return;

            const ticketProjectIds = await growthbook.getFeatureValue(
                'ticket-projects',
                []
            );

            const ticketProjectObjects =
                await api.instance.fullNode.getObjectBatch(ticketProjectIds);

            const ticketProjects = ticketProjectObjects
                .map((ticketProjectObject) => {
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
                })
                .filter(
                    (ticketProject) =>
                        !!ticketProject &&
                        !tickets.find(
                            (ticket) =>
                                'type' in ticket.data &&
                                'fields' in ticket.data &&
                                (ticket.data.fields.count || 0) > 0 &&
                                ticket.data.type.split('::')[0] ===
                                    ticketProject.packageObjectId
                        )
                ) as TicketProjectProps[];

            setLoading(false);
            setTicketProjects(ticketProjects);
        };

        getTicketProjects();
    }, [loadingTickets, tickets]);

    return (
        <Loading loading={loading}>
            <div className="p-3 flex flex-col gap-3">
                {ticketProjects.map((ticketProject, index) => (
                    <TicketProject
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

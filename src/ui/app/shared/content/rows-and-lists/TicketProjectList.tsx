import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { growthbook } from '_src/ui/app/experimentation/feature-gating';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';

export interface TicketProjectProps {
    objectId: string;
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
    const [ticketProjects, setTicketProjects] = useState<TicketProjectProps[]>(
        []
    );

    useEffect(() => {
        const getTicketProjects = async () => {
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
                        name: fields.name,
                        description: fields.description,
                        url: fields.url,
                        token: token,
                        tokenUrl: fields.token_url,
                        coverImage: fields.cover_image,
                    };
                })
                .filter(
                    (ticketProject) => !!ticketProject
                ) as TicketProjectProps[];

            setTicketProjects(ticketProjects);
        };

        getTicketProjects();
    }, []);

    return (
        <div className="p-3 flex flex-col gap-3">
            {ticketProjects.map((ticketProject, index) => (
                <TicketProject
                    key={`ticket-project-${index}`}
                    ticketProject={ticketProject}
                />
            ))}
        </div>
    );
};

export default TicketProjectList;

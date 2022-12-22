import { useState, useEffect } from 'react';

import { growthbook } from '_src/ui/app/experimentation/feature-gating';
import { api } from '_src/ui/app/redux/store/thunk-extras';

export interface TicketProjectProps {
    name: string;
    description: string;
    coverImage: string;
    url: string;
}

const TicketProject = ({
    ticketProject,
}: {
    ticketProject: TicketProjectProps;
}) => {
    return <div>{ticketProject.name}</div>;
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

                    const { fields } = data;
                    return {
                        name: fields.name,
                        description: fields.description,
                        url: fields.url,
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

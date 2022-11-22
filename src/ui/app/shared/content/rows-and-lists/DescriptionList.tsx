import { type ReactNode } from 'react';

import Body from '../../typography/Body';

type LabelAndDescription = {
    label: string;
    description: ReactNode;
};

interface DescriptionListProps {
    labelAndDescriptions: LabelAndDescription[];
}

const DescriptionList = ({ labelAndDescriptions }: DescriptionListProps) => {
    return (
        <div className="mx-6 mb-6 text-left">
            {labelAndDescriptions.map((item, key) => {
                return (
                    <div className="flex flex-col gap-2 pt-2" key={key}>
                        <Body isSemibold={true}>{item.label}</Body>
                        <Body isTextColorMedium>{item.description}</Body>
                    </div>
                );
            })}
        </div>
    );
};

export default DescriptionList;

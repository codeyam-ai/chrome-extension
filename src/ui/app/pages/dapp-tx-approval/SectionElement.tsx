import Tooltip from '../../components/Tooltip';
import Body from '../../shared/typography/Body';
import DetailElement from './DetailElement';

import type { Detail } from './DetailElement';

export type Section = {
    title: string;
    subtitle?: string;
    tooltip?: string;
    details: Detail[];
};

const SectionElement = ({ section }: { section: Section }) => {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <Body isSemibold>
                    {section.tooltip ? (
                        <div className="flex flex-row gap-1 items-center">
                            <div>{section.title}</div>
                            <Tooltip tooltipText={section.tooltip}>
                                <div className="cursor-help flex justify-center items-center rounded-full bg-gray-500 text-white text-xs h-5 w-5 scale-75">
                                    ?
                                </div>
                            </Tooltip>
                        </div>
                    ) : (
                        section.title
                    )}
                </Body>
                {section.subtitle && (
                    <Body isTextColorMedium>{section.subtitle}</Body>
                )}
            </div>
            <div className="flex flex-col text-sm gap-2">
                {section.details.map((detail, detailIndex) => (
                    <DetailElement
                        key={`details-${detailIndex}`}
                        detail={detail}
                    />
                ))}
            </div>
        </div>
    );
};

export default SectionElement;

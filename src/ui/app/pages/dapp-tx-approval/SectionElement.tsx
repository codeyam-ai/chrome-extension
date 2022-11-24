import Tooltip from '../../components/Tooltip';
import DetailElement from './DetailElement';

import type { Section } from './index';

const SectionElement = ({ section }: { section: Section }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-base">
                {section.tooltip ? (
                    <Tooltip tooltipText={section.tooltip}>
                        <div className="cursor-help flex justify-center items-center rounded-full bg-gray-500 text-white text-xs h-5 w-5 scale-75">
                            ?
                        </div>
                    </Tooltip>
                ) : (
                    section.title
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

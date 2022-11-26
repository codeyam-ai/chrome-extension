import Tooltip from '../../components/Tooltip';
import DetailElement from './DetailElement';

import type { Section } from './index';

const SectionElement = ({ section }: { section: Section }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-base text-slate-800 dark:text-slate-200">
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
            </div>
            {section.subtitle && (
                <div className="text-slate-600 dark:text-slate-400 py-1">
                    {section.subtitle}
                </div>
            )}
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

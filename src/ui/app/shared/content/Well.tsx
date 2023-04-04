import Body from '../typography/Body';
import BodyLarge from '../typography/BodyLarge';

import type { ReactNode } from 'react';

interface WellProps {
    header: string;
    subHeader: ReactNode;
    forceLightMode?: boolean;
}

const Well = ({ header, subHeader, forceLightMode }: WellProps) => {
    return (
        <div className="px-6 pb-6">
            <div
                className={`flex flex-col gap-4 py-10 px-6 text-center rounded-2xl bg-ethos-light-background-secondary ${
                    forceLightMode
                        ? ''
                        : 'dark:bg-ethos-dark-background-secondary'
                }`}
            >
                <BodyLarge isSemibold forceLightMode={forceLightMode}>
                    {header}
                </BodyLarge>
                <Body isTextColorMedium forceLightMode={forceLightMode}>
                    {subHeader}
                </Body>
            </div>
        </div>
    );
};

export default Well;

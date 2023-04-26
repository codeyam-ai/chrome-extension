import { useMemo, useRef } from 'react';

import DappListItem from './DappListItem';
import useConvertVerticalScrollToHorizontal from '_src/ui/app/hooks/useConvertVerticalScrollToHorizontal';

import type { DappData } from '_src/types/DappData';

interface DappListProps {
    dapps: DappData[];
}

export const DappList: React.FC<DappListProps> = ({ dapps }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    useConvertVerticalScrollToHorizontal(scrollContainerRef);

    const listItems = useMemo(() => {
        return dapps.map((dapp, index) => (
            <DappListItem key={index} dapp={dapp} />
        ));
    }, [dapps]);

    return (
        <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto no-scrollbar whitespace-nowrap py-2 bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
        >
            {listItems}
        </div>
    );
};

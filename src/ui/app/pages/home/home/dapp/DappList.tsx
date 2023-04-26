import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DappListItem from './DappListItem';
import DappView from './DappView';
import useConvertVerticalScrollToHorizontal from '_src/ui/app/hooks/useConvertVerticalScrollToHorizontal';

import type { DappData } from '_src/types/DappData';
import { useAppSelector } from '_src/ui/app/hooks';

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
            className="flex overflow-x-auto whitespace-nowrap py-2 bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
        >
            {listItems}
        </div>
    );
};

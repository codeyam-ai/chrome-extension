import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DappListItem from './DappListItem';
import DappView from './DappView';

import type { DappData } from './dappData';

interface ScrollingListProps {
    data: DappData[];
}

export const DappList: React.FC<ScrollingListProps> = ({ data }) => {
    const [selectedDapp, setSelectedDapp] = useState<DappData | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleItemClick = useCallback(
        (dapp: DappData) => {
            setSelectedDapp(dapp);
            if (dapp.route) {
                navigate(dapp.route, { replace: false });
            }
        },
        [navigate]
    );

    const listItems = useMemo(() => {
        return data.map((item, index) => (
            <DappListItem key={index} item={item} onClick={handleItemClick} />
        ));
    }, [data, handleItemClick]);

    const handleWheel = useCallback((event: WheelEvent) => {
        if (scrollContainerRef.current) {
            const deltaY = event.deltaY;
            const deltaX = event.deltaX;
            const ratio = Math.abs(deltaY / deltaX);

            if (ratio > 1) {
                scrollContainerRef.current.scrollLeft += event.deltaY;
                event.preventDefault();
            }
        }
    }, []);

    const closeDapp = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [handleWheel]);

    return (
        <div>
            <DappView dapp={selectedDapp} onClose={closeDapp} />
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto whitespace-nowrap py-4 bg-ethos-pale-purple dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
            >
                {listItems}
            </div>
        </div>
    );
};

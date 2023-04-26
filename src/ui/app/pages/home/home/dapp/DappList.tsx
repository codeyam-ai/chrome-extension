import { useCallback, useMemo, useRef, useState } from 'react';

import DappListItem from './DappListItem';
import useConvertVerticalScrollToHorizontal from '_src/ui/app/hooks/useConvertVerticalScrollToHorizontal';

import type { DappData } from '_src/types/DappData';

const DRAG_MOVEMENT_THRESHOLD = 5; // In px - anything less than this is considered a click

interface DappListProps {
    dapps: DappData[];
}

export const DappList: React.FC<DappListProps> = ({ dapps }) => {
    const [dragged, setDragged] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const mouseXRef = useRef<number | null>(null);
    const totalMovementXRef = useRef(0);
    useConvertVerticalScrollToHorizontal(scrollContainerRef);

    const listItems = useMemo(() => {
        return dapps.map((dapp, index) => (
            <DappListItem
                key={index}
                dapp={dapp}
                showArrowOnHover
                dragged={dragged}
            />
        ));
    }, [dapps, dragged]);

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        mouseXRef.current = e.nativeEvent.clientX;
    }, []);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (mouseXRef.current === null) return;

        const movementX = Math.abs(mouseXRef.current - e.nativeEvent.clientX);
        totalMovementXRef.current += movementX;

        if (totalMovementXRef.current > DRAG_MOVEMENT_THRESHOLD) {
            setDragged(true);
        }

        scrollContainerRef.current?.scrollBy({
            left: mouseXRef.current - e.nativeEvent.clientX,
        });

        mouseXRef.current = e.nativeEvent.clientX;
    }, []);

    const onMouseUp = useCallback(() => {
        mouseXRef.current = null;
        totalMovementXRef.current = 0;
        setDragged(false);
    }, []);

    return (
        <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto cursor-grab select-none no-scrollbar whitespace-nowrap py-2 bg-ethos-light-gray dark:bg-ethos-dark-background-secondary border-b border-ethos-light-purple dark:border-ethos-dark-background-default"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            {listItems}
        </div>
    );
};

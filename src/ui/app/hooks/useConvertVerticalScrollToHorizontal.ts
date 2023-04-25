import { useCallback, useEffect } from 'react';

export default function useConvertVerticalScrollToHorizontal(
    ref: React.RefObject<HTMLElement>
) {
    const handleWheel = useCallback(
        (event: WheelEvent) => {
            if (ref.current) {
                const deltaY = event.deltaY;
                const deltaX = event.deltaX;
                const ratio = Math.abs(deltaY / deltaX);

                if (ratio > 1) {
                    ref.current.scrollLeft += event.deltaY;
                    event.preventDefault();
                }
            }
        },
        [ref]
    );

    useEffect(() => {
        const container = ref.current;
        if (container) {
            container.addEventListener('wheel', handleWheel);
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel);
            }
        };
    }, [ref, handleWheel]);
}

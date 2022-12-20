import { useMemo } from 'react';

import useWindowDimensions from './useWindowDimensions';

export default function useIsMobile() {
    const { width } = useWindowDimensions();

    const isMobile = useMemo(() => {
        return width < 640;
    }, [width]);

    return isMobile;
}

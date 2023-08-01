import type { SuiObjectData } from '@mysten/sui.js';

const getDisplay = (
    display?: SuiObjectData['display']
): Record<string, string> | undefined => {
    if (!display) return;
    if (display?.data && typeof display?.data === 'object') {
        return display.data;
    }

    // at this point it's truthy (above), has no data (above),
    // and has no error, so it is the Record
    if (!('error' in display)) return display as Record<string, string>;
};

export default getDisplay;

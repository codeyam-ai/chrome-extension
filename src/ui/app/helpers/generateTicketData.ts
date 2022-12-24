import simpleApiCall from '_src/shared/utils/simpleApiCall';

import type { SuiJsonValue } from '@mysten/sui.js';

const generateTicketData = async (
    name: string,
    address: string
): Promise<{
    error?: string;
    data?: Record<string, SuiJsonValue>;
}> => {
    const generator = generators[name];

    if (!generator) {
        return {
            error: 'Unable to find that ticket project.',
        };
    }

    const { json, status } = await generator(address);

    if (status !== 200 || !json) {
        return {
            error: 'There was a network error. Please try again in a bit.',
        };
    }

    return { data: json };
};

const generators: Record<
    string,
    (name: string) => Promise<{
        status: number;
        json?: Record<string, SuiJsonValue>;
    }>
> = {
    'AI Capy': async (address: string) => {
        const response = await simpleApiCall('tickets/create', 'POST', '', {
            address,
        });
        return response;
    },
};

export default generateTicketData;

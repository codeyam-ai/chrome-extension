import { VALIDATORS_EVENTS_QUERY } from '@mysten/sui.js';

import { api } from '../../redux/store/thunk-extras';

import type { EventId, SuiEvent } from '@mysten/sui.js';

// NOTE: This copys the query limit from our Rust JSON RPC backend, this needs to be kept in sync!
const QUERY_MAX_RESULT_LIMIT = 1000;

type GetValidatorsEvent = {
    limit: number | null;
    order: 'ascending' | 'descending';
};

const getValidatorEvents = async ({ limit, order }: GetValidatorsEvent) => {
    const provider = api.instance.fullNode;

    if (!limit) {
        // Do some validation at the runtime level for some extra type-safety
        // https://tkdodo.eu/blog/react-query-and-type-script#type-safety-with-the-enabled-option
        throw new Error(
            `Limit needs to always be defined and non-zero! Received ${limit} instead.`
        );
    }

    if (limit > QUERY_MAX_RESULT_LIMIT) {
        let hasNextPage = true;
        let currCursor: EventId | null | undefined;
        const results: SuiEvent[] = [];

        while (hasNextPage && results.length < limit) {
            const validatorEventsResponse = await provider.queryEvents({
                query: { MoveEventType: VALIDATORS_EVENTS_QUERY },
                cursor: currCursor,
                limit: Math.min(limit, QUERY_MAX_RESULT_LIMIT),
                order,
            });

            hasNextPage = validatorEventsResponse.hasNextPage;
            currCursor = validatorEventsResponse.nextCursor;
            results.push(...validatorEventsResponse.data);
        }
        return results.slice(0, limit);
    }

    const validatorEventsResponse = await provider.queryEvents({
        query: { MoveEventType: VALIDATORS_EVENTS_QUERY },
        limit,
        order,
    });
    return validatorEventsResponse.data;
};

export default getValidatorEvents;

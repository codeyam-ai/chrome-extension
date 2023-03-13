import { useMemo } from 'react';

import { cleanObjectId } from '.';

import type {
    SuiMoveNormalizedFunction,
    TransactionEvents,
} from '@mysten/sui.js';

export type useCategorizedEventsArgs = {
    normalizedFunction?: SuiMoveNormalizedFunction;
    events?: TransactionEvents | null;
    address?: string | null;
};

const useCategorizedEffects = ({
    normalizedFunction,
    events,
    address,
}: useCategorizedEventsArgs) => {
    const reading = useMemo(() => {
        if (!normalizedFunction) return [];

        const readObjects = normalizedFunction.parameters
            .filter(
                (param) => typeof param !== 'string' && 'Reference' in param
            )
            .map((param) => {
                if (typeof param !== 'string' && 'Reference' in param) {
                    const reference = param.Reference;
                    if (
                        typeof reference !== 'string' &&
                        'Struct' in reference
                    ) {
                        return reference.Struct;
                    }
                }
                return null;
            });
        return readObjects;
    }, [normalizedFunction]);

    const creating = useMemo(() => {
        if (!events) return [];

        return events
            .filter(
                (event) =>
                    event.type === 'newObject' &&
                    typeof event.content.recipient === 'object' &&
                    'AddressOwner' in event.content.recipient &&
                    event.content.recipient.AddressOwner === address
            )
            .map((event) => {
                if (event.type !== 'newObject') return null;

                const objectTypeParts = event.content.objectType.split('::');
                return {
                    address: objectTypeParts[0],
                    module: objectTypeParts[1],
                    name: objectTypeParts[2].split('<')[0],
                };
            })
            .filter((event) => !!event);
    }, [events, address]);

    const mutating = useMemo(() => {
        if (!events) return [];

        return events
            .filter((event) => {
                return event.type === 'mutateObject';
            })
            .map((event) => {
                if (event.type !== 'mutateObject') return null;

                const objectTypeParts = event.content.objectType.split('::');
                return {
                    address: objectTypeParts[0],
                    module: objectTypeParts[1],
                    name: objectTypeParts[2].split('<')[0],
                };
            });
    }, [events]);

    const transferring = useMemo(() => {
        return [];
        // if (!effects?.events) return [];

        // const transferring = effects.events
        //     .filter(
        //         (event) =>
        //             'transferObject' in event &&
        //             event.transferObject &&
        //             typeof event.transferObject.recipient !== 'string' &&
        //             'AddressOwner' in event.transferObject.recipient &&
        //             event.transferObject.recipient.AddressOwner
        //     )
        //     .map((event) => {
        //         if (!('transferObject' in event)) return {};

        //         const objectTypeParts =
        //             event.transferObject.objectType.split('::');
        //         return {
        //             address: objectTypeParts[0],
        //             module: objectTypeParts[1],
        //             name: objectTypeParts[2].split('<')[0],
        //         };
        //     });

        // return transferring;
    }, [events]);

    const deleting = useMemo(() => {
        return [];
        // if (!effects?.events) return [];

        // const deleting = effects.events
        //     .filter((event) => 'deleteObject' in event)
        //     .map((event) => {
        //         if (!('deleteObject' in event)) return {};
        //         return {
        //             name: event.deleteObject.objectId,
        //         };
        //     });

        // return deleting;
    }, [events]);

    const coinChanges = useMemo(() => {
        const zero: Record<string, number> = {};
        return zero;

        // if (!effects?.events) return zero;

        // const coinBalanceChangeEvents = effects.events.filter(
        //     (e) =>
        //         'coinBalanceChange' in e &&
        //         typeof e.coinBalanceChange.owner !== 'string' &&
        //         'AddressOwner' in e.coinBalanceChange.owner &&
        //         e.coinBalanceChange.owner.AddressOwner === address
        // );

        // return coinBalanceChangeEvents.reduce((totals, e) => {
        //     if (!('coinBalanceChange' in e)) return totals;

        //     const { coinType, amount } = e.coinBalanceChange;
        //     if (!totals[coinType]) totals[coinType] = 0;
        //     totals[coinType] += amount * -1;
        //     return totals;
        // }, zero);
    }, [events, address]);

    return {
        reading,
        mutating,
        creating,
        deleting,
        transferring,
        coinChanges,
    };
};

export default useCategorizedEffects;

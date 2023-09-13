import { useMemo } from 'react';

// import { cleanObjectId } from '.';

import type {
    SuiMoveNormalizedFunction,
    SuiObjectChange,
} from '@mysten/sui.js/client';

export type useCategorizedEventsArgs = {
    normalizedFunction?: SuiMoveNormalizedFunction;
    objectChanges?: SuiObjectChange[] | null;
    address?: string | null;
};

const useCategorizedEffects = ({
    normalizedFunction,
    objectChanges,
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
        if (!objectChanges) return [];

        return [];
        // return events
        //     .filter(
        //         (event) =>
        //             event.type === 'newObject' &&
        //             typeof event.content.recipient === 'object' &&
        //             'AddressOwner' in event.content.recipient &&
        //             event.content.recipient.AddressOwner === address
        //     )
        //     .map((event) => {
        //         if (event.type !== 'newObject') return null;
        //
        //         const objectTypeParts = event.content.objectType.split('::');
        //         return {
        //             address: objectTypeParts[0],
        //             module: objectTypeParts[1],
        //             name: objectTypeParts[2].split('<')[0],
        //         };
        //     })
        //     .filter((event) => !!event);
    }, [objectChanges]);

    const mutating = useMemo(() => {
        if (!objectChanges) return [];

        return [];
        // return events
        //     .filter((event) => {
        //         return (
        //             event.type === 'mutateObject' //&&
        //             // typeof event.content.owner === 'object' &&
        //             // 'AddressOwner' in event.content.owner &&
        //             // event.content.owner.AddressOwner === address
        //         );
        //     })
        //     .map((event) => {
        //         if (event.type !== 'mutateObject') return null;
        //
        //         const objectTypeParts = event.content.objectType.split('::');
        //         return {
        //             address: objectTypeParts[0],
        //             module: objectTypeParts[1],
        //             name: objectTypeParts[2].split('<')[0],
        //         };
        //     })
        //     .filter((mutate) => !!mutate);
    }, [objectChanges]);

    const transferring = useMemo(() => {
        if (!objectChanges) return [];

        return [];
        // return events
        //     .filter(
        //         (event) =>
        //             event.type === 'transferObject' &&
        //             typeof event.content.recipient === 'object' &&
        //             'AddressOwner' in event.content.recipient &&
        //             event.content.recipient.AddressOwner
        //     )
        //     .map((event) => {
        //         if (event.type !== 'transferObject') return null;
        //
        //         const objectTypeParts = event.content.objectType.split('::');
        //         return {
        //             address: objectTypeParts[0],
        //             module: objectTypeParts[1],
        //             name: objectTypeParts[2].split('<')[0],
        //         };
        //     })
        //     .filter((transfer) => !!transfer);
    }, [objectChanges]);

    const deleting = useMemo(() => {
        if (!objectChanges) return [];

        return [];
        // const deleting = events
        //     .filter((event) => event.type === 'deleteObject')
        //     .map((event) => {
        //         if (event.type !== 'deleteObject') return null;
        //
        //         return {
        //             name: event.content.objectId,
        //         };
        //     })
        //     .filter((d) => !!d);
        //
        // return deleting;
    }, [objectChanges]);

    const coinChanges = useMemo(() => {
        const zero: Record<string, number> = {};

        if (!objectChanges) return zero;

        return zero;
        // const coinBalanceChangeEvents = events.filter(
        //     (e) =>
        //         e.type === 'coinBalanceChange' &&
        //         typeof e.content.owner === 'object' &&
        //         'AddressOwner' in e.content.owner &&
        //         e.content.owner.AddressOwner === address
        // );
        //
        // return coinBalanceChangeEvents.reduce((totals, e) => {
        //     if (e.type !== 'coinBalanceChange') return totals;
        //
        //     const { coinType, amount } = e.content;
        //     if (!totals[coinType]) totals[coinType] = 0;
        //     totals[coinType] += amount * -1;
        //     return totals;
        // }, zero);
    }, [objectChanges]);

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

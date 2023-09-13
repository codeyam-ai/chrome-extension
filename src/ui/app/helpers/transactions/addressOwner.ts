export type Owner =
    | 'Immutable'
    | { AddressOwner: string }
    | { ObjectOwner: string }
    | { Shared: { initial_shared_version: string | null } };

const addressOwner = (owner?: Owner): string | undefined => {
    return (
        (!!owner &&
            !!(typeof owner === 'object') &&
            !!('AddressOwner' in owner) &&
            owner.AddressOwner) ||
        undefined
    );
};

export default addressOwner;

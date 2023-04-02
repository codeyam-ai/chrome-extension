export type Owner =
    | {
          AddressOwner: string;
      }
    | {
          ObjectOwner: string;
      }
    | {
          Shared: {
              initial_shared_version: number;
          };
      }
    | 'Immutable';

const owner = (owner?: Owner) => {
    if (!owner) return 'Immutable';
    if (typeof owner === 'string') return owner;
    if ('AddressOwner' in owner) return owner.AddressOwner;
    if ('ObjectOwner' in owner) return owner.ObjectOwner;
    return 'Immutable';
};

export default owner;

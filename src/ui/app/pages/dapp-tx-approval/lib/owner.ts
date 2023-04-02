import type { SuiAddress } from '@mysten/sui.js';

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

const owner = (owner?: Owner, you?: SuiAddress) => {
    if (!owner) return 'Immutable';
    if (typeof owner === 'string') return owner;
    if ('AddressOwner' in owner) {
        if (you && owner.AddressOwner === you) return 'You';
        return owner.AddressOwner;
    }
    if ('ObjectOwner' in owner) return owner.ObjectOwner;
    return 'Immutable';
};

export default owner;

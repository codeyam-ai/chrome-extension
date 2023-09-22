import { useQuery } from '@tanstack/react-query';

import { api } from '../../redux/store/thunk-extras';

import type { DelegatedStake } from '@mysten/sui.js/client';
import type { UseQueryResult } from '@tanstack/react-query';

export default function useGetDelegatedStakes(
    address: string
): UseQueryResult<DelegatedStake[], Error> {
    const rpc = api.instance.client;

    return useQuery(['validator', address], () => {
        return rpc.getStakes({ owner: address });
    });
}

import { useMemo } from 'react';

import useGetDelegatedStakes from './useGetDelegatedStakes';
import useAppSelector from '../useAppSelector';

export const useTotalStakedSUI = () => {
    const { address } = useAppSelector(({ account }) => account);
    const { data: delegatedStakes, isLoading } = useGetDelegatedStakes(
        address || ''
    );

    // Total active stake for all delegations
    const totalActivePendingStakedSUI = useMemo(() => {
        if (!delegatedStakes) return BigInt(0);

        return delegatedStakes.reduce(
            (acc, curr) =>
                curr.stakes.reduce(
                    (total, { principal }) => total + BigInt(principal),
                    acc
                ),

            BigInt(0)
        );
    }, [delegatedStakes]);

    return {
        isLoading,
        delegatedStakes,
        totalActivePendingStakedSUI,
    };
};

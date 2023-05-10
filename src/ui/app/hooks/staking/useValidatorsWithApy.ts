import { type SuiAddress, type SuiValidatorSummary } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useSystemState } from './useSystemState';
import { roundFloat } from '../../helpers/roundFloat';
import { calculateValidatorStakeShare } from '../../helpers/staking/calculateValidatorStakeShare';
import { api } from '../../redux/store/thunk-extras';

import type { SuiValidatorSummaryWithApy } from '../../pages/home/home/dapp/dapps/Staking/ValidatorList';

const DEFAULT_APY_DECIMALS = 2;

export interface ApyWithValidatorMap {
    [validatorAddress: SuiAddress]: SuiValidatorSummaryWithApy;
}

// For small APY or epoch before stakeSubsidyStartEpoch, show ~0% instead of 0%
// If APY falls below 0.001, show ~0% instead of 0% since we round to 2 decimal places
const MINIMUM_THRESHOLD = 0.001;

export function useValidatorsWithApy() {
    const provider = api.instance.fullNode;
    const { data: systemState, isFetched } = useSystemState();

    const totalStake = useMemo(() => {
        if (!systemState?.activeValidators) return BigInt(0);
        return systemState.activeValidators.reduce(
            (acc, curr) => (acc += BigInt(curr.stakingPoolSuiBalance)),
            BigInt(0)
        );
    }, [systemState?.activeValidators]);

    return useQuery(
        ['get-rolling-average-apys'],
        async () => {
            const apy = await provider.getValidatorsApy();

            // check if stakeSubsidyStartEpoch is greater than current epoch, flag for UI to show ~0% instead of 0%
            const currentEpoch = Number(systemState?.epoch);
            const stakeSubsidyStartEpoch = Number(
                systemState?.stakeSubsidyStartEpoch
            );

            const activeValidators =
                systemState?.activeValidators.reduce((acc, validator) => {
                    acc[validator.suiAddress] = validator;
                    return acc;
                }, {} as { [suiAdress: string]: SuiValidatorSummary }) || {};

            return {
                activeValidators,
                validatorApys: apy,
                isStakeSubsidyStarted: currentEpoch > stakeSubsidyStartEpoch,
            };
        },
        {
            enabled: isFetched,
            select: ({
                activeValidators,
                validatorApys,
                isStakeSubsidyStarted,
            }) => {
                return validatorApys?.apys.reduce((acc, { apy, address }) => {
                    const validator = activeValidators[address];
                    acc[address] = {
                        ...validator,
                        stakeShare: calculateValidatorStakeShare(
                            BigInt(validator.stakingPoolSuiBalance),
                            totalStake,
                            2
                        ),
                        apy: roundFloat(apy * 100, DEFAULT_APY_DECIMALS),
                        isApyApproxZero:
                            !isStakeSubsidyStarted || apy < MINIMUM_THRESHOLD,
                    };
                    return acc;
                }, {} as ApyWithValidatorMap);
            },
        }
    );
}

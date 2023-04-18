import { useQuery } from '@tanstack/react-query';

import { getRollingAverageApys } from '../../helpers/staking/getRollingAverageApys';
import { api } from '../../redux/store/thunk-extras';

import type { SuiValidatorSummaryWithApy } from '../../pages/home/home/dapp/dapps/Staking/ValidatorList';
import type { SuiAddress } from '@mysten/sui.js';

interface SuiValidatorWithApyMap {
    [validatorAddress: SuiAddress]: SuiValidatorSummaryWithApy;
}

const getValidatorsWithApy = async () => {
    const provider = api.instance.fullNode;
    const res = await provider.getLatestSuiSystemState();
    // Current max: 1000 validators
    const rollingAverageApys = await getRollingAverageApys(1000, res);

    const validatorsWithApy: SuiValidatorWithApyMap =
        res.activeValidators.reduce((acc, validator) => {
            acc[validator.suiAddress] = {
                ...validator,
                apy: rollingAverageApys.data?.[validator.suiAddress] ?? 0,
            };

            return acc;
        }, {} as SuiValidatorWithApyMap);
    return validatorsWithApy;
};

export const useValidatorsWithApy = () => {
    return useQuery(['validators-with-apy'], getValidatorsWithApy, {
        staleTime: 3 * 1000,
    });
};

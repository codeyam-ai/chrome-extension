import BigNumber from 'bignumber.js';

export const calculateValidatorStakeShare = (
    validatorStake: bigint,
    totalStake: bigint,
    decimalPlaces = 2
) => {
    const bnValidatorStake = new BigNumber(validatorStake.toString());
    const bnTotalStake = new BigNumber(totalStake.toString());

    return bnValidatorStake
        .div(bnTotalStake)
        .multipliedBy(100)
        .decimalPlaces(decimalPlaces)
        .toNumber();
};

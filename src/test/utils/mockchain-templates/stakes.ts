import type { DelegatedStake } from '@mysten/sui.js';

interface MakeStakeObjectParams {
    stakeCount: number;
    stakePrincipal: string;
}
export const makeStakeObjects = ({
    stakeCount,
    stakePrincipal,
}: MakeStakeObjectParams) => {
    return [...Array(stakeCount || 1)].map((_, i) => ({
        validatorAddress:
            '0x0a392298244ca2694098d015b00cf49ae1168118b28d13cb0baafd5884e5559a',
        stakingPool:
            '0x093136a86b72b6aa1c84e84e72a00ca2260246441976f1ce070b136dbfc6b90f',
        stakes: [
            {
                stakedSuiId: `0xd32356af50f7aa6f26b89657c798968eaf5db3d43479ae793a01125e746ee9${i}c`,
                stakeRequestEpoch: '778',
                stakeActiveEpoch: '779',
                principal: stakePrincipal,
                status: 'Active',
                estimatedReward: '2388556',
            },
        ],
    }));
};

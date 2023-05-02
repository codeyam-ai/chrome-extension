import { MinusCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import {
    SUI_SYSTEM_STATE_OBJECT_ID,
    SUI_TYPE_ARG,
    TransactionBlock,
} from '@mysten/sui.js';
import { useQueryClient } from '@tanstack/react-query';
import { formatRelative } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { NUM_OF_EPOCH_BEFORE_EARNING } from '_src/shared/constants';
import ClickableTooltip from '_src/ui/app/components/ClickableTooltip';
import { getSigner } from '_src/ui/app/helpers/getSigner';
import getTimeToEarnStakeRewards from '_src/ui/app/helpers/staking/getTimeToEarnStakeRewards';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import useGetDelegatedStakes from '_src/ui/app/hooks/staking/useGetDelegatedStakes';
import { useSystemState } from '_src/ui/app/hooks/staking/useSystemState';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import { FailAlert } from '_src/ui/app/shared/alerts/FailAlert';
import Button from '_src/ui/app/shared/buttons/Button';
import ConfirmDestructiveActionDialog from '_src/ui/app/shared/dialog/ConfirmDestructiveActionDialog';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { SuiAddress } from '@mysten/sui.js';

interface Stake {
    status: 'Active' | 'Pending' | 'Unstaked';
    stakedSuiId: string;
    stakeRequestEpoch: string;
    stakeActiveEpoch: string;
    principal: string;
    estimatedReward?: string | undefined;
}

function revokeStakeTransaction(stakedSuiId: SuiAddress) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: '0x3::sui_system::request_withdraw_stake',
        arguments: [
            tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
            tx.object(stakedSuiId),
        ],
    });
    return tx;
}

const StakeDetail: React.FC = () => {
    const { validatorAddress } = useParams();

    const { address } = useAppSelector(({ account }) => account);
    const { data: allDelegatedStakes } = useGetDelegatedStakes(address || '');

    const delegatedStake = useMemo(() => {
        return allDelegatedStakes?.find(
            (stake) => stake.validatorAddress === validatorAddress
        );
    }, [validatorAddress, allDelegatedStakes]);

    const amountStaked = useMemo(() => {
        return delegatedStake?.stakes.reduce(
            (total, { principal }) => total + BigInt(principal),
            BigInt(0)
        );
    }, [delegatedStake]);

    const [formattedAmount, symbol] = useFormatCoin(amountStaked, SUI_TYPE_ARG);

    const { data: validators } = useValidatorsWithApy();
    const validator = validators?.[delegatedStake?.validatorAddress || ''];

    if (!delegatedStake?.stakes) {
        return <Navigate to="/home/staking" />;
    }

    return (
        <div className="w-full flex flex-col h-full items-center">
            <div className="p-4 flex flex-col items-center place-content-center">
                {validator?.imageUrl ? (
                    <img
                        src={validator.imageUrl}
                        alt={validator.name}
                        className="h-16 w-16 rounded-full"
                    />
                ) : (
                    <div className="h-16 w-16 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                )}
                <Subheader className="pt-2">{validator?.name}</Subheader>
                <Body>APY: {validator?.apy}%</Body>
            </div>
            <div className="flex gap-1 items-baseline">
                <Body isTextColorMedium>Total staked:</Body>
                <BodyLarge isSemibold>
                    {formattedAmount} {symbol}
                </BodyLarge>
            </div>
            <BodyLarge
                isTextColorMedium
                isSemibold
                className="self-start pt-4 pl-4"
            >
                Stakes:
            </BodyLarge>
            {delegatedStake?.stakes.map((stake) => (
                <StakeRow key={stake.stakedSuiId} stake={stake} />
            ))}
        </div>
    );
};

const REMOVE_STAKE_INFO_TEXT =
    'Rewards are not earned until you have Unstaked.';
const StakeRow = ({ stake }: { stake: Stake }) => {
    const {
        activeAccountIndex,
        address,
        authentication,
        accountInfos,
        passphrase,
    } = useAppSelector(({ account }) => account);

    const { stakedSuiId } = stake;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    const [formattedPrincipal, symbol] = useFormatCoin(
        stake?.principal,
        SUI_TYPE_ARG
    );

    const onClickRevokeStake = useCallback(
        () => setIsModalOpen(true),
        [setIsModalOpen]
    );

    const onConfirmRevokeStake = useCallback(async () => {
        if (!stakedSuiId) return;

        setLoading(true);

        const signer = await getSigner(
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex
        );

        if (!signer) return;

        const transactionBlock = revokeStakeTransaction(stakedSuiId);

        try {
            await signer.signAndExecuteTransactionBlock({
                transactionBlock,
                options: {
                    showInput: true,
                    showEffects: true,
                    showEvents: true,
                },
            });
            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['system', 'state'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['validator', address],
                }),
            ]);
        } catch (error) {
            toast(<FailAlert text="Unable to revoke this Stake transaction" />);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    }, [
        accountInfos,
        activeAccountIndex,
        address,
        authentication,
        passphrase,
        queryClient,
        stakedSuiId,
    ]);

    const onCancelConfirmRevokeStake = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    const { data: systemState } = useSystemState();

    const earningRewardsEpoch =
        Number(stake?.stakeRequestEpoch) + NUM_OF_EPOCH_BEFORE_EARNING;
    const isEarnedRewards =
        Number(systemState?.epoch) >= Number(earningRewardsEpoch);

    const formattedDistanceToRewards = useMemo(() => {
        const timeToRewardsStart = getTimeToEarnStakeRewards(
            earningRewardsEpoch,
            systemState
        );
        return formatRelative(new Date(timeToRewardsStart), new Date());
    }, [systemState, earningRewardsEpoch]);

    const estimatedReward = isEarnedRewards
        ? mistToSui(Number(stake.estimatedReward), 9)
        : 0.0;

    return (
        <div className="w-full flex flex-col py-3 px-4 border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    <Body isSemibold>
                        {formattedPrincipal} {symbol}
                    </Body>
                    <Body isTextColorMedium>{stake.status}</Body>
                </div>

                <div className="flex">
                    <div className="flex gap-1">
                        <Body isTextColorMedium>Earned Reward:</Body>
                        <Body isSemibold>{estimatedReward} SUI</Body>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end items-center">
                {!isEarnedRewards && (
                    <div className="pr-2">
                        <Body>Starts earning {formattedDistanceToRewards}</Body>
                    </div>
                )}
                <Button
                    isInline
                    removeContainerPadding
                    buttonStyle="secondary"
                    onClick={onClickRevokeStake}
                >
                    <ClickableTooltip
                        message={REMOVE_STAKE_INFO_TEXT}
                        tooltipPosition="below"
                    >
                        <InformationCircleIcon className="h-4 w-4 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                    </ClickableTooltip>
                    Unstake
                </Button>
            </div>
            <ConfirmDestructiveActionDialog
                primaryActionIsLoading={loading}
                onCancel={onCancelConfirmRevokeStake}
                onConfirm={onConfirmRevokeStake}
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Are you sure you want to Unstake?"
                description="This action cannot be undone."
                primaryButtonText="Unstake SUI"
                secondaryButtonText="Cancel"
            />
        </div>
    );
};
export default StakeDetail;

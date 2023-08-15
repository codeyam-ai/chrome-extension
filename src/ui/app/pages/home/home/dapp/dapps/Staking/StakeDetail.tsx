import {
    ExclamationTriangleIcon,
    MinusCircleIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import {
    SUI_SYSTEM_STATE_OBJECT_ID,
    TransactionBlock,
} from '@mysten/sui.js';
import { SUI_TYPE_ARG } from '@mysten/sui.js/utils';
import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Card } from './ExistingStake';
import ValidatorImage from './Validator/ValidatorImage';
import ClickableLargeTooltip from '_src/ui/app/components/ClickableTooltip';
import { useSuiLedgerClient } from '_src/ui/app/components/ledger/SuiLedgerClientProvider';
import { getSigner } from '_src/ui/app/helpers/getSigner';
import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import { useDistanceToStartEarningRewards } from '_src/ui/app/hooks/staking/useDistanceToStartEarningRewards';
import useGetDelegatedStakes from '_src/ui/app/hooks/staking/useGetDelegatedStakes';
import { useSystemState } from '_src/ui/app/hooks/staking/useSystemState';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';
import { FailAlert } from '_src/ui/app/shared/alerts/FailAlert';
import Button from '_src/ui/app/shared/buttons/Button';
import ConfirmDestructiveActionDialog from '_src/ui/app/shared/dialog/ConfirmDestructiveActionDialog';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

const APY_HELP_TEXT =
    "Annualized Percentage Yield of validator's past operations. Note, there is no guarantee APY will true indefinitely";
const COMMISSION_HELP_TEXT =
    'Fee charged against earned rewards by the validator for staking services';

function revokeStakeTransaction(stakedSuiId: string) {
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
    const { connectToLedger } = useSuiLedgerClient();
    const { validatorAddress, stakedSuiId } = useParams();

    const {
        activeAccountIndex,
        address,
        authentication,
        accountInfos,
        passphrase,
    } = useAppSelector(({ account }) => account);
    const { data: allDelegatedStakes } = useGetDelegatedStakes(address || '');
    const { data: systemState } = useSystemState();
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const stake = useMemo(() => {
        return allDelegatedStakes
            ?.find(
                (delegatedStake) =>
                    delegatedStake.validatorAddress === validatorAddress
            )
            ?.stakes.find((stake) => stake.stakedSuiId === stakedSuiId);
    }, [allDelegatedStakes, validatorAddress, stakedSuiId]);

    const { isEarningRewards, timeToRewardsStart } =
        useDistanceToStartEarningRewards(stake, systemState);

    const [formattedPrincipal, symbol] = useFormatCoin(
        stake?.principal,
        SUI_TYPE_ARG
    );

    const [formattedRewards, rewardSymbol] = useFormatCoin(
        stake?.estimatedReward,
        SUI_TYPE_ARG,
        9
    );

    const { data: validators } = useValidatorsWithApy();
    const validator = validators?.[validatorAddress ?? ''];

    const hasInactiveValidatorDelegation = !systemState?.activeValidators?.find(
        ({ stakingPoolId }) => stakingPoolId === validator?.stakingPoolId
    );

    const onClickRevokeStake = useCallback(
        () => stake?.status !== 'Pending' && setIsModalOpen(true),
        [setIsModalOpen, stake?.status]
    );

    const onCancelConfirmRevokeStake = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    const onConfirmRevokeStake = useCallback(async () => {
        if (!stakedSuiId || stake?.status === 'Pending') return;

        setLoading(true);

        const signer = await getSigner(
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex,
            connectToLedger
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
        connectToLedger,
        passphrase,
        queryClient,
        stake?.status,
        stakedSuiId,
    ]);

    if (!stake) {
        return <Navigate to="/home/staking" />;
    }

    return (
        <div className="w-full flex flex-col h-full items-center px-6 mt-4">
            <div className="w-full">
                <Card
                    className={classNames(
                        hasInactiveValidatorDelegation
                            ? 'bg-ethos-failure-red/20'
                            : ''
                    )}
                >
                    <Body>Validator</Body>
                    <div className="flex justify-center place-content-center py-2">
                        <ValidatorImage
                            validator={validator}
                            className="h-5 w-5 rounded-full"
                        />
                        <BodyLarge isSemibold className="ml-2">
                            {validator?.name}
                        </BodyLarge>
                    </div>
                    {hasInactiveValidatorDelegation && (
                        <div className="flex items-center justify-center">
                            <ExclamationTriangleIcon className="w-3 h-3 mr-1 text-ethos-failure-red" />
                            <Body className="text-ethos-failure-red !text-xs">
                                Validator is no longer valid. Please Unstake.
                            </Body>
                        </div>
                    )}
                </Card>
            </div>
            <div className="flex w-full gap-3 mt-3">
                <div className="basis-1/2 justify-center">
                    <Card className="w-full">
                        <div className="py-2">
                            <Body>Your Stake</Body>
                            <div className="flex justify-center place-content-center gap-1">
                                <Body isSemibold>{formattedPrincipal}</Body>
                                <Body>{symbol}</Body>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="basis-1/2">
                    <Card
                        className="w-full"
                        backgroundColor={
                            isEarningRewards
                                ? 'bg-ethos-light-background-green'
                                : undefined
                        }
                    >
                        <div className="py-2">
                            {isEarningRewards ? (
                                <>
                                    <Body>Earned</Body>
                                    <Body className="text-ethos-success-green">
                                        <div className="flex justify-center place-content-center gap-1">
                                            <Body isSemibold>
                                                {formattedRewards}
                                            </Body>
                                            <Body>{rewardSymbol}</Body>
                                        </div>
                                    </Body>
                                </>
                            ) : (
                                <>
                                    <Body>Starts earning in</Body>
                                    <Body isSemibold>{timeToRewardsStart}</Body>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="flex w-full gap-3 mt-3">
                <div className="basis-1/2">
                    <Card className="w-full">
                        <div className="py-2">
                            <div className="flex items-center place-content-center">
                                <Body>APY</Body>
                                <ClickableLargeTooltip
                                    message={APY_HELP_TEXT}
                                    tooltipPosition="above"
                                >
                                    <QuestionMarkCircleIcon className="h-4 w-4 ml-1 mt-1 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                                </ClickableLargeTooltip>
                            </div>
                            <div className="flex justify-center place-content-center">
                                <Body isSemibold>{validator?.apy}</Body>
                                <Body>%</Body>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="basis-1/2">
                    <Card className="w-full">
                        <div className="py-2">
                            <div className="flex items-center place-content-center">
                                <Body>Commission</Body>
                                <ClickableLargeTooltip
                                    message={COMMISSION_HELP_TEXT}
                                    tooltipPosition="above"
                                >
                                    <QuestionMarkCircleIcon className="h-4 w-4 ml-1 mt-1 text-ethos-light-primary-light dark:text-ethos-dark-primary-dark" />
                                </ClickableLargeTooltip>
                            </div>
                            <div className="flex justify-center place-content-center">
                                <Body isSemibold>
                                    {(
                                        Number(validator?.commissionRate) / 100
                                    ).toString()}
                                </Body>
                                <Body>%</Body>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="w-full">
                <Button
                    onClick={onClickRevokeStake}
                    className="mt-4 bg-ethos-light-background-purple"
                    buttonStyle="secondary"
                    removeContainerPadding
                    disabled={stake?.status === 'Pending'}
                >
                    <MinusCircleIcon width={18} height={18} />
                    {stake?.status === 'Pending'
                        ? 'Status: Pending'
                        : 'Unstake SUI'}
                </Button>
                <Body className="py-4">
                    Staked SUI in Pending state cannot be unstaked.
                </Body>
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

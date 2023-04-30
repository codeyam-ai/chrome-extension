import { TransactionBlock, SUI_SYSTEM_STATE_OBJECT_ID } from '@mysten/sui.js';
import { useQueryClient } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useMemo, useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import StakeSummary from './StakeSummary';
import { ToS_LINK } from '_src/shared/constants';
import LoadingIndicator from '_src/ui/app/components/loading/LoadingIndicator';
import { getSigner } from '_src/ui/app/helpers/getSigner';
import { calculateStakeRewardStart } from '_src/ui/app/helpers/staking/calculateStakeRewardStart';
import { useAppSelector } from '_src/ui/app/hooks';
import { useSystemState } from '_src/ui/app/hooks/staking/useSystemState';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import { FailAlert } from '_src/ui/app/shared/alerts/FailAlert';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

function createStakeTransaction(amount: bigint, validator: string) {
    const tx = new TransactionBlock();
    const stakeCoin = tx.splitCoins(tx.gas, [tx.pure(amount)]);
    tx.moveCall({
        target: '0x3::sui_system::request_add_stake',
        arguments: [
            tx.object(SUI_SYSTEM_STATE_OBJECT_ID),
            stakeCoin,
            tx.pure(validator),
        ],
    });
    return tx;
}

const ReviewStake: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const {
        activeAccountIndex,
        address,
        authentication,
        accountInfos,
        passphrase,
    } = useAppSelector(({ account }) => account);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');

    const { data: validators } = useValidatorsWithApy();
    const queryClient = useQueryClient();

    const validator = useMemo(() => {
        return validators && validators[validatorSuiAddress || ''];
    }, [validatorSuiAddress, validators]);

    const { data: systemState } = useSystemState();

    const { formattedDistanceToRewards } = useMemo(() => {
        return calculateStakeRewardStart(systemState);
    }, [systemState]);

    const amount = searchParams.get('amount');

    const onConfirm = useCallback(async () => {
        if (!amount) return;
        setLoading(true);

        const signer = await getSigner(
            passphrase,
            accountInfos,
            address,
            authentication,
            activeAccountIndex
        );

        if (!signer) return;

        const transactionBlock = createStakeTransaction(
            BigInt(new BigNumber(amount).shiftedBy(9).toString()),
            validatorSuiAddress ?? ''
        );

        try {
            const response = await signer.signAndExecuteTransactionBlock({
                transactionBlock,
                options: {
                    showInput: true,
                    showEffects: true,
                    showEvents: true,
                },
            });

            const { effects } = response;
            const status = effects?.status;

            if (status?.status === 'failure') {
                throw new Error(status.error);
            }

            Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ['system', 'state'],
                }),
                queryClient.invalidateQueries({
                    queryKey: ['validator'],
                }),
            ]);
            navigate(
                `/home/staking/complete?${new URLSearchParams({
                    response: response.digest,
                    validator: validatorSuiAddress ?? '',
                    amount: (amount ?? '').toString(),
                }).toString()}`
            );
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('error', error);

            toast(<FailAlert text={`Something went wrong. ${error}`} />);
        }
        setLoading(false);
    }, [
        accountInfos,
        activeAccountIndex,
        address,
        amount,
        authentication,
        navigate,
        passphrase,
        queryClient,
        validatorSuiAddress,
    ]);

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <Subheader className={'text-center mb-6 mt-2'}>
                    Review Stake
                </Subheader>
                <div className="px-6 pb-6">
                    <StakeSummary
                        amount={amount || undefined}
                        stakingAPY={validator?.apy?.toString()}
                        rewardsStart={formattedDistanceToRewards}
                        gasPrice={mistToSui(+(validator?.gasPrice || '0'), 4)}
                        showRowDividers
                    />
                </div>
            </div>
            <div>
                <Body className="pb-4 mx-6">
                    By clicking confirm you agree to
                    <br />
                    <EthosLink type="external" to={ToS_LINK}>
                        Ethos&apos;s Terms of Use
                    </EthosLink>
                    {/* , and understand the{' '}
                    <EthosLink type="external" to="">
                        Risk Disclosures
                    </EthosLink> */}
                    .
                </Body>
                <Button onClick={onConfirm} disabled={loading}>
                    {loading ? <LoadingIndicator /> : 'Confirm'}
                </Button>
            </div>
        </div>
    );
};

export default ReviewStake;

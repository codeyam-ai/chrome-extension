import {
    TransactionBlock,
    type SuiValidatorSummary,
    SUI_SYSTEM_STATE_OBJECT_ID,
} from '@mysten/sui.js';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import StakeSummary from './StakeSummary';
import { useValidatorsWithApy } from './ValidatorList';
import { ToS_LINK } from '_src/shared/constants';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import { api, thunkExtras } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import { useAppSelector } from '_src/ui/app/hooks';
import BigNumber from 'bignumber.js';

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
    const { activeAccountIndex, address, authentication } = useAppSelector(
        ({ account }) => account
    );
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');

    const { validators } = useValidatorsWithApy();

    const validator = useMemo(() => {
        return validators && validators[validatorSuiAddress || ''];
    }, [validatorSuiAddress, validators]);

    const amount = searchParams.get('amount');

    const onConfirm = useCallback(async () => {
        if (!amount) return;
        let signer;

        if (authentication) {
            signer = api.getEthosSignerInstance(address || '', authentication);
        } else {
            signer = api.getSignerInstance(
                thunkExtras.keypairVault.getKeyPair(activeAccountIndex)
            );
        }

        const transactionBlock = createStakeTransaction(
            BigInt(new BigNumber(amount).shiftedBy(9).toString()),
            validatorSuiAddress ?? ''
        );
        const response = await signer.signAndExecuteTransactionBlock({
            transactionBlock,
            options: {
                showInput: true,
                showEffects: true,
                showEvents: true,
            },
        });
        console.log('RESPONSE', response);

        // navigate(
        //     `/home/staking/complete?${new URLSearchParams({
        //         validator: validatorSuiAddress ?? '',
        //         amount: (amount ?? '').toString(),
        //     }).toString()}`
        // );
    }, [
        activeAccountIndex,
        address,
        amount,
        authentication,
        navigate,
        validatorSuiAddress,
    ]);

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <Subheader className={'text-center mb-6'}>
                    Review Stake
                </Subheader>
                <StakeSummary
                    amount={amount || undefined}
                    stakingAPY={validator?.apy?.toString()}
                    rewardsStart={'Tomorrow'}
                    gasPrice={mistToSui(+(validator?.gasPrice || '0'), 4)}
                />
            </div>
            <div>
                <Body className="pb-4 mx-6">
                    By clicking confirm you agree to{' '}
                    <EthosLink type="external" to={ToS_LINK}>
                        Ethos&apos;s Terms of Use
                    </EthosLink>
                    , and understand the{' '}
                    <EthosLink type="external" to="">
                        Risk Disclosures
                    </EthosLink>
                    .
                </Body>
                <Button onClick={onConfirm}>Confirm</Button>
            </div>
        </div>
    );
};

export default ReviewStake;

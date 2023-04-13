import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ToS_LINK } from '_src/shared/constants';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { SuiValidatorSummary } from '@mysten/sui.js';
import StakeSummary from './StakeSummary';
import { useValidatorsWithApy } from './ValidatorList';

const ReviewStake: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');

    const { validators } = useValidatorsWithApy();

    const validator = useMemo(() => {
        return validators && validators[validatorSuiAddress || ''];
    }, [validatorSuiAddress, validators]);

    const amount = searchParams.get('amount');

    const onConfirm = useCallback(() => {
        navigate(
            `/home/staking/complete?${new URLSearchParams({
                validator: validatorSuiAddress ?? '',
                amount: (amount ?? '').toString(),
            }).toString()}`
        );
    }, [amount, navigate, validatorSuiAddress]);

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

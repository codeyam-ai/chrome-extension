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

const ReviewStake: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [validators, setValidators] = useState<SuiValidatorSummary[]>([]);
    const validatorSuiAddress = searchParams.get('validator');
    const validator = useMemo(() => {
        return validators.find((v) => v.suiAddress === validatorSuiAddress);
    }, [validatorSuiAddress, validators]);
    const amount = searchParams.get('amount');

    const onConfirm = useCallback(() => {
        navigate(
            `/home/staking/confirm?${new URLSearchParams({
                validator: validatorSuiAddress ?? '',
                amount: (amount ?? '').toString(),
            }).toString()}`
        );
    }, [amount, navigate, validatorSuiAddress]);

    useEffect(() => {
        // NOTE look into useQuery for fetching validators
        const fetchValidators = async () => {
            const provider = api.instance.fullNode;
            const res = await provider.getLatestSuiSystemState();
            setValidators(res.activeValidators);
        };
        fetchValidators();
    }, []);

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <Subheader className={'text-center mb-6'}>
                    Review Stake
                </Subheader>
                <KeyValueList
                    rowClassName="pb-2 border-b border-ethos-light-purple dark:border-ethos-dark-text-stroke"
                    keyNamesAndValues={[
                        {
                            keyName: 'Stake',
                            value: `${amount} SUI`,
                        },
                        {
                            keyName: 'Staking APY',
                            value: '0.00%',
                        },
                        {
                            keyName: 'Staking Rewards Start',
                            keyHelpMessage:
                                'The staked SUI starts earning reward at the end of the Epoch in which it was staked. The rewards will become available at the end of one full Epoch of staking.',
                            value: 'Eh, couple days',
                        },
                        {
                            keyName: 'Gas Fee',
                            value: `${mistToSui(
                                +(validator?.gasPrice || '0'),
                                4
                            )} SUI`,
                        },
                    ]}
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

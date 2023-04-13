import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import StakeSummary from './StakeSummary';
import StakingIcon from '_assets/images/staking-icon.png';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

import type { SuiValidatorSummary } from '@mysten/sui.js';

const CompletedStake: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [validators, setValidators] = useState<SuiValidatorSummary[]>([]);
    const validatorSuiAddress = searchParams.get('validator');
    const validator = useMemo(() => {
        return validators.find((v) => v.suiAddress === validatorSuiAddress);
    }, [validatorSuiAddress, validators]);
    const amount = searchParams.get('amount');

    const onNavigateToTokens = useCallback(() => {
        navigate('/tokens');
    }, [navigate]);

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
            <div className="flex gap-2 items-center place-content-center py-5 bg-ethos-light-green/10 dark:bg-ethos-dark-green/10 ">
                <CheckCircleIcon className="h-5 w-5 text-ethos-light-green dark:text-ethos-dark-green" />
                <BodyLarge
                    className="text-ethos-light-green dark:text-ethos-dark-green"
                    isSemibold
                >
                    Staking Complete!
                </BodyLarge>
            </div>
            <div>
                <img
                    src={StakingIcon}
                    alt={'Icon representing staking on the Sui network'}
                    className={'mx-auto'}
                />

                <StakeSummary
                    amount={amount || ''}
                    stakingAPY={'1.134'}
                    rewardsStart={'Tomorrow'}
                    gasPrice={mistToSui(+(validator?.gasPrice || '0'), 4)}
                />
            </div>
            <div>
                <Button onClick={onNavigateToTokens}>Go to SUI Balance</Button>
            </div>
        </div>
    );
};

export default CompletedStake;

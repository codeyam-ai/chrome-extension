import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import StakeSummary from './StakeSummary';
import { useValidatorsWithApy } from './ValidatorList';
import StakingIcon from '_assets/images/staking-icon.png';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

const CompletedStake: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');
    const amount = searchParams.get('amount');

    const { validators } = useValidatorsWithApy();

    const validator = useMemo(() => {
        return validators && validators[validatorSuiAddress || ''];
    }, [validatorSuiAddress, validators]);

    const onNavigateToTokens = useCallback(() => {
        navigate('/tokens');
    }, [navigate]);

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
                    amount={amount || undefined}
                    stakingAPY={validator?.apy?.toString()}
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

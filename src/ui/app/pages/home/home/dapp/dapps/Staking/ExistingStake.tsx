import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import StakingIcon from '_assets/images/staking-icon.png';
import { useFormatCoin } from '_src/ui/app/hooks';
import Button from '_src/ui/app/shared/buttons/Button';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import Title from '_src/ui/app/shared/typography/Title';

interface ExistingStakeProps {
    amountStaked: bigint;
    // validator: SuiValidatorSummaryWithApy;
}

const ExistingStake: React.FC<ExistingStakeProps> = ({
    amountStaked,
    // validator,
}) => {
    const navigate = useNavigate();

    const [formatted, symbol, , , , queryResult] = useFormatCoin(
        amountStaked,
        SUI_TYPE_ARG
    );

    return (
        <div className="w-full flex flex-col h-full justify-between">
            <div className="flex gap-2 items-center place-content-center py-5 bg-ethos-light-green/10 dark:bg-ethos-dark-green/10 ">
                <CheckCircleIcon className="h-5 w-5 text-ethos-light-green dark:text-ethos-dark-green" />
                <BodyLarge
                    className="text-ethos-light-green dark:text-ethos-dark-green"
                    isSemibold
                >
                    Your staked SUI is earning rewards!
                </BodyLarge>
            </div>
            <div>
                <img
                    src={StakingIcon}
                    alt={'Icon representing staking on the Sui network'}
                    className={'mx-auto'}
                />

                <div className="flex flex-col items-center place-content-center">
                    <Subheader isTextColorMedium>Total staked:</Subheader>
                    <Title>
                        {formatted} {symbol}
                    </Title>
                </div>
            </div>
            <div>
                <Button to={'/home/staking/select-validator'}>
                    Stake More
                </Button>
            </div>
        </div>
    );
};

export default ExistingStake;

import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import StakingLogo from '_images/dapps/logos/staking.png';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';

interface StakedInfoProps {
    totalActivePendingStakedSUI: bigint;
}
const StakedInfo: React.FC<StakedInfoProps> = ({
    totalActivePendingStakedSUI,
}) => {
    const [formattedStakedSui, symbol] = useFormatCoin(
        totalActivePendingStakedSUI,
        SUI_TYPE_ARG
    );

    return (
        <div data-testid="staked-sui-info">
            <Body className="ml-1 mb-2">Currently Staked SUI</Body>
            <Link to="/home/staking">
                <div className="flex w-full mb-4 rounded-lg bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
                    <img
                        src={StakingLogo}
                        alt="staking logo"
                        className="object-cover w-[60px] h-[60px] rounded-l-lg"
                    />
                    <div className="flex w-full justify-between items-center px-4">
                        <BodyLarge isSemibold>
                            {formattedStakedSui} {symbol}
                        </BodyLarge>
                        <Body
                            isSemibold
                            className="text-ethos-light-primary-light dark:text-ethos-dark-primary-dark"
                        >
                            {totalActivePendingStakedSUI
                                ? 'Go to Staking'
                                : 'Stake'}
                        </Body>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default memo(StakedInfo);

import { memo } from 'react';

import StakingLogo from '_images/dapps/logos/staking.png';
import { useFormatCoin } from '_src/ui/app/hooks';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import { SUI_TYPE_ARG } from '@mysten/sui.js';

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
            <Body className="ml-1">Currently Staked SUI</Body>
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
                    <EthosLink
                        type="internal"
                        to="/home/staking"
                        className="text-sm"
                    >
                        {totalActivePendingStakedSUI
                            ? 'Go to Staking'
                            : 'Stake'}
                    </EthosLink>
                </div>
            </div>
        </div>
    );
};

export default memo(StakedInfo);

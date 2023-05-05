import { SUI_TYPE_ARG } from '@mysten/sui.js';
import StakingLogo from '_images/dapps/logos/staking.png';
import { useFormatCoin } from '_src/ui/app/hooks';
import { useTotalStakedSUI } from '_src/ui/app/hooks/staking/useTotalStakedSUI';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';

export const StakedInfo = () => {
    const { totalActivePendingStakedSUI } = useTotalStakedSUI();

    const [formattedStakedSui, symbol] = useFormatCoin(
        totalActivePendingStakedSUI,
        SUI_TYPE_ARG
    );

    return (
        <>
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
                        Go to Staking
                    </EthosLink>
                </div>
            </div>
        </>
    );
};

import SuiIcon from '../svg/SuiIcon';
import BodyLarge from '../typography/BodyLarge';

export const CoinSelect = () => (
    <div
        className={
            'pr-6 flex flex-row gap-2 p-2 rounded-full items-center bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary'
        }
    >
        <div
            className={
                'rounded-full w-6 h-6 flex justify-center items-center bg-[#3D5FF2]'
            }
        >
            <SuiIcon width={16} height={16} />
        </div>
        <BodyLarge>SUI</BodyLarge>
    </div>
);

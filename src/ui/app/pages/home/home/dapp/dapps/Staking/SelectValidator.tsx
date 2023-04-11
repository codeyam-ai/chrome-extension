import Subheader from '_src/ui/app/shared/typography/Subheader';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';

interface ValidatorSelectProps {
    validator?: string;
    apy?: string;
    isHighReward: boolean;
}

const ValidatorSelect = ({
    validator,
    apy,
    isHighReward,
}: ValidatorSelectProps) => {
    return (
        <div
            className={
                'py-4 px-3 text-left border-1 border-color-ethos-light-text-medium dark:border-color-ethos-dark-secondary'
            }
        >
            <div className={'flex flex-col justify-between relative'}>
                {isHighReward && (
                    <div className={'absolute top-0 right-0'}>
                        Highest Reward
                    </div>
                )}
                <div className={'mb-8 text-md'}>Coinbase</div>
                <div className={'text-xl font-bold'}>
                    5.5% <span className={'text'}>APY</span>
                </div>
            </div>
        </div>
    );
};

const SelectValidator: React.FC = () => {
    // add component
    return (
        <div className={'p-6 relative'}>
            <Subheader className={'text-center'}>
                Select a staking validator
            </Subheader>
            <EthosLink
                className={'font-height-[24px] underline'}
                to={'/home/staking/learn-more'}
                type={LinkType.Internal}
            >
                What is Staking?
            </EthosLink>
            <ValidatorSelect isHighReward={true} />
            <ValidatorSelect isHighReward={false} />
        </div>
    );
};

export default SelectValidator;

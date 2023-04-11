import Subheader from '_src/ui/app/shared/typography/Subheader';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';
import Button from '_src/ui/app/shared/buttons/Button';
import { useCallback } from 'react';

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
    const selectValidator = useCallback(() => {
        console.log(validator);
    }, []);

    return (
        <button
            onClick={selectValidator}
            className={
                'block w-full mb-5 rounded-md py-4 px-3 text-left border hover:border hover:dark:border-ethos-dark-primary-dark border-ethos-light-text-medium dark:border-ethos-dark-text-stroke transition-all'
            }
        >
            <div className={'flex flex-col justify-between relative'}>
                {isHighReward && (
                    <div
                        className={
                            'absolute text-white top-[-27px] right-2 text-sm p-1 bg-[#01C57E] rounded-md'
                        }
                    >
                        Highest Reward
                    </div>
                )}
                <div className={'mb-6 text-lg'}>{validator}</div>
                <div className={'text-2xl font-bold'}>
                    {apy}%{' '}
                    <span
                        className={
                            'text-lg text-ethos-light-text-medium dark:text-ethos-dark-text-secondary'
                        }
                    >
                        APY
                    </span>
                </div>
            </div>
        </button>
    );
};

const SelectValidator: React.FC = () => {
    // add component
    return (
        <div className={'p-6 relative'}>
            <Subheader className={'text-center mb-1'}>
                Select a staking validator
            </Subheader>
            <EthosLink
                className={'text-sm underline'}
                to={'/home/staking/learn-more'}
                type={LinkType.Internal}
            >
                What is Staking?
            </EthosLink>
            <div className={'mb-6 mt-10'}>
                <ValidatorSelect
                    isHighReward={true}
                    validator={'Coinbase'}
                    apy={'5'}
                />
                <ValidatorSelect
                    isHighReward={false}
                    validator={'Everstake'}
                    apy={'4.4'}
                />
            </div>
            <Button to={'/home/staking/staking-amount'} removeContainerPadding>
                Next
            </Button>
        </div>
    );
};

export default SelectValidator;

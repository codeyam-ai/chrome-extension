import { useCallback } from 'react';

import { LinkType } from '_src/enums/LinkType';
import Button from '_src/ui/app/shared/buttons/Button';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

/*

The Provider Select component will be used for main net launch.

interface ProviderSelectProps {
    validator?: string;
    apy?: string;
    isHighReward: boolean;
}

const ProviderSelect = ({
    validator,
    apy,
    isHighReward,
}: ProviderSelectProps) => {
    const selectProvider = useCallback(() => {
        console.log(validator);
    }, []);

    return (
        <button
            onClick={selectProvider}
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

*/

interface ValidatorSelectProps {
    validator?: string;
    apy?: string;
    isHighReward: boolean;
}

const ValidatorSelect = ({ validator, apy }: ValidatorSelectProps) => {

    return (
        <div>
            <button
                // onClick={selectValidator}
                className={
                    'block w-full py-2 px-2 text-left rounded-xl border-2 border-white dark:border-ethos-dark-background-default hover:border-ethos-light-primary-light hover:border-2 hover:dark:border-ethos-dark-primary-dark transition-all'
                }
            >
                <div
                    className={
                        'flex flex-row justify-between align-middle relative'
                    }
                >
                    <div className={'mb-1 text-base'}>
                        <p className={'font-bold'}>{validator}</p>
                        <p
                            className={
                                'text-ethos-light-text-medium dark:text-ethos-dark-text-medium'
                            }
                        >
                            0xc23...23dc8
                        </p>
                    </div>
                    <div className={'text-base font-bold'}>{apy}% APY</div>
                </div>
            </button>
            <div
                className={
                    'border-[#F9F9FB] border dark:border-ethos-dark-text-stroke'
                }
            ></div>
        </div>
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
            </div>
            <Button to={'/home/staking/amount-to-stake'} removeContainerPadding>
                Next
            </Button>
        </div>
    );
};

export default SelectValidator;

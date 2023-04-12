import Subheader from '_src/ui/app/shared/typography/Subheader';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';
import Button from '_src/ui/app/shared/buttons/Button';
import { useCallback } from 'react';
import { SuiValidatorSummary } from '@mysten/sui.js';
import ValidatorList from './ValidatorList';

const SelectValidator: React.FC = () => {
    // add component
    return (
        <div className={'flex flex-col p-6 h-[414px] relative'}>
            <div className={'overflow-y-scroll h-full no-scrollbar'}>
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
                <div className="mb-6 mt-10">
                    <ValidatorList />
                </div>
            </div>
            <Button
                to={'/home/staking/amount-to-stake'}
                removeContainerPadding
                className="!mt-2"
            >
                Next
            </Button>
        </div>
    );
};

export default SelectValidator;

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ValidatorList from './ValidatorList';
import { LinkType } from '_src/enums/LinkType';
import Button from '_src/ui/app/shared/buttons/Button';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Subheader from '_src/ui/app/shared/typography/Subheader';

const SelectValidator: React.FC = () => {
    const navigate = useNavigate();
    const [selectedValidator, setSelectedValidator] = useState<
        string | undefined
    >();

    const onSelectValidator = useCallback(
        (validatorAddress: string) => {
            setSelectedValidator(validatorAddress);
        },
        [setSelectedValidator]
    );

    const onContinue = useCallback(() => {
        navigate(
            `/home/staking/amount-to-stake?${new URLSearchParams({
                validator: selectedValidator ?? '',
            }).toString()}`
        );
    }, [navigate, selectedValidator]);

    return (
        <div className={'flex flex-col px-6 h-[414px] relative'}>
            <div className={'overflow-y-scroll h-full no-scrollbar'}>
                <Subheader className={'text-center mb-1 mt-2'}>
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
                    <ValidatorList
                        selectedValidator={selectedValidator}
                        onSelectValidator={onSelectValidator}
                    />
                </div>
            </div>
            <Button
                onClick={onContinue}
                removeContainerPadding
                className="!mt-2"
                disabled={!selectedValidator}
            >
                Next
            </Button>
        </div>
    );
};

export default SelectValidator;

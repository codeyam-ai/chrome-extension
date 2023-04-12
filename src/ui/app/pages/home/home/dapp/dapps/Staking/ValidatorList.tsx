import { SuiAddress, SuiValidatorSummary } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Body from '_src/ui/app/shared/typography/Body';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

interface ValidatorListProps {
    onSelectValidator: (string: SuiAddress) => void;
    selectedValidator?: SuiAddress;
}
const ValidatorList: React.FC<ValidatorListProps> = ({
    onSelectValidator,
    selectedValidator,
}) => {
    const [validators, setValidators] = useState<SuiValidatorSummary[]>([]);

    useEffect(() => {
        // NOTE look into useQuery for fetching validators
        const fetchValidators = async () => {
            const provider = api.instance.fullNode;
            const res = await provider.getLatestSuiSystemState();
            setValidators(res.activeValidators);
        };
        fetchValidators();
    }, []);

    return (
        <div className="flex flex-col">
            {validators.map((validator, key) => (
                <ValidatorRow
                    onSelect={onSelectValidator}
                    validator={validator}
                    key={key}
                    isSelected={validator.suiAddress === selectedValidator}
                />
            ))}
        </div>
    );
};

const ValidatorRow: React.FC<{
    validator: SuiValidatorSummary;
    onSelect: (suiAddress: SuiAddress) => void;
    isSelected: boolean;
}> = ({ validator, onSelect, isSelected }) => {
    const onClick = useCallback(() => {
        onSelect(validator.suiAddress);
    }, [onSelect, validator]);

    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-full py-3 px-2 text-left rounded-lg border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke',
                isSelected
                    ? 'border-2 border-b-2 border-ethos-light-primary-light dark:border-ethos-dark-primary-dark'
                    : ''
            )}
        >
            <div className="flex flex-row items-center place-content-center justify-between">
                <div className="flex items-center place-content-center gap-3">
                    {validator.imageUrl ? (
                        <img
                            src={validator.imageUrl}
                            alt={validator.name}
                            className="h-9 w-9 rounded-full"
                        />
                    ) : (
                        <div className="h-9 w-9 rounded-full bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary" />
                    )}
                    <div className="flex flex-col">
                        <Body isSemibold>{validator.name}</Body>
                        <Body isTextColorMedium>
                            {truncateMiddle(validator.suiAddress)}
                        </Body>
                    </div>
                </div>
                <Body isSemibold>5.123%</Body>
            </div>
        </button>
    );
};
export default ValidatorList;

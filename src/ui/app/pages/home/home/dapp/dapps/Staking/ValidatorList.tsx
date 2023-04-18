import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useCallback } from 'react';

import Loading from '_src/ui/app/components/loading';
import { getRollingAverageApys } from '_src/ui/app/helpers/staking/getRollingAverageApys';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Body from '_src/ui/app/shared/typography/Body';

import type { SuiAddress, SuiValidatorSummary } from '@mysten/sui.js';

export interface SuiValidatorSummaryWithApy extends SuiValidatorSummary {
    apy: number;
}

interface ValidatorListProps {
    onSelectValidator: (string: SuiAddress) => void;
    selectedValidator?: SuiAddress;
}

interface SuiValidatorWithApyMap {
    [validatorAddress: SuiAddress]: SuiValidatorSummaryWithApy;
}

const getValidatorsWithApy = async () => {
    const provider = api.instance.fullNode;
    const res = await provider.getLatestSuiSystemState();
    const rollingAverageApys = await getRollingAverageApys(1000, res);

    const validatorsWithApy: SuiValidatorWithApyMap =
        res.activeValidators.reduce((acc, validator) => {
            acc[validator.suiAddress] = {
                ...validator,
                apy: rollingAverageApys.data?.[validator.suiAddress] ?? 0,
            };

            return acc;
        }, {} as SuiValidatorWithApyMap);
    return validatorsWithApy;
};

export const useValidatorsWithApy = () => {
    const { isFetching, data: validators } = useQuery(
        ['validators-with-apy'],
        getValidatorsWithApy
    );

    return { isFetching, validators };
};

const ValidatorList: React.FC<ValidatorListProps> = ({
    onSelectValidator,
    selectedValidator,
}) => {
    const { isFetching, validators } = useValidatorsWithApy();

    return (
        <Loading loading={isFetching} big={true}>
            <div className="flex flex-col">
                {!isFetching &&
                    validators &&
                    Object.values(validators).map((validator, key) => (
                        <ValidatorRow
                            onSelect={onSelectValidator}
                            validator={validator}
                            key={key}
                            isSelected={
                                validator.suiAddress === selectedValidator
                            }
                        />
                    ))}
            </div>
        </Loading>
    );
};

interface ValidatorRowProps {
    validator: SuiValidatorSummaryWithApy;
    onSelect: (suiAddress: SuiAddress) => void;
    isSelected: boolean;
}

const ValidatorRow: React.FC<ValidatorRowProps> = ({
    validator,
    onSelect,
    isSelected,
}) => {
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
                <Body isSemibold>{validator.apy || 0}%</Body>
            </div>
        </button>
    );
};
export default ValidatorList;

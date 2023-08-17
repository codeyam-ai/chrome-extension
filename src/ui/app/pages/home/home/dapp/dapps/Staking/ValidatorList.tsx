import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';

import ValidatorImage from './Validator/ValidatorImage';
import Loading from '_src/ui/app/components/loading';
import { useValidatorsWithApy } from '_src/ui/app/hooks/staking/useValidatorsWithApy';
import Radio from '_src/ui/app/shared/inputs/Radio';
import ArrowUpDownSort from '_src/ui/app/shared/svg/ArrowUpDownSort';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';

import type { SuiValidatorSummary } from '@mysten/sui.js/client';

export interface SuiValidatorSummaryWithApy extends SuiValidatorSummary {
    apy: number;
    isApyApproxZero: boolean;
    stakeShare: number;
}

interface ValidatorListProps {
    onSelectValidator: (string: string) => void;
    selectedValidator?: string;
}

export type SortDirection = 'asc' | 'desc';
type SortKey = 'apy' | 'stakeShare' | 'name';

type ValidatorSortFunction = (
    SortDirection: SortDirection,
    a: SuiValidatorSummaryWithApy,
    b: SuiValidatorSummaryWithApy
) => number;

type ValidatorSortFunctions = {
    [sortKey in SortKey]: ValidatorSortFunction;
};

const validatorSortFunctions: ValidatorSortFunctions = {
    apy: (sortDirection, a, b) => {
        return sortDirection === 'desc' ? b.apy - a.apy : a.apy - b.apy;
    },
    stakeShare: (sortDirection, a, b) => {
        return sortDirection === 'desc'
            ? b.stakeShare - a.stakeShare
            : a.stakeShare - b.stakeShare;
    },
    name: (sortDirection, a, b) => {
        return sortDirection === 'desc'
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
    },
};
const ValidatorList: React.FC<ValidatorListProps> = ({
    onSelectValidator,
    selectedValidator,
}) => {
    const [sortKey, setSortKey] = useState<SortKey>('apy');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const { isFetching, data: validators } = useValidatorsWithApy();

    const sortedValidators = useMemo(() => {
        if (!validators || !sortKey || !sortDirection) return;
        const validatorValues = Object.values(validators);

        return validatorValues.sort((a, b) =>
            validatorSortFunctions[sortKey](sortDirection, a, b)
        );
    }, [validators, sortKey, sortDirection]);

    const onSortKeyChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.name === sortKey) return;

            setSortKey(event.target.name as SortKey);
            setSortDirection('desc');
        },
        [sortKey]
    );

    const onSortDirectionChange = useCallback(() => {
        if (sortDirection === 'asc') setSortDirection('desc');
        if (sortDirection === 'desc') setSortDirection('asc');
    }, [sortDirection, setSortDirection]);

    return (
        <Loading loading={isFetching} big={true}>
            <div className="flex flex-col">
                {!isFetching && sortedValidators && (
                    <ValidatorSort
                        sortDirection={sortDirection}
                        sortKey={sortKey}
                        onSortDirectionChange={onSortDirectionChange}
                        onSortKeyChange={onSortKeyChange}
                    />
                )}
                {!isFetching &&
                    sortedValidators &&
                    sortedValidators.map((validator, key) => (
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
    onSelect: (suiAddress: string) => void;
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
                'w-full py-4 px-2 text-left rounded-lg border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke',
                isSelected
                    ? 'border-2 border-b-2 border-ethos-light-primary-light dark:border-ethos-dark-primary-dark'
                    : ''
            )}
        >
            <div className="flex flex-row items-center place-content-center justify-between">
                <div className="flex items-center place-content-center gap-3">
                    <ValidatorImage
                        validator={validator}
                        className="h-9 w-9 rounded-full"
                    />
                    <div className="flex flex-col">
                        <Body isSemibold>{validator.name}</Body>
                        <Body>
                            <EthosLink
                                className="!font-weight-ethos-body"
                                type="internal"
                                to={`/home/staking/validator/${validator.suiAddress}/details`}
                            >
                                Learn more
                            </EthosLink>
                        </Body>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-end gap-1">
                        <Body isSemibold>{validator.apy || 0}%</Body>
                        <Body>APY</Body>
                    </div>
                    <div className="flex justify-end gap-1">
                        <Body isSemibold>
                            {Number(validator.commissionRate) / 100}%
                        </Body>
                        <Body>Commission</Body>
                    </div>
                </div>
            </div>
        </button>
    );
};

interface ValidatorSortProps {
    sortDirection: SortDirection;
    onSortDirectionChange: () => void;
    sortKey: SortKey;
    onSortKeyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ValidatorSort = ({
    onSortDirectionChange,
    sortDirection,
    sortKey,
    onSortKeyChange,
}: ValidatorSortProps) => {
    return (
        <div className="flex w-full p-3.5 rounded-lg items-center bg-ethos-light-background-light-grey dark:bg-ethos-dark-background-light-grey">
            <button onClick={onSortDirectionChange} className="flex pr-3">
                <ArrowUpDownSort sortDirection={sortDirection} />
            </button>
            <fieldset className="flex justify-between w-full">
                <Radio
                    label="Stake Share"
                    id="stakeShare"
                    onChange={onSortKeyChange}
                    checked={sortKey === 'stakeShare'}
                />
                <Radio
                    label="APY"
                    id="apy"
                    onChange={onSortKeyChange}
                    checked={sortKey === 'apy'}
                />
                <Radio
                    label="Name"
                    id="name"
                    onChange={onSortKeyChange}
                    checked={sortKey === 'name'}
                />
            </fieldset>
        </div>
    );
};
export default ValidatorList;

import { SuiValidatorSummary } from '@mysten/sui.js';
import { useQuery } from '@tanstack/react-query';
import truncateMiddle from '_src/ui/app/helpers/truncate-middle';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Body from '_src/ui/app/shared/typography/Body';
import { useEffect, useState } from 'react';

const ValidatorList: React.FC = () => {
    const [validators, setValidators] = useState<SuiValidatorSummary[]>([]);

    useEffect(() => {
        // NOTE look into useQuery for fetching validators
        const fetchValidators = async () => {
            const provider = api.instance.fullNode;
            const res = await provider.getLatestSuiSystemState();
            console.log('res :>> ', res.activeValidators);
            setValidators(res.activeValidators);
        };
        fetchValidators();
    }, []);

    return (
        <div className="flex flex-col">
            {validators.map((validator, key) => (
                <ValidatorRow validator={validator} key={key} />
            ))}
        </div>
    );
};

const ValidatorRow: React.FC<{ validator: SuiValidatorSummary }> = ({
    validator,
}) => {
    return (
        <button
            // onClick={selectValidator}
            className="w-full py-3 px-2 text-left rounded-lg border-b border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke"
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

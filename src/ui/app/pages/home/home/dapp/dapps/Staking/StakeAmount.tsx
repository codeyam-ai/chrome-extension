import { SUI_TYPE_ARG } from '@mysten/sui.js';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector, useFormatCoin } from '_src/ui/app/hooks';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';
import { accountAggregateBalancesSelector } from '_src/ui/app/redux/slices/account';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import Button from '_src/ui/app/shared/buttons/Button';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import SuiIcon from '_src/ui/app/shared/svg/SuiIcon';
import Body from '_src/ui/app/shared/typography/Body';
import BodyLarge from '_src/ui/app/shared/typography/BodyLarge';
import Subheader from '_src/ui/app/shared/typography/Subheader';

import type { SuiValidatorSummary } from '@mysten/sui.js';

const StakeAmount: React.FC = () => {
    const [validators, setValidators] = useState<SuiValidatorSummary[]>([]);
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');
    const tokenBalances = useAppSelector(accountAggregateBalancesSelector);
    const suiBalanceUnformatted = tokenBalances[SUI_TYPE_ARG] ?? 0;

    const [formattedSuiBalance] = useFormatCoin(
        suiBalanceUnformatted,
        SUI_TYPE_ARG
    );

    const validator = useMemo(() => {
        return validators.find((v) => v.suiAddress === validatorSuiAddress);
    }, [validatorSuiAddress, validators]);

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
        <div className="flex flex-col h-full justify-between px-6">
            <div>
                <Subheader className={'text-center mb-1'}>
                    How much would you like to stake?
                </Subheader>
                <div className="flex flex-col gap-2 py-5 px-4 rounded-xl border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke">
                    <div className="flex justify-between">
                        <Body isSemibold>Amount</Body>
                        <span className="flex gap-1">
                            <Body isTextColorMedium>Available:</Body>
                            <Body isTextColorMedium isSemibold>
                                {formattedSuiBalance} SUI
                            </Body>
                        </span>
                    </div>
                    <div className="flex px-3 py-2 justify-between items-center place-content-center rounded-xl border border-ethos-light-text-stroke dark:border-ethos-dark-text-stroke bg-ethos-light-background-secondary dark:bg-ethos-dark-background-secondary">
                        <div className="flex">
                            <div className="p-2 rounded-full bg-ethos-sui-blue">
                                <SuiIcon height={24} width={24} />
                            </div>
                            <input
                                type="text"
                                className="w-full bg-transparent border-none focus:ring-0 caret-ethos-light-primary-light dark:caret-ethos-dark-primary-dark"
                                autoFocus
                                placeholder="0"
                            />
                        </div>
                        <BodyLarge>SUI</BodyLarge>
                    </div>
                </div>
            </div>

            <div>
                <div className={'-mx-6'}>
                    <KeyValueList
                        keyNamesAndValues={[
                            {
                                keyName: 'Staking APY',
                                value: '1.34%',
                            },
                            {
                                keyName: 'Staking Rewards Start',
                                keyHelpMessage:
                                    'The staked SUI starts earning reward at the end of the Epoch in which it was staked. The rewards will become available at the end of one full Epoch of staking.',
                                value: '1 day 3 hours',
                            },
                            {
                                keyName: 'Gas Fee',
                                value: `${mistToSui(
                                    +(validator?.gasPrice || '0'),
                                    4
                                )} SUI`,
                            },
                        ]}
                    />
                </div>
                <div className="!mb-6">
                    <Button
                        to={'/home/staking/review-stake'}
                        removeContainerPadding
                    >
                        Review
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default StakeAmount;

import Button from '_src/ui/app/shared/buttons/Button';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { api } from '_src/ui/app/redux/store/thunk-extras';
import { SuiValidatorSummary } from '@mysten/sui.js';
import mistToSui from '_src/ui/app/pages/dapp-tx-approval/lib/mistToSui';

const StakeAmount: React.FC = () => {
    const [validators, setValidators] = useState<SuiValidatorSummary[]>([]);
    const [searchParams] = useSearchParams();
    const validatorSuiAddress = searchParams.get('validator');

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
        <div className={'p-6 relative'}>
            <Subheader className={'text-center mb-1'}>
                How much would you like to stake?
            </Subheader>

            <div className={'mb-[100px]'}>FORM GOES HERE..</div>

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

            <Button to={'/home/staking/review-stake'} removeContainerPadding>
                Review
            </Button>
        </div>
    );
};

export default StakeAmount;

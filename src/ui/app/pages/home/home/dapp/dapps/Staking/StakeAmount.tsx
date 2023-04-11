import Button from '_src/ui/app/shared/buttons/Button';
import Subheader from '_src/ui/app/shared/typography/Subheader';
import KeyValueList from '_src/ui/app/shared/content/rows-and-lists/KeyValueList';

const StakeAmount: React.FC = () => {
    // add component
    return (
        <div className={'p-6 relative'}>
            <Subheader className={'text-center mb-1'}>
                How much would you like to stake?
            </Subheader>

            <div className={'mb-[100px]'}>FORM GOES HERE..</div>

            <div className={'px-0'}>
                <KeyValueList
                    keyNamesAndValues={[
                        {
                            keyName: 'Staking APY',
                            value: '1.34%',
                        },
                        {
                            keyName: 'Staking Rewards Start',
                            value: '1 day 3 hours',
                        },
                        {
                            keyName: 'Gas Fee',
                            value: '0.02943 SUI',
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

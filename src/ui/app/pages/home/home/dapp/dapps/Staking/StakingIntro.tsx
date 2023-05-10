import StakingIcon from '_assets/images/staking-icon.png';
import { LinkType } from '_src/enums/LinkType';
import Button from '_src/ui/app/shared/buttons/Button';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';

const StakingIntro: React.FC = () => {
    // add component
    return (
        <div className={'p-6 relative'}>
            <div className={'text-center'}>
                <img
                    src={StakingIcon}
                    alt={'Icon representing staking on the Sui network'}
                    className={'h-[200px] mx-auto'}
                />
                <Header className={'pt-2 mb-1'}>
                    Staking allows you to earn a reward with your SUI
                </Header>

                <EthosLink
                    className={'text-sm underline'}
                    to={'/home/staking/learn-more'}
                    type={LinkType.Internal}
                >
                    Learn More
                </EthosLink>

                <Button
                    to={'/home/staking/select-validator'}
                    removeContainerPadding
                    className={'mt-8 p-0'}
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default StakingIntro;

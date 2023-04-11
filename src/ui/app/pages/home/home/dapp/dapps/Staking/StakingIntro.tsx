import Button from '_src/ui/app/shared/buttons/Button';
import StakingIcon from '_assets/images/staking-icon.png';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import { LinkType } from '_src/enums/LinkType';
import Header from '_src/ui/app/shared/typography/Header';

const StakingIntro: React.FC = () => {
    // add component
    return (
        <div className={'p-6 relative'}>
            <div className={'text-center pt-[33px]'}>
                <img
                    src={StakingIcon}
                    alt={'Icon representing staking on the Sui network'}
                    className={'mx-auto'}
                />
                <Header className={'pt-2'}>
                    Staking allows you to earn interest on your SUI
                </Header>

                <EthosLink
                    className={'pt-2 underline'}
                    to={'/learn-more'}
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

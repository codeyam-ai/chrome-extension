import StakingIcon from '_assets/images/staking-icon.png';
import { LinkType } from '_src/enums/LinkType';
import Button from '_src/ui/app/shared/buttons/Button';
import Body from '_src/ui/app/shared/typography/Body';
import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';

const LearnStaking: React.FC = () => {
    return (
        <div className={'p-6 relative'}>
            <div className={'text-center'}>
                <img
                    src={StakingIcon}
                    alt={'Icon representing staking on the Sui network'}
                    className={'h-[200px] mx-auto'}
                />
                <Header className={'text-2xl py-2'}>What is Staking?</Header>
                <div className="flex mx-auto w-full place-content-center">
                    <EthosLink
                        to={'/home/staking/select-validator'}
                        type={LinkType.Internal}
                    >
                        <Body className="underline">Continue to Staking</Body>
                    </EthosLink>
                </div>

                <div className="flex flex-col text-left my-6 gap-4">
                    <Body isSemibold>
                        The Sui blockchain uses a Delegated Proof-of-Stake
                        (DPoS) consensus mechanism. To help make the system more
                        secure and reliable, token holders can &quot;stake&quot;
                        their tokens, which means they temporarily lock them
                        with trusted parties called validators.
                    </Body>
                    <Body isSemibold>
                        The Sui network ensures that no single validator has too
                        much control by limiting their voting power and
                        requiring more than two-thirds of the total votes to
                        confirm a transaction. By staking your SUI tokens, you
                        contribute to the safety and stability of the network
                        while also having the potential to earn some extra
                        tokens as a reward.
                    </Body>
                </div>
                <Button
                    to={'/home/staking/select-validator'}
                    removeContainerPadding
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default LearnStaking;

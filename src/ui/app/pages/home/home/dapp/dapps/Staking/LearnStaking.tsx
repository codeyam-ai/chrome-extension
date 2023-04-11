import EthosLink from '_src/ui/app/shared/typography/EthosLink';
import Header from '_src/ui/app/shared/typography/Header';
import { LinkType } from '_src/enums/LinkType';
import StakingIcon from '_assets/images/staking-icon.png';

const LearnStaking: React.FC = () => {
    // add component

    return (
        <div className={'p-6 relative'}>
            <EthosLink
                className={'absolute top-6 right-6 text-sm underline'}
                to={'/home/staking/select-validator'}
                type={LinkType.Internal}
            >
                Continue to Staking
            </EthosLink>
            <div className={'text-center pt-8'}>
                <img
                    src={StakingIcon}
                    alt={'Icon representing staking on the Sui network'}
                    className={'mx-auto'}
                />
                <Header className={'text-2xl pt-2 mb-6'}>
                    What is Staking?
                </Header>

                <p className={'text-left text-base mb-3'}>
                    The Sui blockchain uses a Delegated Proof-of-Stake (DPoS)
                    consensus mechanism. To help make the system more secure and
                    reliable, token holders can &quot;stake&quot; their tokens,
                    which means they temporarily lock them with trusted parties
                    called validators.
                </p>
                <p className={'text-left text-base'}>
                    The Sui network ensures that no single validator has too
                    much control by limiting their voting power and requiring
                    more than two-thirds of the total votes to confirm a
                    transaction. By staking your SUI tokens, you contribute to
                    the safety and stability of the network while also having
                    the potential to earn some extra tokens as a reward.
                </p>
            </div>
        </div>
    );
};

export default LearnStaking;

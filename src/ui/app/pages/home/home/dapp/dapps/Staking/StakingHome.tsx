import StakingIntro from './StakingIntro';

const StakingHome: React.FC = () => {
    // TODO: calculate if user currently has staked amount
    const hasStaked = false;

    if (!hasStaked) {
        return <StakingIntro />;
    } else {
        return <></>;
    }
};

export default StakingHome;

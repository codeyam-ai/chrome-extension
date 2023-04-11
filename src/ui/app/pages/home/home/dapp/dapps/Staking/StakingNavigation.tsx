import { Outlet, Route, Routes } from 'react-router-dom';

// import missing components
import StakingHome from './StakingHome';
import StakingIntro from './StakingIntro';
import LearnStaking from './LearnStaking';
import SelectValidator from './SelectValidator';
import StakeAmount from './StakeAmount';
import ReviewStake from './ReviewStake';
import { DappWrapper } from '../../DappWrapper';

function StakingNavigation() {
    return (
        <DappWrapper dappTitle="Staking" isFavorite>
            <Routes>
                <Route path="/" element={<StakingHome />} />
                <Route path="get-started" element={<StakingIntro />} />
                <Route path="learn-more" element={<LearnStaking />} />
                <Route path="select-validator" element={<SelectValidator />} />
                <Route path="amount-to-stake" element={<StakeAmount />} />
                <Route path="review-stake" element={<ReviewStake />} />
            </Routes>
            <Outlet />
        </DappWrapper>
    );
}

export default StakingNavigation;

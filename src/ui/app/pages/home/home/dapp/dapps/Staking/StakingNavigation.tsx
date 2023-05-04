import { Outlet, Route, Routes } from 'react-router-dom';

// import missing components
import CompletedStake from './CompletedState';
import LearnStaking from './LearnStaking';
import ReviewStake from './ReviewStake';
import SelectValidator from './SelectValidator';
import StakeAmountPage from './StakeAmount/StakeAmountPage';
import StakeDetail from './StakeDetail';
import StakingHome from './StakingHome';
import StakingIntro from './StakingIntro';
import { DappWrapper } from '../../DappWrapper';

function StakingNavigation() {
    return (
        <DappWrapper dappTitle="Staking" isFavorite>
            <Routes>
                <Route path="/" element={<StakingHome />} />
                <Route path="get-started" element={<StakingIntro />} />
                <Route path="learn-more" element={<LearnStaking />} />
                <Route path="select-validator" element={<SelectValidator />} />
                <Route path="amount-to-stake" element={<StakeAmountPage />} />
                <Route path="review" element={<ReviewStake />} />
                <Route path="complete" element={<CompletedStake />} />
                <Route
                    path="validator-details/:validatorAddress/:stakeSuiId"
                    element={<StakeDetail />}
                />
            </Routes>
            <Outlet />
        </DappWrapper>
    );
}

export default StakingNavigation;

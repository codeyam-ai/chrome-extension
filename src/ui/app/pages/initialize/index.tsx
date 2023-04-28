import { Outlet } from 'react-router-dom';

import OnboardingLayout from '../../shared/layouts/OnboardingLayout';

const InitializePage = () => {
    return (
        <OnboardingLayout>
            <Outlet />
        </OnboardingLayout>
    );
};

export default InitializePage;

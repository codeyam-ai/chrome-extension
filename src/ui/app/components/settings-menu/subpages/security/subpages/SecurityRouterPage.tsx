import { Routes, Route, Navigate } from 'react-router-dom';
import {
    useNextSettingsUrl,
    useSecurityIsOpenOnSubPage,
    useSecurityUrl,
} from '../../../hooks';
import NetworkPage from '../../network/NetworkPage';
import SecurityHomePage from '../SecurityHomePage';

function SecurityRouterPage() {
    const securityIsOpenOnSubPage = useSecurityIsOpenOnSubPage();
    const securityUrl = useSecurityUrl();
    const securityHomeUrl = useNextSettingsUrl(true, '/settings');
    return (
        <Routes location={securityUrl || ''}>
            <Route path="/security" element={<SecurityHomePage />} />
            <Route path="/security/network" element={<NetworkPage />} />
            <Route
                path="*"
                element={<Navigate to={securityHomeUrl} replace={true} />}
            />
        </Routes>
    );
}

export default SecurityRouterPage;

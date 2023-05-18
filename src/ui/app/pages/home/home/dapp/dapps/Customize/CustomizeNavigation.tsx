import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import ChangeProfilePicture from './ChangeProfilePicture/ChangeProfilePicturePage';
import ChangeWalletTheme from './ChangeWalletTheme';
import CustomizeCompleted from './CustomizeCompleted';
import ChangeFavoritesPage from './Favorites/ChangeFavoritesPage';
import Tabs from './Tabs';
import WalletNickname from './WalletNickname';
import { DappWrapper } from '../../DappWrapper';

const tabs = [
    { name: 'Nickname', href: '/home/customize' },
    { name: 'Profile Picture', href: '/home/customize/profile-picture' },
    { name: 'Theme', href: '/home/customize/theme' },
    { name: 'Favorites', href: '/home/customize/favorites' },
    { name: 'Completed', href: '/home/customize/completed' },
];

function CustomizeNavigation() {
    const location = useLocation();
    const currentTab = tabs.find((tab) => tab.href === location.pathname)?.name;

    return (
        <DappWrapper dappTitle="Customize" isFavorite>
            <div className="flex flex-col">
                <Tabs tabs={tabs} currentTab={currentTab ?? ''} />
                <Routes>
                    <Route path="/" element={<WalletNickname />} />
                    <Route
                        path="profile-picture"
                        element={<ChangeProfilePicture />}
                    />
                    <Route path="theme" element={<ChangeWalletTheme />} />
                    <Route path="favorites" element={<ChangeFavoritesPage />} />
                    <Route path="completed" element={<CustomizeCompleted />} />
                </Routes>
                <Outlet />
            </div>
        </DappWrapper>
    );
}

export default CustomizeNavigation;

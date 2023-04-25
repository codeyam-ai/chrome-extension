import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import ChangeColor from './ChangeColor';
import ChangeEmoji from './ChangeEmoji';
import CustomizeCompleted from './CustomizeCompleted';
import ChangeFavoritesPage from './Favorites/ChangeFavoritesPage';
import Tabs from './Tabs';
import WalletNickname from './WalletNickname';
import { DappWrapper } from '../../DappWrapper';
import { useDependencies } from '_src/shared/utils/dependenciesContext';

function CustomizeNavigation() {
    const { featureFlags } = useDependencies();
    const location = useLocation();
    const tabs = [
        { name: 'Nickname', href: '/home/customize' },
        { name: 'Emoji', href: '/home/customize/emoji' },
        { name: 'Color', href: '/home/customize/color' },
        ...(featureFlags.showWipFeatures
            ? [{ name: 'Favorites', href: '/home/customize/favorites' }]
            : []),
        { name: 'Completed', href: '/home/customize/completed' },
    ];
    const currentTab = tabs.find((tab) => tab.href === location.pathname)?.name;

    return (
        <DappWrapper dappTitle="Customize" isFavorite>
            <div className="flex flex-col">
                <Tabs tabs={tabs} currentTab={currentTab ?? ''} />
                <Routes>
                    <Route path="/" element={<WalletNickname />} />
                    <Route path="emoji" element={<ChangeEmoji />} />
                    <Route path="color" element={<ChangeColor />} />
                    {featureFlags.showWipFeatures && (
                        <Route
                            path="favorites"
                            element={<ChangeFavoritesPage />}
                        />
                    )}
                    <Route path="completed" element={<CustomizeCompleted />} />
                </Routes>
                <Outlet />
            </div>
        </DappWrapper>
    );
}

export default CustomizeNavigation;

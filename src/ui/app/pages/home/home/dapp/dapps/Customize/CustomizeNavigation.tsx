import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import ChangeColor from './ChangeColor';
import ChangeEmoji from './ChangeEmoji';
import ChangeFavorites from './ChangeFavorites';
import CustomizeCompleted from './CustomizeCompleted';
import Tabs from './Tabs';
import WalletNickname from './WalletNickname';
import { DappWrapper } from '../../DappWrapper';

const tabs = [
    { name: 'Nickname', href: '/home/customize' },
    { name: 'Emoji', href: '/home/customize/emoji' },
    { name: 'Color', href: '/home/customize/color' },
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
                    <Route path="emoji" element={<ChangeEmoji />} />
                    <Route path="color" element={<ChangeColor />} />
                    <Route path="favorites" element={<ChangeFavorites />} />
                    <Route path="completed" element={<CustomizeCompleted />} />
                </Routes>
                <Outlet />
            </div>
        </DappWrapper>
    );
}

export default CustomizeNavigation;

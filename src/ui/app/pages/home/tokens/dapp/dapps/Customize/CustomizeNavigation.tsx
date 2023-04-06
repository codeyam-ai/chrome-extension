import { Outlet, Route, Routes } from 'react-router-dom';

import ChangeColor from './ChangeColor';
import ChangeEmoji from './ChangeEmoji';
import CustomizeCompleted from './CustomizeCompleted';
import WalletNickname from './WalletNickname';
import { DappWrapper } from '../../DappWrapper';

function CustomizeNavigation() {
    return (
        <DappWrapper dappTitle="Customize" isFavorite>
            <Routes>
                <Route path="/" element={<WalletNickname />} />
                <Route path="emoji" element={<ChangeEmoji />} />
                <Route path="color" element={<ChangeColor />} />
                <Route path="completed" element={<CustomizeCompleted />} />
            </Routes>
            <Outlet />
        </DappWrapper>
    );
}

export default CustomizeNavigation;

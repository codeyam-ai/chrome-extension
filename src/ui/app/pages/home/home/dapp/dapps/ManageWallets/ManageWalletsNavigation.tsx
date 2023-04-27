import { Outlet, Route, Routes } from 'react-router-dom';

import ManageWallets from './ManageWallets';
import { DappWrapper } from '../../DappWrapper';

function CustomizeNavigation() {
    return (
        <DappWrapper dappTitle="Manage Wallets" isFavorite={false}>
            <div className="flex flex-col">
                <Routes>
                    <Route path="/" element={<ManageWallets />} />
                </Routes>
                <Outlet />
            </div>
        </DappWrapper>
    );
}

export default CustomizeNavigation;

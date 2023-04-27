import { Outlet, Route, Routes } from 'react-router-dom';

import ImportPrivateKey from './ImportPrivateKey';
import ImportSeedPhrase from './ImportSeedPhrase';
import ManageWallets from './ManageWallets';
import { DappWrapper } from '../../DappWrapper';

function CustomizeNavigation() {
    return (
        <DappWrapper dappTitle="Manage Wallets" isFavorite={false}>
            <div className="flex flex-col">
                <Routes>
                    <Route path="/" element={<ManageWallets />} />
                    <Route path="/import-seed" element={<ImportSeedPhrase />} />
                    <Route path="/import-key" element={<ImportPrivateKey />} />
                </Routes>
                <Outlet />
            </div>
        </DappWrapper>
    );
}

export default CustomizeNavigation;

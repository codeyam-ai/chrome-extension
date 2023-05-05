import { Outlet, Route, Routes } from 'react-router-dom';

import LedgerHome from './LedgerHome';
import { DappWrapper } from '../../DappWrapper';

function LedgerNavigation() {
    return (
        <DappWrapper dappTitle="Connect Ledger" hideFavorite={true}>
            <div className="flex flex-col">
                <Routes>
                    <Route path="/" element={<LedgerHome />} />
                </Routes>
                <Outlet />
            </div>
        </DappWrapper>
    );
}

export default LedgerNavigation;

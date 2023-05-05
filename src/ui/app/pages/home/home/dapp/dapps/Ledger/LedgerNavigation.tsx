import { Outlet, Route, Routes } from 'react-router-dom';

import { ImportLedgerAccounts } from './ImportLedgerAccounts';
import LedgerHome from './LedgerHome';
import { DappWrapper } from '../../DappWrapper';

function LedgerNavigation() {
    return (
        <DappWrapper dappTitle="Connect Ledger" hideFavorite={true}>
            <div className="flex flex-col">
                <Routes>
                    <Route path="/" element={<LedgerHome />} />
                    <Route path="/import" element={<ImportLedgerAccounts />} />
                </Routes>
                <Outlet />
            </div>
        </DappWrapper>
    );
}

export default LedgerNavigation;

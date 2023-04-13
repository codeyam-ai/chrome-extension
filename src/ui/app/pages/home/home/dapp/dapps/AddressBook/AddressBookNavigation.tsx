import { Outlet, Route, Routes } from 'react-router-dom';

import Add from './Add';
import AddressBookHome from './AddressBookHome';
import ContactPage from './ContactPage/ContactPage';
import Edit from './Edit';
import { DappWrapper } from '../../DappWrapper';

function AddressBookNavigation() {
    return (
        <DappWrapper dappTitle="Address Book" isFavorite>
            <Routes>
                <Route path="/" element={<AddressBookHome />} />
                <Route path="add" element={<Add />} />
                <Route path="/contact/:address" element={<ContactPage />} />
                <Route path="/contact/edit/:address" element={<Edit />} />
            </Routes>
            <Outlet />
        </DappWrapper>
    );
}

export default AddressBookNavigation;

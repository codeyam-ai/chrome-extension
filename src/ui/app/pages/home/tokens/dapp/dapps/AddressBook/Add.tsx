import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import AddContactForm, { type Contact } from './AddContactForm';
import { useUpdateContacts } from '_src/ui/app/hooks/useUpdateContacts';

const Add: React.FC = () => {
    const navigate = useNavigate();
    const { addContact } = useUpdateContacts();

    const onSubmit = useCallback(
        (contact: Contact) => {
            addContact(contact);
            navigate(-1);
        },
        [addContact, navigate]
    );
    return <AddContactForm onSubmit={onSubmit} />;
};

export default Add;

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { type Contact } from './AddContactForm';
import EditContactForm from './EditContactForm';
import { useAppSelector } from '_src/ui/app/hooks';
import { useUpdateContacts } from '_src/ui/app/hooks/useUpdateContacts';

const Edit: React.FC = () => {
    const navigate = useNavigate();
    const { editContact } = useUpdateContacts();
    const { address } = useParams();
    const contact = useAppSelector(({ contacts }) =>
        contacts.contacts.find((contact) => contact.address === address)
    );

    const onSubmit = useCallback(
        (updatedContact: Contact) => {
            if (!contact?.address) {
                return;
            }
            const { color, emoji, name } = updatedContact;
            editContact(contact.address, { color, emoji, name });
            navigate(-1);
        },
        [editContact, navigate, contact?.address]
    );

    if (!contact) {
        return <div>Not found</div>;
    }

    return <EditContactForm onSubmit={onSubmit} contact={contact} />;
};

export default Edit;
